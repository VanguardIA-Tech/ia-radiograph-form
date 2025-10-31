import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { 
  FileText, 
  TrendingUp, 
  ShoppingCart, 
  Cog, 
  GitBranch,
  DollarSign,
  Users,
  GraduationCap,
  Network,
  FileCheck,
  Zap
} from "lucide-react";

interface FormStep2Props {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

const areas = [
  { value: "administrativo", label: "Administrativo", icon: FileText },
  { value: "marketing", label: "Marketing", icon: TrendingUp },
  { value: "vendas", label: "Vendas", icon: ShoppingCart },
  { value: "operacoes", label: "Operações", icon: Cog },
  { value: "processos", label: "Processos", icon: GitBranch },
  { value: "financeiro", label: "Financeiro", icon: DollarSign },
  { value: "rh", label: "RH", icon: Users },
];

const focuses = [
  { value: "treinamento", label: "Treinamento prático com IA para as Pessoas", icon: GraduationCap },
  { value: "integracao", label: "Integração entre setores e sistemas", icon: Network },
  { value: "politicas", label: "Políticas Internas de Uso de IA", icon: FileCheck },
  { value: "automacao", label: "Automação de tarefas repetitivas", icon: Zap },
];

const FormStep2 = ({ formData, updateFormData }: FormStep2Props) => {
  const toggleArea = (area: string) => {
    const currentAreas = formData.priorityAreas || [];
    const newAreas = currentAreas.includes(area)
      ? currentAreas.filter((a: string) => a !== area)
      : [...currentAreas, area];
    updateFormData("priorityAreas", newAreas);
  };

  const toggleFocus = (focus: string) => {
    const currentFocuses = formData.focusAreas || [];
    const newFocuses = currentFocuses.includes(focus)
      ? currentFocuses.filter((f: string) => f !== focus)
      : [...currentFocuses, focus];
    updateFormData("focusAreas", newFocuses);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-3 text-center">
        <h2 className="text-3xl font-bold text-foreground">
          Onde a IA pode gerar mais impacto para você?
        </h2>
        <p className="text-muted-foreground">
          Escolha até 3 áreas para o Raio-X priorizar.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Label className="text-sm font-medium">Áreas prioritárias *</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {areas.map((area) => {
              const Icon = area.icon;
              const isSelected = (formData.priorityAreas || []).includes(area.value);
              return (
                <button
                  key={area.value}
                  type="button"
                  onClick={() => toggleArea(area.value)}
                  className={`
                    flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all duration-300
                    ${isSelected 
                      ? 'border-primary bg-primary/5 shadow-soft' 
                      : 'border-border hover:border-primary/50 hover:bg-secondary'
                    }
                  `}
                >
                  <Icon className={`w-6 h-6 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className={`text-xs font-medium text-center ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                    {area.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-sm font-medium">Qual dessas frentes mais representa seu foco agora? *</Label>
          <div className="space-y-3">
            {focuses.map((focus) => {
              const Icon = focus.icon;
              const isSelected = (formData.focusAreas || []).includes(focus.value);
              return (
                <label
                  key={focus.value}
                  className={`
                    flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-300
                    ${isSelected 
                      ? 'border-primary bg-primary/5 shadow-soft' 
                      : 'border-border hover:border-primary/50 hover:bg-secondary'
                    }
                  `}
                >
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => toggleFocus(focus.value)}
                    className="mt-0.5"
                  />
                  <div className="flex-1 flex items-center gap-3">
                    <Icon className={`w-5 h-5 flex-shrink-0 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className="text-sm">{focus.label}</span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-sm font-medium">
            Hoje, quanto sua empresa aproveita o potencial da IA? *
          </Label>
          <div className="space-y-3">
            <Slider
              value={[formData.aiUsage || 0]}
              onValueChange={(value) => updateFormData("aiUsage", value[0])}
              max={10}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0 - Nada ainda</span>
              <span className="font-semibold text-primary">{formData.aiUsage || 0}</span>
              <span>10 - Totalmente integrada</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bottleneck" className="text-sm font-medium">
            Em uma frase, qual gargalo mais trava sua eficiência hoje? *
          </Label>
          <Textarea
            id="bottleneck"
            placeholder="Ex: demora em relatórios ou retrabalho entre áreas"
            value={formData.bottleneck || ""}
            onChange={(e) => updateFormData("bottleneck", e.target.value)}
            className="min-h-[100px] resize-none"
          />
        </div>
      </div>

      <p className="text-sm text-muted-foreground text-center">
        Faltam 30 segundos para o seu Raio-X personalizado
      </p>
    </div>
  );
};

export default FormStep2;