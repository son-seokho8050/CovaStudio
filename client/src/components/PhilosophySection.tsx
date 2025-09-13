import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Eye, PenTool, BookOpen } from "lucide-react";

export default function PhilosophySection() {
  const philosophyPoints = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "사고하는 과정",
      description: "단순한 기법 습득을 넘어 창작 과정에서의 사고력과 문제해결 능력을 기릅니다"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "관찰과 분석",
      description: "대상을 깊이 있게 관찰하고 분석하여 본질을 파악하는 능력을 키웁니다"
    },
    {
      icon: <PenTool className="w-8 h-8" />,
      title: "표현의 다양성",
      description: "개인의 독창성을 존중하며 다양한 표현 방식을 탐구합니다"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "과정 중심 학습",
      description: "결과보다는 과정을 중시하여 지속적인 성장을 이끌어냅니다"
    }
  ];

  return (
    <section className="py-24 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-foreground">
            COVA 교육 철학
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            생각하며 그리는 학생을 만들기 위한 우리만의 교육 접근법은<br />
            단순한 기술 전수가 아닌 창의적 사고력 개발에 중점을 둡니다
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {philosophyPoints.map((point, index) => (
            <Card key={index} className="hover-elevate cursor-pointer group" data-testid={`card-philosophy-${index}`}>
              <CardContent className="p-8 text-center">
                <div className="text-orange-500 mb-6 flex justify-center group-hover:scale-110 transition-transform duration-200">
                  {point.icon}
                </div>
                <h3 className="font-serif text-xl font-semibold mb-4 text-foreground">
                  {point.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {point.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}