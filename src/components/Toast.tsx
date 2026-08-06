"use client";

import { Check, X } from "lucide-react";
import {
  Button,
  Text,
  UNSTABLE_Toast as AriaToast,
  UNSTABLE_ToastContent as ToastContent,
  UNSTABLE_ToastList as ToastList,
  UNSTABLE_ToastQueue as ToastQueue,
  UNSTABLE_ToastRegion as ToastRegion,
} from "react-aria-components";

export type ShortlistedToast = {
  title: string;
  description?: string;
};

export const toastQueue = new ToastQueue<ShortlistedToast>({
  maxVisibleToasts: 3,
});

export function GlobalToastRegion() {
  return (
    <ToastRegion queue={toastQueue} className="fixed bottom-6 right-6 z-100 flex flex-col gap-2">
      <ToastList<ShortlistedToast>>
        {({ toast }) => (
          <AriaToast
            toast={toast}
            className="flex w-80 items-start gap-3 rounded-cards border border-graphite bg-carbon p-4 shadow-xl animate-[toast-in_0.2s_ease-out]"
          >
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-pills bg-acid-lime/15 text-acid-lime">
              <Check size={12} />
            </span>
            <ToastContent className="flex-1">
              <Text slot="title" className="block text-[14px] font-[510] text-paper">
                {toast.content.title}
              </Text>
              {toast.content.description && (
                <Text slot="description" className="mt-1 block text-caption text-fog">
                  {toast.content.description}
                </Text>
              )}
            </ToastContent>
            <Button slot="close" className="text-ash transition-colors hover:text-mist">
              <X size={14} />
            </Button>
          </AriaToast>
        )}
      </ToastList>
    </ToastRegion>
  );
}
