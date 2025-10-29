"use client";

import React from "react";
import RaioXForm from "@/components/RaioXForm";

const ApplyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-4xl p-6 md:p-8 lg:p-12">
        <RaioXForm />
      </div>
    </div>
  );
};

export default ApplyPage;