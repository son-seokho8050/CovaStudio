import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/Students_thinking_while_creating_art_3cfdf317.png";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-primary-foreground max-w-4xl mx-auto px-8">
        <h1 className="font-serif text-4xl md:text-6xl font-bold mb-8 leading-tight">
          생각하며 그리는 학생을
          <br />
          <span className="text-orange-300">만드는 교육</span>
        </h1>
        <p className="text-xl md:text-2xl mb-12 leading-relaxed opacity-90">
          COVA는 단순히 '잘 그리는 학생'이 아닌<br />
          '생각하며 그리는 학생'을 만드는 코코미술학원의 혁신적인 교육 프로그램입니다
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-orange-500 hover:bg-orange-600 text-white border-orange-600"
            data-testid="button-learn-more"
            onClick={() => console.log('Learn more clicked')}
          >
            프로그램 알아보기
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
            data-testid="button-contact"
            onClick={() => console.log('Contact clicked')}
          >
            문의하기
          </Button>
        </div>
      </div>
    </section>
  );
}