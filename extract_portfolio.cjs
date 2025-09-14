const fs = require('fs');
const yauzl = require('yauzl');
const path = require('path');

const zipFilePath = 'attached_assets/portfolio.zip';
const extractDir = 'attached_assets/nagi_extracted';

// Create extraction directory
if (!fs.existsSync(extractDir)) {
    fs.mkdirSync(extractDir, { recursive: true });
}

yauzl.open(zipFilePath, { lazyEntries: true }, (err, zipfile) => {
    if (err) {
        console.error('Error opening ZIP file:', err.message);
        return;
    }
    
    console.log('ZIP file opened successfully');
    console.log('Entry count:', zipfile.entryCount);
    
    zipfile.readEntry();
    
    zipfile.on('entry', (entry) => {
        console.log('Found entry:', entry.fileName);
        
        if (/\/$/.test(entry.fileName)) {
            // Directory entry
            const dirPath = path.join(extractDir, entry.fileName);
            fs.mkdirSync(dirPath, { recursive: true });
            zipfile.readEntry();
        } else {
            // File entry
            zipfile.openReadStream(entry, (err, readStream) => {
                if (err) {
                    console.error('Error opening stream for', entry.fileName, ':', err.message);
                    zipfile.readEntry();
                    return;
                }
                
                const filePath = path.join(extractDir, entry.fileName);
                const dirName = path.dirname(filePath);
                
                // Ensure directory exists
                fs.mkdirSync(dirName, { recursive: true });
                
                const writeStream = fs.createWriteStream(filePath);
                readStream.pipe(writeStream);
                
                writeStream.on('close', () => {
                    console.log('Extracted:', entry.fileName);
                    zipfile.readEntry();
                });
                
                writeStream.on('error', (err) => {
                    console.error('Error writing', entry.fileName, ':', err.message);
                    zipfile.readEntry();
                });
            });
        }
    });
    
    zipfile.on('end', () => {
        console.log('Extraction complete');
    });
    
    zipfile.on('error', (err) => {
        console.error('Zipfile error:', err.message);
    });
});