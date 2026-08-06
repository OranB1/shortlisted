"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { type ComponentProps, createContext, useContext } from "react";
import { cn } from "@/lib/utils";

export type ChoiceboxProps = ComponentProps<typeof RadioGroupPrimitive.Root>;

export const Choicebox = ({ className, ...props }: ChoiceboxProps) => (
  <RadioGroupPrimitive.Root className={cn("space-y-2", className)} {...props} />
);

type ChoiceboxItemContextValue = { value: string };

const ChoiceboxItemContext = createContext<ChoiceboxItemContextValue | null>(null);

const useChoiceboxItemContext = () => {
  const context = useContext(ChoiceboxItemContext);
  if (!context) {
    throw new Error("useChoiceboxItemContext must be used within a ChoiceboxItem");
  }
  return context;
};

export type ChoiceboxItemProps = ComponentProps<"label"> & { value: string };

export const ChoiceboxItem = ({ className, children, value, ...props }: ChoiceboxItemProps) => (
  <ChoiceboxItemContext.Provider value={{ value }}>
    <label
      className={cn(
        "flex w-full cursor-pointer items-start gap-3 rounded-inputs border border-graphite p-3 text-left text-body-sm transition-colors hover:border-smoke",
        "has-[[data-state=checked]]:border-acid-lime/40 has-[[data-state=checked]]:bg-acid-lime/[0.04]",
        className
      )}
      {...props}
    >
      {children}
    </label>
  </ChoiceboxItemContext.Provider>
);

export type ChoiceboxItemHeaderProps = ComponentProps<"div">;

export const ChoiceboxItemHeader = ({ className, ...props }: ChoiceboxItemHeaderProps) => (
  <div className={cn("flex flex-1 flex-col gap-1", className)} {...props} />
);

export type ChoiceboxItemTitleProps = ComponentProps<"div">;

export const ChoiceboxItemTitle = ({ className, ...props }: ChoiceboxItemTitleProps) => (
  <div className={cn("flex items-center font-[510] text-mist", className)} {...props} />
);

export type ChoiceboxItemSubtitleProps = ComponentProps<"span">;

export const ChoiceboxItemSubtitle = ({ className, ...props }: ChoiceboxItemSubtitleProps) => (
  <span className={cn("font-normal text-caption text-ash", className)} {...props} />
);

export type ChoiceboxItemDescriptionProps = ComponentProps<"p">;

export const ChoiceboxItemDescription = ({ className, ...props }: ChoiceboxItemDescriptionProps) => (
  <p className={cn("text-caption text-fog", className)} {...props} />
);

export type ChoiceboxIndicatorProps = Partial<ComponentProps<typeof RadioGroupPrimitive.Item>>;

export const ChoiceboxIndicator = ({ className, ...props }: ChoiceboxIndicatorProps) => {
  const { value } = useChoiceboxItemContext();

  return (
    <RadioGroupPrimitive.Item
      value={value}
      className={cn(
        "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border border-graphite data-[state=checked]:border-acid-lime",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="size-2 rounded-full bg-acid-lime" />
    </RadioGroupPrimitive.Item>
  );
};
