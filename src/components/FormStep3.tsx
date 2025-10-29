import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Phone, User } from "lucide-react";

interface FormStep3Props {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

const FormStep3 = ({ formData, updateFormData }: FormStep3Props) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-3">
        <h2 className="text-3xl font-bold text-foreground">
          Pra onde enviamos seu Raio-X?
        </h2>
        <p className="text-muted-foreground">
          Seu relatório personalizado será enviado em até 5 minutos.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="flex items-center gap-2 text-sm font-medium">
            <User className="w-4 h-4 text-primary" />
            Nome completo *
          </Label>
          <Input
            id="fullName"
            placeholder="Digite seu nome completo"
            value={formData.fullName || ""}
            onChange={(e) => updateFormData("fullName", e.target.value)}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
            <Mail className="w-4 h-4 text-primary" />
            E-mail corporativo *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="nome@empresa.com"
            value={formData.email || ""}
            onChange={(e) => updateFormData("email", e.target.value)}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="whatsapp" className="flex items-center gap-2 text-sm font-medium">
            <Phone className="w-4 h-4 text-primary" />
            WhatsApp (com DDD) *
          </Label>
          <Input
            id="whatsapp"
            type="tel"
            placeholder="+55 91 99999-9999"
            value={formData.whatsapp || ""}
            onChange={(e) => updateFormData("whatsapp", e.target.value)}
            className="h-12"
          />
        </div>

        <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50 border border-border">
          <Checkbox
            id="lgpd"
            checked={formData.lgpdConsent || false}
            onCheckedChange={(checked) => updateFormData("lgpdConsent", checked)}
            className="mt-0.5"
          />
          <label htmlFor="lgpd" className="text-sm cursor-pointer flex-1">
            Autorizo o uso dos dados para geração do meu Raio-X personalizado e contato consultivo. *
          </label>
        </div>
      </div>

      <div className="bg-gradient-primary p-6 rounded-xl text-white space-y-3">
        <h3 className="font-bold text-lg">Raio-X de Eficiência com IA</h3>
        <p className="text-sm text-white/90">
          Gratuito e personalizado. Em 5 minutos, no seu WhatsApp e e-mail.
        </p>
        <p className="text-sm text-white/90">
          Descubra de uma vez o que é possível com IA, para a SUA realidade empresarial.
        </p>
      </div>
    </div>
  );
};

export default FormStep3;