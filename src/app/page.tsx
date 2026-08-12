import React from "react";
import { createClient } from "@/lib/supabase/server";
import { DashboardClient } from "@/components/dashboard/DashboardClient";
import type { AssessmentHistoryItem } from "@/types/assessment";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch history dari Supabase (terbaru dulu)
  const { data: historyData } = await supabase
    .from("assessment_history")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  const history: AssessmentHistoryItem[] = historyData ?? [];

  // Ambil skor terbaru untuk ditampilkan di dashboard
  const latestRecord = history[0] ?? null;

  return (
    <DashboardClient
      user={user}
      history={history}
      latestRecord={latestRecord}
    />
  );
}
