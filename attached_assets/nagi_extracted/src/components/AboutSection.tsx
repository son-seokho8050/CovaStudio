import { Button } from './ui/button'
import { ArrowLeft } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface AboutSectionProps {
  onBack: () => void
}

export function AboutSection({ onBack }: AboutSectionProps) {
  return (
    <div className="pt-24 pb-20 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-8 text-white/60 hover:text-white hover:bg-white/5 p-0"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Works
        </Button>
        
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Profile Image */}
          <div className="w-80 h-80 bg-gray-900 rounded-2xl overflow-hidden mb-12">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&face"
              alt="nagi profile"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Name and Title */}
          <div className="mb-12">
            <h1 className="text-5xl mb-6">nagi</h1>
            <h2 className="text-2xl text-white/70 mb-8">Director & Editor</h2>
          </div>
          
          {/* Bio */}
          <div className="space-y-6 text-white/80 leading-relaxed mb-16 max-w-3xl">
            <p>
              映像制作の世界に足を踏み入れてから10年以上、私は物語を視覚的に表現することに情熱を注いできました。
              音楽ビデオから企業広告、ドキュメンタリーまで、幅広いジャンルの映像制作に携わっています。
            </p>
            
            <p>
              私の制作スタイルは、感情的な深さと技術的な精密さの融合にあります。
              カメラワーク、編集、色彩設計を通じて、視聴者の心に響く体験を創造することを目指しています。
            </p>
            
            <p>
              特に音楽ビデオの制作においては、音楽と映像の調和を追求し、
              アーティストの表現したい世界観を視覚的に翻訳することに力を入れています。
            </p>
          </div>
          
          {/* Experience and Skills */}
          <div className="grid md:grid-cols-2 gap-12 w-full max-w-4xl mb-16">
            <div>
              <h3 className="text-xl mb-6">Experience</h3>
              <div className="space-y-4 text-white/70 text-left">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white">Senior Director</span>
                    <span className="text-sm">2020 - Present</span>
                  </div>
                  <p className="text-sm">Visual Creative Studio</p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white">Video Editor</span>
                    <span className="text-sm">2018 - 2020</span>
                  </div>
                  <p className="text-sm">Media Production House</p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white">Freelance Director</span>
                    <span className="text-sm">2015 - 2018</span>
                  </div>
                  <p className="text-sm">Independent Projects</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl mb-6">Skills</h3>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {['Final Cut Pro', 'Adobe Premiere', 'DaVinci Resolve', 'Cinema 4D', 'After Effects', 'Color Grading', 'Motion Graphics'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          

        </div>
      </div>
    </div>
  )
}