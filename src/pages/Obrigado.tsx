import FormSuccess from "@/components/FormSuccess";

const Obrigado = () => {
  return (
    <section className="min-h-screen w-full bg-background flex items-center justify-center p-4">
      <div className="h-full max-h-[calc(100vh-2rem)] w-full max-w-5xl bg-card border border-border rounded-xl flex items-center justify-center overflow-hidden">
        <div className="w-full h-full overflow-auto px-6 py-8 md:px-12 md:py-12 lg:px-20">
          <div className="max-w-5xl mx-auto">
            <FormSuccess />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Obrigado;