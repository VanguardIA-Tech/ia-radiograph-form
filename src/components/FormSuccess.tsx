import { CheckCircle2, Linkedin, Instagram, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const FormSuccess = () => {
  const handleCTA = () => {
    window.open("https://wa.me/5591999999999", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* HERO / CONFIRMAÇÃO */}
      <section className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center shadow-medium">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Perfeito. Seu Raio-X de Eficiência com IA está sendo preparado.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Em até 5 minutos você receberá no WhatsApp e no seu e-mail
            o relatório completo com oportunidades reais de automação e eficiência.
          </p>
        </div>
      </section>

      {/* BLOCO 2 — CHAMADA PARA AÇÃO HUMANA */}
      <section className="bg-secondary/50 border border-border rounded-xl p-6 md:p-8 space-y-3">
        <h3 className="text-xl md:text-2xl font-bold text-foreground">
          A próxima etapa é conversar com um dos nossos consultores sêniores de Eficiência com IA, para empresas com mais de 30 colaboradores.
        </h3>
        <p className="text-sm md:text-base text-muted-foreground">
          Eles vão te mostrar como aplicar cada insight do relatório
          em um plano real de integração com IA na sua empresa.
        </p>
      </section>

      {/* BLOCO 3 — PROVA DE VALOR / CASES */}
      <section className="space-y-4">
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            <CarouselItem className="md:basis-1/3">
              <div className="h-full rounded-xl border border-border bg-card p-5 shadow-soft flex items-center justify-center text-center">
                <p className="text-sm md:text-base font-semibold">
                  Rede Mais Saúde — 25 dias → 3 dias.
                </p>
              </div>
            </CarouselItem>
            <CarouselItem className="md:basis-1/3">
              <div className="h-full rounded-xl border border-border bg-card p-5 shadow-soft flex items-center justify-center text-center">
                <p className="text-sm md:text-base font-semibold">
                  Silveira Athias — IA em 100 % dos fluxos.
                </p>
              </div>
            </CarouselItem>
            <CarouselItem className="md:basis-1/3">
              <div className="h-full rounded-xl border border-border bg-card p-5 shadow-soft flex items-center justify-center text-center">
                <p className="text-sm md:text-base font-semibold">
                  DO IT Hub — 300 % + de eficiência operacional.
                </p>
              </div>
            </CarouselItem>
          </CarouselContent>
          <div className="hidden md:flex items-center justify-center gap-3 mt-3">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </section>

      {/* BLOCO 4 — EXCLUSIVIDADE / URGÊNCIA + CTA */}
      <section className="space-y-5">
        <div className="rounded-xl border border-border p-6 md:p-8 bg-card">
          <p className="text-sm md:text-base text-foreground">
            Este programa é exclusivo e personalizado, faz parte da seleção das apenas 100 
            empresas selecionadas em 2026 para integração corporativa de IA no Brasil.
          </p>
        </div>
        <div className="flex justify-center">
          <Button
            size="lg"
            className="h-14 px-8 bg-gradient-primary hover:opacity-90 text-white font-bold"
            onClick={handleCTA}
          >
            Garantir meu diagnóstico agora →
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pt-8 border-t border-border">
        <div className="flex flex-col items-center gap-4">
          <img
            src="https://res.cloudinary.com/dcg2hwh7x/image/upload/v1754072812/Avatar_e_Logos_Vanguardia_Prancheta_1_co%CC%81pia_10_2_fo95dj.png"
            alt="VanguardIA logo"
            loading="lazy"
            className="w-12 h-12 object-contain"
          />
          <p className="text-sm text-muted-foreground">Eficiência que liberta.</p>

          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/5591999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-smooth"
              aria-label="Fale conosco no WhatsApp"
            >
              <Phone className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href="https://www.linkedin.com/company/vanguardia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-smooth"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/vanguardia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-smooth"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
              Instagram
            </a>
          </div>

          <p className="text-xs text-muted-foreground mt-1">© 2026 Grupo VanguardIA</p>
        </div>
      </footer>
    </div>
  );
};

export default FormSuccess;