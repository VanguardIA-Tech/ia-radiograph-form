import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, User, Users, Briefcase } from "lucide-react";

interface FormStep1Props {
  formData: any;
  updateFormData: (field: string, value: string) => void;
}

const FormStep1 = ({ formData, updateFormData }: FormStep1Props) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-3">
        <h2 className="text-3xl font-bold text-foreground">
          Comece seu Raio-X de Eficiência com IA
        </h2>
        <p className="text-muted-foreground">
          Responda em 2 minutos. Em 5, você recebe o relatório no WhatsApp e e-mail.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="company" className="flex items-center gap-2 text-sm font-medium">
            <Building2 className="w-4 h-4 text-primary" />
            Nome da empresa *
          </Label>
          <Input
            id="company"
            placeholder="Ex: Rede Mais Saúde"
            value={formData.company || ""}
            onChange={(e) => updateFormData("company", e.target.value)}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role" className="flex items-center gap-2 text-sm font-medium">
            <User className="w-4 h-4 text-primary" />
            Seu cargo/função *
          </Label>
          <Select value={formData.role || ""} onValueChange={(value) => updateFormData("role", value)}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Selecione seu cargo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ceo">CEO</SelectItem>
              <SelectItem value="diretor">Diretor</SelectItem>
              <SelectItem value="gerente">Gerente</SelectItem>
              <SelectItem value="coordenador">Coordenador</SelectItem>
              <SelectItem value="outro">Outro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="employees" className="flex items-center gap-2 text-sm font-medium">
            <Users className="w-4 h-4 text-primary" />
            Número de colaboradores *
          </Label>
          <Select value={formData.employees || ""} onValueChange={(value) => updateFormData("employees", value)}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Selecione a faixa" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-10">1 a 10</SelectItem>
              <SelectItem value="11-50">11 a 50</SelectItem>
              <SelectItem value="51-200">51 a 200</SelectItem>
              <SelectItem value="200+">Mais de 200</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sector" className="flex items-center gap-2 text-sm font-medium">
            <Briefcase className="w-4 h-4 text-primary" />
            Setor de atuação *
          </Label>
          <Select value={formData.sector || ""} onValueChange={(value) => updateFormData("sector", value)}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Selecione o setor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="industria">Indústria</SelectItem>
              <SelectItem value="servicos">Serviços</SelectItem>
              <SelectItem value="saude">Saúde</SelectItem>
              <SelectItem value="varejo">Varejo</SelectItem>
              <SelectItem value="juridico">Jurídico</SelectItem>
              <SelectItem value="educacao">Educação</SelectItem>
              <SelectItem value="outro">Outro</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <p className="text-sm text-muted-foreground text-center">
        👉 Faltam só 2 etapas
      </p>
    </div>
  );
};

export default FormStep1;
