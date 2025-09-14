const fs = require('fs');
const path = require('path');

const attachedDir = 'attached_assets';

console.log('Files in attached_assets:');
const files = fs.readdirSync(attachedDir);
files.forEach((file, index) => {
    const filePath = path.join(attachedDir, file);
    const stats = fs.statSync(filePath);
    console.log(`${index}: "${file}" (${stats.size} bytes)`);
    
    if (file.endsWith('.zip')) {
        console.log(`Found ZIP file: "${file}"`);
        
        // Try to read the ZIP file directly by index
        try {
            const zipData = fs.readFileSync(filePath);
            console.log(`Successfully read ZIP file: ${zipData.length} bytes`);
            console.log('First 10 bytes (hex):', Array.from(zipData.slice(0, 10)).map(b => b.toString(16).padStart(2, '0')).join(' '));
            
            // Copy to simpler name
            fs.writeFileSync(path.join(attachedDir, 'portfolio.zip'), zipData);
            console.log('Copied to portfolio.zip');
        } catch (err) {
            console.error('Error reading ZIP:', err.message);
        }
    }
});