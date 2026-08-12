"use client";

import React, { useEffect, useState, useCallback, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  AlertCircle,
  Info,
  AlertTriangle,
  X,
} from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastMessage {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

export interface ToastProps {
  id?: string;
  type?: ToastType;
  title?: string;
  message: string;
  duration?: number;
  onClose: () => void;
}

export function Toast({
  type = "info",
  title,
  message,
  duration = 4000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const iconMap = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-500 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
  };

  const borderBadgeMap = {
    success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-950 dark:text-emerald-200",
    error: "border-rose-500/30 bg-rose-500/10 text-rose-950 dark:text-rose-200",
    info: "border-blue-500/30 bg-blue-500/10 text-blue-950 dark:text-blue-200",
    warning: "border-amber-500/30 bg-amber-500/10 text-amber-950 dark:text-amber-200",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-start gap-3 p-4 rounded-2xl border backdrop-blur-md shadow-xl max-w-md w-full bg-panel/95 border-border-subtle ${borderBadgeMap[type]}`}
      role="alert"
    >
      {iconMap[type]}
      <div className="flex-1 min-w-0 pr-1">
        {title && (
          <h4 className="text-sm font-semibold font-heading tracking-tight text-text-strong mb-0.5">
            {title}
          </h4>
        )}
        <p className="text-xs leading-relaxed text-text-muted">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="p-1.5 rounded-lg text-text-muted hover:text-text-strong hover:bg-black/5 dark:hover:bg-white/10 transition-colors shrink-0"
        aria-label="Tutup notifikasi"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

// Toast Context & Hook implementation for global or localized usage
interface ToastContextType {
  showToast: (toast: Omit<ToastMessage, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((toast: Omit<ToastMessage, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full px-4 sm:px-0 pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <div key={toast.id} className="pointer-events-auto w-full">
              <Toast
                type={toast.type}
                title={toast.title}
                message={toast.message}
                duration={toast.duration ?? 4000}
                onClose={() => removeToast(toast.id)}
              />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    // Fallback simple state logic if not wrapped in ToastProvider
    const [localToasts, setLocalToasts] = useState<ToastMessage[]>([]);
    
    const showToast = (toast: Omit<ToastMessage, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      setLocalToasts((prev) => [...prev, { ...toast, id }]);
    };
    
    const removeToast = (id: string) => {
      setLocalToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return { toasts: localToasts, showToast, removeToast };
  }
  return context;
}
