"use client";

import React, { useEffect, useState } from "react";
import { learningModules } from "@/data/learning-modules";
import { LearningCard } from "./LearningCard";
import { createClient } from "@/lib/supabase/client";

export function LearningGrid() {
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProgress() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const { data, error } = await supabase
            .from("user_learning_progress")
            .select("completed_modules")
            .eq("user_id", user.id)
            .single();
            
          if (!error && data?.completed_modules) {
            setCompletedModules(data.completed_modules as string[]);
          }
        }
      } catch (err) {
        console.error("Failed to load learning progress", err);
      } finally {
        setLoading(false);
      }
    }
    
    loadProgress();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 bg-card-bg border border-card-border rounded-xl"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {learningModules.map((module) => (
        <LearningCard 
          key={module.id} 
          module={module} 
          isCompleted={completedModules.includes(module.id)} 
        />
      ))}
    </div>
  );
}
