import { Badge } from "@/components/ui/badge";

const FormHeader = () => {
  return (
    <header className="space-y-4 pb-6 border-b border-border">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <img
            src="https://res.cloudinary.com/dcg2hwh7x/image/upload/v1754072832/Avatar_e_Logos_Vanguardia_Prancheta_1_co%CC%81pia_19_fs9aqj.png"
            alt="VanguardIA logo"
            loading="lazy"
            className="w-12 h-12 object-contain"
          />
          <div>
            <h1 className="text-xl font-bold text-foreground">VanguardIA</h1>
            <p className="text-xs text-muted-foreground">Eficiência que liberta</p>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <Badge variant="secondary" className="text-xs font-medium">
            +100 negócios acelerados em 2025
          </Badge>
          <Badge variant="secondary" className="text-xs font-medium">
            +5.000 profissionais habilitados em IA
          </Badge>
        </div>
      </div>
    </header>
  );
};

export default FormHeader;