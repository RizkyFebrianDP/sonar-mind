"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import type {
  RawScores,
  HallucinationAuditRaw,
  BiasAuditRaw,
  EthicalDilemmaRaw,
  AssessmentResult,
} from "@/types/assessment";

// ============================================================
// Context Shape
// ============================================================

interface AssessmentContextType {
  rawScores: RawScores;
  assessmentResult: AssessmentResult | null;
  completedModules: Set<"hallucination" | "bias" | "ethical">;

  setHallucinationScore: (score: HallucinationAuditRaw) => void;
  setBiasScore: (score: BiasAuditRaw) => void;
  setEthicalScore: (score: EthicalDilemmaRaw) => void;
  setAssessmentResult: (result: AssessmentResult) => void;
  resetAssessment: () => void;
}

// ============================================================
// Default Values
// ============================================================

const defaultRawScores: RawScores = {
  hallucinationAudit: undefined,
  biasAudit: undefined,
  ethicalDilemma: undefined,
};

const AssessmentContext = createContext<AssessmentContextType | null>(null);

// ============================================================
// Provider Component
// ============================================================

export function AssessmentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [rawScores, setRawScores] = useState<RawScores>(defaultRawScores);
  const [assessmentResult, setAssessmentResult] =
    useState<AssessmentResult | null>(null);
  const [completedModules, setCompletedModules] = useState<
    Set<"hallucination" | "bias" | "ethical">
  >(new Set());

  const setHallucinationScore = useCallback(
    (score: HallucinationAuditRaw) => {
      setRawScores((prev) => ({ ...prev, hallucinationAudit: score }));
      setCompletedModules((prev) => new Set(prev).add("hallucination"));
    },
    []
  );

  const setBiasScore = useCallback((score: BiasAuditRaw) => {
    setRawScores((prev) => ({ ...prev, biasAudit: score }));
    setCompletedModules((prev) => new Set(prev).add("bias"));
  }, []);

  const setEthicalScore = useCallback((score: EthicalDilemmaRaw) => {
    setRawScores((prev) => ({ ...prev, ethicalDilemma: score }));
    setCompletedModules((prev) => new Set(prev).add("ethical"));
  }, []);

  const handleSetAssessmentResult = useCallback((result: AssessmentResult) => {
    setAssessmentResult(result);
  }, []);

  const resetAssessment = useCallback(() => {
    setRawScores(defaultRawScores);
    setAssessmentResult(null);
    setCompletedModules(new Set());
  }, []);

  return (
    <AssessmentContext.Provider
      value={{
        rawScores,
        assessmentResult,
        completedModules,
        setHallucinationScore,
        setBiasScore,
        setEthicalScore,
        setAssessmentResult: handleSetAssessmentResult,
        resetAssessment,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
}

// ============================================================
// Custom Hook
// ============================================================

export function useAssessment(): AssessmentContextType {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error(
      "useAssessment must be used within an <AssessmentProvider>"
    );
  }
  return context;
}
