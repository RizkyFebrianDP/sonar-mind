import React from "react";

interface IconProps {
  id: string;
  className?: string;
}

export function Icon({ id, className = "" }: IconProps) {
  return (
    <span
      className={`icon-mask inline-block ${className}`}
      style={{
        maskImage: `url('https://img.icons8.com/?id=${id}&format=png&size=64')`,
        WebkitMaskImage: `url('https://img.icons8.com/?id=${id}&format=png&size=64')`,
      }}
    />
  );
}
