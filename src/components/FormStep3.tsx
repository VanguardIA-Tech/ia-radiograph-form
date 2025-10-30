import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Phone, User } from "lucide-react";
import { toast } from "sonner";
import { useRef } from "react";
import type { ChangeEvent } from "react";

interface FormStep3Props {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "gmail.com.br",
  "hotmail.com",
  "hotmail.com.br",
  "outlook.com",
  "outlook.com.br",
  "live.com",
  "live.com.br",
  "yahoo.com",
  "yahoo.com.br",
  "icloud.com",
  "aol.com",
  "msn.com",
  "bol.com.br",
  "uol.com.br",
  "terra.com.br"
]);

function getEmailDomain(email: string) {
  const parts = String(email).toLowerCase().split("@");
  if (parts.length !== 2) return null;
  return parts[1].trim() || null;
}

function formatWhatsapp(value: string) {
  const raw = String(value);
  const digits = raw.replace(/\D/g, "");

  let rest = digits;
  let prefix = "";

  // Mantém +55 se o usuário digitar (ou já tiver)
  if (rest.startsWith("55")) {
    prefix = "+55 ";
    rest = rest.slice(2);
  } else if (raw.trim().startsWith("+")) {
    // Usuário começou com "+", mas não digitou 55 ainda
    prefix = "+";
  }

  // Limitar a 2 (DDD) + 9 dígitos do celular
  const ddd = rest.slice(0, 2);
  const number = rest.slice(2, 11);

  let formatted = prefix;
  if (ddd) {
    formatted += ddd + " ";
  }
  if (number.length > 5) {
    formatted += number.slice(0, 5) + "-" + number.slice(5);
  } else if (number.length > 0) {
    formatted += number;
  }

  return formatted.trim();
}

function caretIndexForNthDigit(formatted: string, n: number) {
  // n = quantidade de dígitos à esquerda do cursor
  if (n <= 0) {
    for (let i = 0; i < formatted.length; i++) {
      if (/\d/.test(formatted[i])) return i;
    }
    return 0;
  }
  let count = 0;
  for (let i = 0; i < formatted.length; i++) {
    if (/\d/.test(formatted[i])) {
      count++;
      if (count === n) {
        // cursor após o n-ésimo dígito
        return i + 1;
      }
    }
  }
  // Se n exceder a quantidade de dígitos, vai para o fim
  return formatted.length;
}

const FormStep3 = ({ formData, updateFormData }: FormStep3Props) => {
  const whatsappInputRef = useRef<HTMLInputElement | null>(null);

  const handleEmailBlur = () => {
    const domain = getEmailDomain(formData.email || "");
    if (domain && FREE_EMAIL_DOMAINS.has(domain)) {
      toast("Dica: prefira um e-mail corporativo (ex: nome@empresa.com) para agilizar o atendimento.");
    }
  };

  const handleWhatsappChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputEl = e.target;
    const rawValue = inputEl.value;
    const selectionStart = inputEl.selectionStart ?? rawValue.length;

    // Quantos dígitos existem à esquerda do cursor no valor digitado
    const digitsLeftOfCursor = rawValue.slice(0, selectionStart).replace(/\D/g, "").length;

    // Formatar o valor
    const formatted = formatWhatsapp(rawValue);

    // Atualizar estado controlado
    updateFormData("whatsapp", formatted);

    // Reposicionar o cursor após o re-render
    requestAnimationFrame(() => {
      const el = whatsappInputRef.current;
      if (!el) return;

      const totalDigits = formatted.replace(/\D/g, "").length;
      const n = Math.min(digitsLeftOfCursor, totalDigits);
      const newCaret = caretIndexForNthDigit(formatted, n);
      try {
        el.setSelectionRange(newCaret, newCaret);
      } catch {
        // Em alguns browsers móveis pode falhar; silenciosamente ignorar
      }
    });
  };

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
            onBlur={handleEmailBlur}
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
            placeholder="+55 11 9XXXX-XXXX"
            value={formData.whatsapp || ""}
            onChange={handleWhatsappChange}
            ref={whatsappInputRef}
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