import React from "react";
import Image from "next/image";
import { BRANDING_CONFIG } from "@/config/branding";

interface ProductLogoProps {
  className?: string;
  size?: number;
  showSubtitle?: boolean;
}

export const ProductLogo: React.FC<ProductLogoProps> = ({
  className = "",
  size = 40,
  showSubtitle = true,
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div 
        className="relative shrink-0 flex items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20 ring-1 ring-white/10"
        style={{ width: size, height: size }}
      >
        <Image
          src={BRANDING_CONFIG.productLogoPath}
          alt={BRANDING_CONFIG.productName}
          width={size}
          height={size}
          className="rounded-xl object-contain p-1"
          priority
        />
      </div>
      <div className="flex flex-col text-left">
        <span className="text-base font-bold tracking-tight text-foreground sm:text-lg">
          {BRANDING_CONFIG.productName}
        </span>
        {showSubtitle && (
          <span className="text-xs font-medium text-muted-foreground">
            Placement Readiness & Intelligence
          </span>
        )}
      </div>
    </div>
  );
};
