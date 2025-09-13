import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // TODO: remove mock functionality - implement real form submission
    alert('문의가 접수되었습니다. 곧 연락드리겠습니다.');
    setFormData({ name: '', phone: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5" />,
      title: "전화 문의",
      content: "02-1234-5678",
      description: "평일 09:00 - 21:00"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: "이메일 문의",
      content: "info@cocoart.kr",
      description: "24시간 접수 가능"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "학원 위치",
      content: "서울시 강남구 테헤란로",
      description: "지하철 2호선 역삼역 3번 출구"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "운영 시간",
      content: "평일 09:00 - 21:00",
      description: "토요일 09:00 - 18:00"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-secondary/20 to-background">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-foreground">
            문의 및 상담
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            COVA 프로그램에 대해 궁금한 점이 있으시면 언제든 문의해 주세요<br />
            전문 상담을 통해 자세한 안내를 도와드리겠습니다
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="hover-elevate">
            <CardHeader>
              <CardTitle className="font-serif text-2xl text-foreground">상담 신청</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    이름 *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="성함을 입력해 주세요"
                    data-testid="input-name"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    연락처 *
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="연락 가능한 번호를 입력해 주세요"
                    data-testid="input-phone"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    문의 내용
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="궁금한 점이나 상담받고 싶은 내용을 적어주세요"
                    data-testid="input-message"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  data-testid="button-submit-inquiry"
                >
                  상담 신청하기
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-2xl text-foreground">연락처 정보</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="text-orange-500 mt-1">
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{info.title}</h4>
                        <p className="text-foreground font-medium">{info.content}</p>
                        <p className="text-sm text-muted-foreground">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-orange-600">
              <CardContent className="p-8 text-center">
                <h3 className="font-serif text-xl font-bold mb-4">
                  지금 바로 시작해보세요
                </h3>
                <p className="mb-6 opacity-90">
                  COVA 프로그램의 체험 수업을 통해<br />
                  새로운 미술 교육의 차이를 직접 경험해보세요
                </p>
                <Button 
                  variant="outline" 
                  className="bg-white text-orange-600 border-white hover:bg-orange-50"
                  data-testid="button-trial-class"
                  onClick={() => console.log('Trial class clicked')}
                >
                  체험 수업 신청
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}