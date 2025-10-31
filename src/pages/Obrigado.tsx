import FormSuccess from "@/components/FormSuccess";

const Obrigado = () => {
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
};

export default Obrigado;