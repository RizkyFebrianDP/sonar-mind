"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/ui/Icon";

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  title?: string;
  message: string;
  type: ToastType;
}

export interface ToastContextType {
  toasts: Toast[];
  showToast: (message: string, type?: ToastType, duration?: number, title?: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = "info", duration = 4000, title?: string) => {
      const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const newToast: Toast = { id, message, type, title };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextType {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

function ToastContainer({
  toasts,
  removeToast,
}: {
  toasts: Toast[];
  removeToast: (id: string) => void;
}) {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return <Icon id="82766" className="w-5 h-5 bg-emerald-500 shrink-0 mt-0.5" />;
      case "error":
        return <Icon id="82783" className="w-5 h-5 bg-rose-500 shrink-0 mt-0.5" />;
      case "warning":
        return <Icon id="82783" className="w-5 h-5 bg-amber-500 shrink-0 mt-0.5" />;
      case "info":
      default:
        return <Icon id="82742" className="w-5 h-5 bg-blue-500 shrink-0 mt-0.5" />;
    }
  };

  const getStyle = () => {
    switch (toast.type) {
      case "success":
        return "bg-panel/95 border-emerald-500/30 text-text-strong shadow-lg";
      case "error":
        return "bg-panel/95 border-rose-500/30 text-text-strong shadow-lg";
      case "warning":
        return "bg-panel/95 border-amber-500/30 text-text-strong shadow-lg";
      case "info":
      default:
        return "bg-panel/95 border-blue-500/30 text-text-strong shadow-lg";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border backdrop-blur-md transition-all ${getStyle()}`}
    >
      {getIcon()}
      <div className="flex-1 min-w-0 pr-1">
        {toast.title && (
          <h4 className="text-sm font-semibold font-heading tracking-tight text-text-strong mb-0.5">
            {toast.title}
          </h4>
        )}
        <p className="text-xs leading-relaxed text-text-muted break-words">
          {toast.message}
        </p>
      </div>
      <button
        onClick={onClose}
        className="opacity-70 hover:opacity-100 transition-opacity rounded-lg p-0.5 shrink-0"
        aria-label="Dismiss toast"
      >
        <Icon id="82771" className="w-4 h-4 bg-text-muted" />
      </button>
    </motion.div>
  );
}
