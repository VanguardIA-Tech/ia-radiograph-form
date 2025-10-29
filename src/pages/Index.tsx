"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useIsMobile } from "../hooks/use-mobile";
import { FullscreenModal, RaioXForm } from "../components";

const Index = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const handleCTA = () => {
    if (isMobile) {
      // On mobile, open the dedicated page for focus & speed
      navigate("/aplicar");
    } else {
      // On desktop, open a full-screen modal
      setOpenModal(true);
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">Raio‑X de Eficiência com IA</h1>
        <p className="text-lg text-muted-foreground">
          Descubra o potencial da IA para sua empresa em 2 minutos e receba um relatório em até 5 minutos.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button
            onClick={handleCTA}
            className="bg-gradient-primary text-white h-12 px-6"
          >
            Começar Raio‑X
          </Button>
        </div>
        <p className="text-sm text-muted-foreground pt-4">
          Onde renderizar:
          <ul className="list-disc list-inside text-left mt-2 max-w-md mx-auto">
            <li><strong>Desktop:</strong> abrir como modal full-screen imediatamente após o clique no CTA.</li>
            <li><strong>Mobile:</strong> abrir como página dedicada full-screen para foco e velocidade.</li>
            <li><strong>Alternativa:</strong> rota interna <code>/aplicar</code> — evite redirecionar para domínios terceiros para não perder tracking.</li>
          </ul>
        </p>
      </div>

      <FullscreenModal open={openModal} onClose={() => setOpenModal(false)}>
        <div className="min-h-screen md:min-h-[600px]">
          <RaioXForm />
        </div>
      </FullscreenModal>
    </main>
  );
};

export default Index;