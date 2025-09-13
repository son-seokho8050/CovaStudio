import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Palette, Target, Trophy } from "lucide-react";
import processImage from "@assets/generated_images/Visual_journal_process_documentation_69469ecf.png";
import artworkImage from "@assets/generated_images/Finished_student_artwork_gallery_eeceb8eb.png";

export default function CurriculumSection() {
  const grade10Features = [
    { icon: <Search className="w-5 h-5" />, text: "과정 기록" },
    { icon: <Palette className="w-5 h-5" />, text: "거장작 비교" },
    { icon: <Target className="w-5 h-5" />, text: "비주얼 저널" },
    { icon: <Trophy className="w-5 h-5" />, text: "언어화 훈련" }
  ];

  const grade11Features = [
    { icon: <Trophy className="w-5 h-5" />, text: "완성도 높은 결과물" },
    { icon: <Target className="w-5 h-5" />, text: "입시 실전 조건" },
    { icon: <Palette className="w-5 h-5" />, text: "전공적 사고 전환" },
    { icon: <Search className="w-5 h-5" />, text: "실기력 강화" }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-foreground">
            커리큘럼 진행 과정
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            탐구 중심의 기초 과정에서 실기력 강화와 전공적 사고 전환까지<br />
            체계적인 단계별 학습 프로그램을 제공합니다
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Grade 10 */}
          <Card className="hover-elevate group">
            <CardHeader className="text-center pb-8">
              <Badge className="mx-auto mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                고등학교 1학년
              </Badge>
              <CardTitle className="font-serif text-2xl text-foreground">탐구 중심 훈련</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <img 
                  src={processImage} 
                  alt="Visual journal and process documentation" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {grade10Features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="text-blue-600 dark:text-blue-400">
                      {feature.icon}
                    </div>
                    <span className="text-sm font-medium text-foreground">{feature.text}</span>
                  </div>
                ))}
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                창작 과정의 기록과 분석을 통해 사고하는 습관을 기르고, 
                거장들의 작품과 비교하며 시각적 사고력을 개발합니다.
              </p>
              
              <Button 
                variant="outline" 
                className="w-full group"
                data-testid="button-grade10-details"
                onClick={() => console.log('Grade 10 details clicked')}
              >
                자세히 보기
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          {/* Grade 11 */}
          <Card className="hover-elevate group">
            <CardHeader className="text-center pb-8">
              <Badge className="mx-auto mb-4 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                고등학교 2학년
              </Badge>
              <CardTitle className="font-serif text-2xl text-foreground">실기력 강화 & 전공적 사고</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <img 
                  src={artworkImage} 
                  alt="Finished student artwork gallery" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {grade11Features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="text-orange-600 dark:text-orange-400">
                      {feature.icon}
                    </div>
                    <span className="text-sm font-medium text-foreground">{feature.text}</span>
                  </div>
                ))}
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                탐구 기반의 사고력을 바탕으로 실제 완성도 높은 작품을 제작하고, 
                입시 실전 조건에서의 전문적 역량을 기릅니다.
              </p>
              
              <Button 
                variant="outline" 
                className="w-full group"
                data-testid="button-grade11-details"
                onClick={() => console.log('Grade 11 details clicked')}
              >
                자세히 보기
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Progression Arrow */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-full">
            <span className="text-sm font-medium text-muted-foreground">탐구 중심</span>
            <ArrowRight className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-medium text-muted-foreground">실기력 강화</span>
            <ArrowRight className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-medium text-muted-foreground">전공적 사고</span>
          </div>
        </div>
      </div>
    </section>
  );
}