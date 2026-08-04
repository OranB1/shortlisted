"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "destructive" | "ghost" | "pill";
export type ButtonSize = "sm" | "md" | "lg";

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: "rounded-buttons bg-acid-lime text-void hover:opacity-90",
  secondary: "rounded-buttons border border-graphite text-mist hover:border-smoke hover:text-paper",
  destructive: "rounded-buttons bg-coral-red text-paper hover:opacity-90",
  ghost: "rounded-buttons text-mist hover:text-paper",
  pill: "rounded-pills bg-bone text-void hover:opacity-90",
};

const SIZE_CLASS: Record<ButtonSize, string> = {
  sm: "px-3 py-[6px] text-[13px]",
  md: "px-4 py-[10px] text-[14px]",
  lg: "px-5 py-3 text-[15px]",
};

const BASE =
  "inline-flex items-center justify-center gap-2 font-[510] tracking-[-0.011em] transition-opacity disabled:pointer-events-none disabled:opacity-40";

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeading?: ReactNode;
  iconTrailing?: ReactNode;
  className?: string;
  children: ReactNode;
};

type LinkProps = BaseProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & { href: string };
type ButtonElProps = BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & { href?: undefined };

export function Button(props: LinkProps | ButtonElProps) {
  const { variant = "primary", size = "md", iconLeading, iconTrailing, className = "", children, ...rest } = props;
  const classes = `${BASE} ${VARIANT_CLASS[variant]} ${SIZE_CLASS[size]} ${className}`;

  if (typeof rest.href === "string") {
    const { href, ...anchorRest } = rest as LinkProps;
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {iconLeading}
        {children}
        {iconTrailing}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {iconLeading}
      {children}
      {iconTrailing}
    </button>
  );
}
