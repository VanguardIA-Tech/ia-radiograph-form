import { cn } from "@/lib/utils";

interface HighlightBoxProps {
  className?: string;
}

const HighlightBox = ({ className }: HighlightBoxProps) => {
  return (
    <aside
      aria-label="Destaque Raio-X de Eficiência com IA"
      className={cn(
        "bg-gradient-primary text-white rounded-xl shadow-medium",
        "p-5 sm:p-6",
        "sticky top-2 lg:top-8",
        className
      )}
    >
      <div className="space-y-2">
        <h3 className="text-lg sm:text-xl font-extrabold leading-snug">
          Raio-X de Eficiência com IA. Gratuito e personalizado.
        </h3>
        <p className="text-sm sm:text-[15px] text-white/95">
          Em 5 minutos, no seu WhatsApp e e-mail.
        </p>
        <p className="text-sm sm:text-[15px] text-white/95">
          Descubra de uma vez o que é possível com IA, para a SUA realidade empresarial.
        </p>
      </div>
    </aside>
  );
};

export default HighlightBox;