import { Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const FormHeader = () => {
  return (
    <header className="space-y-4 pb-6 border-b border-border">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Building2 className="w-6 h-6 text-primary-foreground" />
          </div>
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
