"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Command as CommandPrimitive } from "cmdk";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import {
  type ComponentProps,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

type ComboboxData = { label: string; value: string };

type ComboboxContextType = {
  data: ComboboxData[];
  type: string;
  value: string;
  onValueChange: (value: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  width: number;
  setWidth: (width: number) => void;
};

const ComboboxContext = createContext<ComboboxContextType>({
  data: [],
  type: "item",
  value: "",
  onValueChange: () => {},
  open: false,
  onOpenChange: () => {},
  width: 200,
  setWidth: () => {},
});

export type ComboboxProps = {
  data: ComboboxData[];
  type: string;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
};

export const Combobox = ({
  data,
  type,
  defaultValue,
  value: controlledValue,
  onValueChange: controlledOnValueChange,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  children,
}: ComboboxProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? "");
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const [width, setWidth] = useState(200);

  const value = controlledValue ?? uncontrolledValue;
  const onValueChange = (next: string) => {
    setUncontrolledValue(next);
    controlledOnValueChange?.(next);
  };
  const open = controlledOpen ?? uncontrolledOpen;
  const onOpenChange = (next: boolean) => {
    setUncontrolledOpen(next);
    controlledOnOpenChange?.(next);
  };

  return (
    <ComboboxContext.Provider
      value={{ type, value, onValueChange, open, onOpenChange, data, width, setWidth }}
    >
      <PopoverPrimitive.Root open={open} onOpenChange={onOpenChange}>
        {children}
      </PopoverPrimitive.Root>
    </ComboboxContext.Provider>
  );
};

export type ComboboxTriggerProps = ComponentProps<"button">;

export const ComboboxTrigger = ({ className, children, ...props }: ComboboxTriggerProps) => {
  const { value, data, type, setWidth, open } = useContext(ComboboxContext);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) setWidth((entry.target as HTMLElement).offsetWidth);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [setWidth]);

  return (
    <PopoverPrimitive.Trigger asChild>
      <button
        ref={ref}
        type="button"
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-inputs border border-graphite bg-black/[0.025] px-[14px] py-[12px] text-left text-[14px] text-mist transition-colors focus:border-mist focus:outline-none",
          open && "border-mist",
          className
        )}
        {...props}
      >
        {children ?? (
          <>
            <span className={value ? "text-mist" : "text-ash"}>
              {value ? data.find((item) => item.value === value)?.label : `Select ${type}…`}
            </span>
            <ChevronsUpDown size={16} className="shrink-0 text-ash" />
          </>
        )}
      </button>
    </PopoverPrimitive.Trigger>
  );
};

export type ComboboxContentProps = ComponentProps<typeof CommandPrimitive>;

export const ComboboxContent = ({ className, children, ...props }: ComboboxContentProps) => {
  const { width } = useContext(ComboboxContext);

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align="start"
        sideOffset={6}
        style={{ width }}
        className={cn(
          "z-50 overflow-hidden rounded-cards border border-graphite bg-carbon p-0 shadow-xl outline-none",
          className
        )}
      >
        <CommandPrimitive className="flex flex-col" {...props}>
          {children}
        </CommandPrimitive>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
};

export type ComboboxInputProps = ComponentProps<typeof CommandPrimitive.Input>;

export const ComboboxInput = ({ className, ...props }: ComboboxInputProps) => {
  const { type } = useContext(ComboboxContext);

  return (
    <div className="flex items-center gap-2 border-b border-graphite px-3">
      <Search size={14} className="shrink-0 text-ash" />
      <CommandPrimitive.Input
        placeholder={`Search ${type}…`}
        className={cn(
          "w-full bg-transparent py-3 text-[14px] text-mist outline-none placeholder:text-ash",
          className
        )}
        {...props}
      />
    </div>
  );
};

export type ComboboxListProps = ComponentProps<typeof CommandPrimitive.List>;

export const ComboboxList = ({ className, ...props }: ComboboxListProps) => (
  <CommandPrimitive.List className={cn("max-h-64 overflow-y-auto p-1", className)} {...props} />
);

export type ComboboxEmptyProps = ComponentProps<typeof CommandPrimitive.Empty>;

export const ComboboxEmpty = ({ children, className, ...props }: ComboboxEmptyProps) => {
  const { type } = useContext(ComboboxContext);

  return (
    <CommandPrimitive.Empty className={cn("px-3 py-6 text-center text-body-sm text-fog", className)} {...props}>
      {children ?? `No ${type} found.`}
    </CommandPrimitive.Empty>
  );
};

export type ComboboxGroupProps = ComponentProps<typeof CommandPrimitive.Group>;

export const ComboboxGroup = (props: ComboboxGroupProps) => <CommandPrimitive.Group {...props} />;

export type ComboboxItemProps = ComponentProps<typeof CommandPrimitive.Item> & { value: string };

export const ComboboxItem = ({ className, children, value, ...props }: ComboboxItemProps) => {
  const { value: selectedValue, onValueChange, onOpenChange } = useContext(ComboboxContext);
  const isSelected = selectedValue === value;

  return (
    <CommandPrimitive.Item
      value={value}
      onSelect={() => {
        onValueChange(value);
        onOpenChange(false);
      }}
      className={cn(
        "flex cursor-pointer items-center justify-between gap-2 rounded-inputs px-3 py-2 text-body-sm text-mist outline-none data-[selected=true]:bg-black/[0.045] data-[selected=true]:text-paper",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {isSelected && <Check size={14} className="shrink-0 text-acid-lime" />}
    </CommandPrimitive.Item>
  );
};
