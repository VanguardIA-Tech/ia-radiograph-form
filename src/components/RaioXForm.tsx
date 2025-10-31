import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import FormHeader from "./FormHeader";
import FormProgress from "./FormProgress";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import FormStep3 from "./FormStep3";
import FormSuccess from "./FormSuccess";
import { useNavigate } from "react-router-dom";
import HighlightBox from "./HighlightBox";

const STORAGE_KEY = "vanguardia-form-data";
const TOTAL_STEPS = 3;
const WEBHOOK_URL = "https://automation.infra.vanguardia.cloud/webhook/funil-icia";

const VALID_DDDS = new Set([
  "11","12","13","14","15","16","17","18","19",
  "21","22","24","27","28",
  "31","32","33","34","35","37","38",
  "41","42","43","44","45","46","47","48","49",
  "51","53","54","55",
  "61","62","63","64","65","66","67","68","69",
  "71","73","74","75","77","79",
  "81","82","83","84","85","86","87","88","89",
  "91","92","93","94","95","96","97","98","99"
]);

function onlyDigits(s: string) {
  return String(s || "").replace(/\D/g, "");
}

function validateWhatsappNumber(value: string) {
  const digits = onlyDigits(value);
  const hasCountry = digits.startsWith("55");

  // Comprimento esperado: 13 (55 + 2 DDD + 9 celular) ou 11 (2 DDD + 9 celular)
  const expectedLen = hasCountry ? 13 : 11;
  const lengthOk = digits.length === expectedLen;

  // Extrair DDD
  let ddd = "";
  if (hasCountry && digits.length >= 4) {
    ddd = digits.slice(2, 4);
  } else if (!hasCountry && digits.length >= 2) {
    ddd = digits.slice(0, 2);
  }

  const dddOk = VALID_DDDS.has(ddd);
  return { lengthOk, dddOk };
}

const RaioXForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading saved form data:", e);
      }
    }
  }, []);

  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData]);

  const updateFormData = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.company?.trim()) {
          toast.error("Por favor, preencha o nome da empresa");
          return false;
        }
        if (!formData.role) {
          toast.error("Por favor, selecione seu cargo");
          return false;
        }
        if (!formData.employees) {
          toast.error("Por favor, selecione o número de colaboradores");
          return false;
        }
        if (!formData.sector) {
          toast.error("Por favor, selecione o setor de atuação");
          return false;
        }
        return true;

      case 2:
        if (!formData.priorityAreas || formData.priorityAreas.length === 0) {
          toast.error("Por favor, selecione pelo menos uma área prioritária");
          return false;
        }
        if (formData.priorityAreas.length > 3) {
          toast.error("Por favor, selecione no máximo 3 áreas prioritárias");
          return false;
        }
        if (!formData.focusAreas || formData.focusAreas.length === 0) {
          toast.error("Por favor, selecione pelo menos uma frente de foco");
          return false;
        }
        if (formData.aiUsage === undefined || formData.aiUsage === null) {
          toast.error("Por favor, indique o nível de uso de IA");
          return false;
        }
        if (!formData.bottleneck?.trim()) {
          toast.error("Por favor, descreva o principal gargalo de eficiência");
          return false;
        }
        return true;

      case 3:
        if (!formData.fullName?.trim()) {
          toast.error("Por favor, preencha seu nome completo");
          return false;
        }
        if (!formData.email?.trim() || !formData.email.includes("@")) {
          toast.error("Por favor, preencha um e-mail válido");
          return false;
        }
        if (!formData.whatsapp?.trim()) {
          toast.error("Por favor, preencha seu WhatsApp");
          return false;
        }
        {
          const { lengthOk, dddOk } = validateWhatsappNumber(formData.whatsapp);
          if (!lengthOk) {
            toast.error("Por favor, informe um WhatsApp válido com DDD (ex: +55 11 9XXXX-XXXX)");
            return false;
          }
          if (!dddOk) {
            toast.error("DDD inválido. Verifique e tente novamente.");
            return false;
          }
        }
        if (!formData.lgpdConsent) {
          toast.error("Por favor, aceite os termos de uso de dados");
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < TOTAL_STEPS) {
        setCurrentStep((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      return;
    }

    try {
      const payload = {
        ...formData,
        submittedAt: new Date().toISOString(),
      };

      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("Webhook responded with error:", res.status, text);
        toast.error("Erro ao enviar dados para o servidor. Tente novamente.");
        return;
      }

      console.log("Form submitted:", formData);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      localStorage.removeItem(STORAGE_KEY);
      setIsSubmitted(true);
      toast.success("Raio-X gerado com sucesso!");
      navigate("/obrigado");
    } catch (error) {
      toast.error("Erro ao enviar formulário. Tente novamente.");
      console.error("Submit error:", error);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.company && formData.role && formData.employees && formData.sector;
      case 2:
        return (
          formData.priorityAreas?.length > 0 &&
          formData.priorityAreas?.length <= 3 &&
          formData.focusAreas?.length > 0 &&
          formData.aiUsage !== undefined &&
          formData.bottleneck?.trim()
        );
      case 3:
        return (
          formData.fullName?.trim() &&
          formData.email?.trim() &&
          formData.whatsapp?.trim() &&
          formData.lgpdConsent
        );
      default:
        return false;
    }
  };

  if (isSubmitted) {
    return (
      <section className="min-h-screen min-w-screen w-screen h-screen bg-background">
        <div className="h-full w-full bg-card border-border border-l border-t border-r border-b flex items-center justify-center">
          <div className="w-full h-full overflow-auto px-6 py-8 md:px-12 md:py-12 lg:px-20">
            <div className="max-w-5xl mx-auto">
              <FormSuccess />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen min-w-screen w-screen h-screen bg-background">
      <div className="h-full w-full bg-card border border-border flex flex-col">
        {/* Área de conteúdo rolável */}
        <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12 md:py-12 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <FormHeader />

            <div className="mt-6">
              <FormProgress currentStep={currentStep} totalSteps={TOTAL_STEPS} />
            </div>

            {/* Colocar o destaque logo acima dos campos do formulário */}
            <div className="mt-8">
              <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-12 items-start">
                {/* Conteúdo principal: destaque + formulário (destaque fica ACIMA dos campos) */}
                <div className="lg:col-span-12">
                  <div className="mb-6">
                    {/* Mantém comportamento sticky do HighlightBox relativo ao scroll container */}
                    <HighlightBox />
                  </div>

                  <div className="min-h-[60vh]">
                    {currentStep === 1 && (
                      <FormStep1 formData={formData} updateFormData={updateFormData} />
                    )}
                    {currentStep === 2 && (
                      <FormStep2 formData={formData} updateFormData={updateFormData} />
                    )}
                    {currentStep === 3 && (
                      <FormStep3 formData={formData} updateFormData={updateFormData} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de ações fixa ao rodapé do card */}
        <div className="w-full border-t border-border bg-card px-6 py-4 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto flex gap-4">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="flex-1 h-12"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            )}

            {currentStep < TOTAL_STEPS ? (
              <Button
                type="button"
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex-1 h-12 bg-gradient-primary text-white transition-opacity hover:opacity-90"
              >
                Próximo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={!canProceed()}
                className="flex-1 h-12 bg-gradient-primary text-white font-bold transition-opacity hover:opacity-90"
              >
                🚀 Gerar meu Raio-X agora
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RaioXForm;