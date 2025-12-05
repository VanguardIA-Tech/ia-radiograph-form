import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { safeEvent, setTag, validationErrorOnce, hashEmail, identifyOnce, upgrade } from "@/components/clarity/observability";
import FormHeader from "./FormHeader";
import FormProgress from "./FormProgress";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import FormStep3 from "./FormStep3";
import FormSuccess from "./FormSuccess";

const STORAGE_KEY = "vanguardia-form-data";
const TOTAL_STEPS = 3;

const RaioXForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading saved form data:", e);
      }
    }
    safeEvent("form:loaded");
  }, []);

  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData]);

  useEffect(() => {
    safeEvent(`form:step_${currentStep}_view`);
    setTag("form_current_step", String(currentStep));
  }, [currentStep]);

  const updateFormData = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

    // Helper para validação + tracking
    const fail = (field: string, message: string) => {
      validationErrorOnce(field);
      toast.error(message);
      return false;
    };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.company?.trim()) return fail("company", "Por favor, preencha o nome da empresa");
        if (!formData.role) return fail("role", "Por favor, selecione seu cargo");
        if (!formData.employees) return fail("employees", "Por favor, selecione o número de colaboradores");
        if (!formData.sector) return fail("sector", "Por favor, selecione o setor de atuação");
        return true;
      case 2:
        if (!formData.priorityAreas || formData.priorityAreas.length === 0)
          return fail("priorityAreas", "Por favor, selecione pelo menos uma área prioritária");
        if (formData.priorityAreas.length > 3)
          return fail("priorityAreas_max", "Por favor, selecione no máximo 3 áreas prioritárias");
        if (!formData.focusAreas || formData.focusAreas.length === 0)
          return fail("focusAreas", "Por favor, selecione pelo menos uma frente de foco");
        if (formData.aiUsage === undefined || formData.aiUsage === null)
          return fail("aiUsage", "Por favor, indique o nível de uso de IA");
        if (!formData.bottleneck?.trim())
          return fail("bottleneck", "Por favor, descreva o principal gargalo de eficiência");
        return true;
      case 3:
        if (!formData.fullName?.trim()) return fail("fullName", "Por favor, preencha seu nome completo");
        if (!formData.email?.trim() || !formData.email.includes("@"))
          return fail("email", "Por favor, preencha um e-mail válido");
        if (!formData.whatsapp?.trim()) return fail("whatsapp", "Por favor, preencha seu WhatsApp");
        if (!formData.lgpdConsent) return fail("lgpdConsent", "Por favor, aceite os termos de uso de dados");
        return true;
      default:
        return true;
    }
  };
  const handleNext = () => {
    safeEvent(`form:next_click:step_${currentStep}`);
    if (validateStep(currentStep)) {
      if (currentStep === 1) {
        if (formData.employees) setTag("company_employees_range", String(formData.employees));
        if (formData.sector) setTag("company_sector", String(formData.sector));
      }
      if (currentStep === 2) {
        if (formData.aiUsage !== undefined) setTag("ai_usage_level", String(formData.aiUsage));
        const count = formData.priorityAreas?.length ?? 0;
        setTag("priority_areas_count", String(count));
      }
      if (currentStep < TOTAL_STEPS) {
        setCurrentStep((prev) => prev + 1);
        safeEvent(`form:next_success:from_${currentStep}_to_${currentStep + 1}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleBack = () => {
    safeEvent(`form:back_click:step_${currentStep}`);
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      safeEvent(`form:back_success:from_${currentStep}_to_${currentStep - 1}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    safeEvent("form:submit_click");
    if (!validateStep(currentStep)) {
      return;
    }

    try {
      safeEvent("form:submit_attempt");
      console.log("Form submitted:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      safeEvent("form:submit_success");
      setTag("form_http_status", "200");
      if (formData.email) {
        const hash = await hashEmail(formData.email);
        await identifyOnce(hash);
      }
      upgrade("form_submit");
      localStorage.removeItem(STORAGE_KEY);
      setIsSubmitted(true);
      toast.success("Raio-X gerado com sucesso!");
    } catch (error) {
      safeEvent("form:submit_error");
      setTag("form_http_status", "500");
      toast.error("Erro ao enviar formulário. Tente novamente.");
      console.error("Submit error:", error);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return Boolean(formData.company?.trim() && formData.role && formData.employees && formData.sector);
      case 2:
        return Boolean(
          formData.priorityAreas?.length > 0 &&
          formData.priorityAreas?.length <= 3 &&
          formData.focusAreas?.length > 0 &&
          formData.aiUsage !== undefined &&
          formData.bottleneck?.trim()
        );
      case 3:
        return Boolean(
          formData.fullName?.trim() &&
          formData.email?.trim() &&
          formData.whatsapp?.trim() &&
          formData.lgpdConsent
        );
      default:
        return false;
    }
  };

  // FULL-SCREEN LAYOUT:
  // - Root section occupies full viewport (100vw x 100vh).
  // - The "card" fills the viewport with no outer padding; internal content scrolls.
  // - Action bar (buttons) is fixed to the bottom of the card.
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
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12 md:py-12 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <FormHeader />

            <div className="mt-6">
              <FormProgress currentStep={currentStep} totalSteps={TOTAL_STEPS} />
            </div>

            <div className="mt-8 min-h-[60vh]">
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

        {/* Action bar fixed to bottom of the card */}
        <div className="w-full border-t border-border bg-card px-6 py-4 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto flex gap-4">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="flex-1 h-12"
                data-cta="form:voltar-etapa-anterior"
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
                data-cta="form:avancar-proxima-etapa"
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
                data-cta="form:enviar-diagnostico"
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