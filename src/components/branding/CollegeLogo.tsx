import React from "react";
import Image from "next/image";
import { BRANDING_CONFIG } from "@/config/branding";

interface CollegeLogoProps {
  className?: string;
  size?: number;
  showName?: boolean;
}

export const CollegeLogo: React.FC<CollegeLogoProps> = ({
  className = "",
  size = 48,
  showName = true,
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div 
        className="relative shrink-0 flex items-center justify-center rounded-xl bg-primary/5 p-1 ring-1 ring-primary/15"
        style={{ width: size, height: size }}
      >
        <Image
          src={BRANDING_CONFIG.collegeLogoPath}
          alt={`${BRANDING_CONFIG.collegeName} Crest`}
          width={size}
          height={size}
          className="object-contain"
          priority
        />
      </div>
      {showName && (
        <div className="flex flex-col text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {BRANDING_CONFIG.collegeShortName}
          </span>
          <span className="text-sm font-semibold tracking-tight text-foreground line-clamp-1">
            {BRANDING_CONFIG.collegeName}
          </span>
        </div>
      )}
    </div>
  );
};
