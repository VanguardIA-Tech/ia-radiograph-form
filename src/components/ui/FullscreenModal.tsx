"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface FullscreenModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const FullscreenModal: React.FC<FullscreenModalProps> = ({ open, onClose, children }) => {
  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-4 md:p-8 bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full h-full md:h-auto md:max-w-4xl bg-background rounded-lg shadow-strong overflow-auto">
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-3 top-3 z-10 inline-flex items-center justify-center rounded-md p-2 hover:bg-secondary/40"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        <div className="h-full w-full p-4 md:p-6">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default FullscreenModal;