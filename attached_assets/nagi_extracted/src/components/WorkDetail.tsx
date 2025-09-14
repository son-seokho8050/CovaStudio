import { Button } from './ui/button'
import { ArrowLeft } from 'lucide-react'
import { Work } from '../data/works'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface WorkDetailProps {
  work: Work
  onBack: () => void
}

export function WorkDetail({ work, onBack }: WorkDetailProps) {
  const handleThumbnailClick = () => {
    window.open(work.videoUrl, '_blank')
  }

  return (
    <div className="pt-24 pb-20 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-8 text-white/60 hover:text-white hover:bg-white/5 p-0"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Works
        </Button>
        
        {/* Hero section */}
        <div className="mb-12">
          <div className="grid md:grid-cols-2 gap-12 items-start mb-8">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <span className="px-3 py-1 bg-white/10 rounded-full text-sm">
                  {work.category}
                </span>
                <span className="text-white/60">{work.year}</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl mb-8">{work.title}</h1>
              
              <p className="text-lg text-white/80 leading-relaxed mb-8">
                {work.description}
              </p>
            </div>
            
            <div className="relative">
              <div 
                className="aspect-video bg-gray-900 rounded-xl overflow-hidden cursor-pointer group transition-transform hover:scale-105"
                onClick={handleThumbnailClick}
              >
                <ImageWithFallback
                  src={work.thumbnail}
                  alt={work.title}
                  className="w-full h-full object-cover"
                />
                
                {/* ホバー効果とプレイボタン */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-0 h-0 border-l-10 border-l-black border-t-8 border-t-transparent border-b-8 border-b-transparent ml-1" />
                  </div>
                </div>
              </div>
              
              <p className="text-center text-sm text-white/60 mt-4">
                クリックして動画を視聴
              </p>
            </div>
          </div>
        </div>
        
        {/* Credits section */}
        <div className="border-t border-white/10 pt-12">
          <h2 className="text-2xl mb-8">Credits</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white/60 text-sm mb-2">Director</h3>
              <p>{work.credits.director}</p>
            </div>
            
            <div>
              <h3 className="text-white/60 text-sm mb-2">Editor</h3>
              <p>{work.credits.editor}</p>
            </div>
            
            {work.credits.cinematographer && (
              <div>
                <h3 className="text-white/60 text-sm mb-2">Cinematographer</h3>
                <p>{work.credits.cinematographer}</p>
              </div>
            )}
            
            {work.credits.producer && (
              <div>
                <h3 className="text-white/60 text-sm mb-2">Producer</h3>
                <p>{work.credits.producer}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Behind the scenes or additional images could go here */}
        <div className="mt-16">
          <h2 className="text-2xl mb-8">Process</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=600&h=400&fit=crop`}
                  alt={`Behind the scenes ${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}