export function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl mb-4">nagi</h3>
            <p className="text-white/60 leading-relaxed">
              Visual storyteller crafting emotional narratives through the lens of cinema and digital media.
            </p>
          </div>
          
          <div>
            <h4 className="mb-4">Contact</h4>
            <div className="space-y-2 text-white/70">
              <p>nagi@example.com</p>
              <p>+81 90-1234-5678</p>
              <p>Tokyo, Japan</p>
            </div>
          </div>
          
          <div>
            <h4 className="mb-4">Connect</h4>
            <div className="flex space-x-6">
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                Instagram
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                Vimeo
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-white/50 text-sm">
          <p>&copy; 2024 nagi. All rights reserved.</p>
          <p>Portfolio designed for visual excellence</p>
        </div>
      </div>
    </footer>
  )
}