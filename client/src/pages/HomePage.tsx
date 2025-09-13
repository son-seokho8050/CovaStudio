import HeroSection from "@/components/HeroSection";
import PhilosophySection from "@/components/PhilosophySection";
import CurriculumSection from "@/components/CurriculumSection";
import ContactSection from "@/components/ContactSection";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="font-serif text-2xl font-bold text-foreground">
            COVA
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#philosophy" className="text-foreground hover:text-orange-500 transition-colors">
              교육철학
            </a>
            <a href="#curriculum" className="text-foreground hover:text-orange-500 transition-colors">
              커리큘럼
            </a>
            <a href="#contact" className="text-foreground hover:text-orange-500 transition-colors">
              문의
            </a>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              data-testid="button-mobile-menu"
              onClick={() => console.log('Mobile menu clicked')}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <HeroSection />
        <div id="philosophy">
          <PhilosophySection />
        </div>
        <div id="curriculum">
          <CurriculumSection />
        </div>
        <div id="contact">
          <ContactSection />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-16">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-serif text-2xl font-bold mb-4">COVA</h3>
              <p className="text-primary-foreground/80 leading-relaxed">
                생각하며 그리는 학생을 만드는<br />
                코코미술학원의 혁신적인 교육 프로그램
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">연락처</h4>
              <div className="space-y-2 text-primary-foreground/80">
                <p>전화: 02-1234-5678</p>
                <p>이메일: info@cocoart.kr</p>
                <p>주소: 서울시 강남구 테헤란로</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">운영시간</h4>
              <div className="space-y-2 text-primary-foreground/80">
                <p>평일: 09:00 - 21:00</p>
                <p>토요일: 09:00 - 18:00</p>
                <p>일요일: 휴무</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2024 코코미술학원. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}