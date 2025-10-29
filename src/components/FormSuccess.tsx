import { CheckCircle2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const FormSuccess = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 text-center">
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center animate-in zoom-in duration-700">
          <CheckCircle2 className="w-12 h-12 text-white" />
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-3xl font-bold text-foreground">
          Perfeito! 🎉
        </h2>
        <p className="text-lg text-muted-foreground">
          Estamos processando seu Raio-X agora{dots}
        </p>
      </div>

      <div className="bg-secondary/50 p-6 rounded-xl border border-border space-y-2">
        <p className="text-sm font-medium text-foreground">
          📱 Em até 5 minutos você receberá no WhatsApp e e-mail:
        </p>
        <ul className="text-sm text-muted-foreground space-y-1 text-left max-w-md mx-auto">
          <li>✓ Análise personalizada da sua empresa</li>
          <li>✓ Oportunidades de eficiência com IA</li>
          <li>✓ Recomendações específicas para seu setor</li>
          <li>✓ Próximos passos para implementação</li>
        </ul>
      </div>

      <div className="space-y-4 pt-4">
        <p className="text-sm font-medium text-foreground">
          Quer acelerar ainda mais?
        </p>
        <Button 
          size="lg" 
          className="bg-gradient-primary hover:opacity-90 transition-opacity text-white h-14 px-8"
          onClick={() => window.open('https://wa.me/5591999999999', '_blank')}
        >
          <Calendar className="w-5 h-5 mr-2" />
          Agendar Diagnóstico Completo
        </Button>
        <p className="text-xs text-muted-foreground">
          Um consultor sênior vai te mostrar como aplicar cada insight do seu relatório.
        </p>
      </div>

      <div className="pt-8 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Eficiência que liberta.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          © 2026 Grupo VanguardIA
        </p>
      </div>
    </div>
  );
};

export default FormSuccess;
