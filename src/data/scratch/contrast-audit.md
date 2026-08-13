# Contrast Audit Results

## CRITICAL (WCAG Fail - Fix Immediately)

### 1. hallucination-audit/page.tsx L95
- Pattern: `bg-amber-500/10 text-amber-900 dark:text-amber-200`
- Problem: bg-amber-500/10 on #f7f5f0 renders ~#fdf5de (very pale yellow). text-amber-900 (#78350f) barely passes on this, but the /10 opacity varies by renderer.
- Fix: `bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-700/40`

### 2. learning/page.tsx L66 - Badge
- Pattern: `bg-amber-500/10 text-amber-500 border-amber-500/20`
- Problem: text-amber-500 (#f59e0b) on bg-amber-500/10 (pale yellow) — FAILS 4.5:1 in light mode (ratio ~2.3:1)
- Fix: text-amber-700 in light mode

### 3. results/page.tsx L43 - Developing badge
- Pattern: `bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20`
- Status: PASSES (amber-700 = #b45309, good ratio on pale yellow bg)
- No fix needed.

### 4. CandidateTable.tsx L25 - Score color
- Pattern: `text-yellow-600 dark:text-yellow-400 bg-yellow-500/10`
- Problem: yellow-600 (#ca8a04) on pale yellow bg - borderline
- Fix: text-yellow-700

### 5. ClassificationButtons.tsx L37 - Grey area button
- Pattern: `bg-yellow-500/12 text-yellow-700 dark:text-yellow-300`
- Status: yellow-700 (#a16207) on pale yellow - acceptable (passes ~4.5:1)

### 6. FeedbackOverlay.tsx L34-36 - Score colors on white bg
- Pattern: text-green-500 / text-yellow-500 / text-red-500 on bg-background
- Problem: text-yellow-500 (#eab308) on #f7f5f0 (light) FAILS badly (~2.0:1)  
- Fix: text-yellow-600 or text-amber-600

## SUMMARY OF FIXES NEEDED
1. hallucination-audit/page.tsx L95 — amber info bar 
2. learning/page.tsx L66 — badge color
3. CandidateTable.tsx L25 — yellow score text
4. FeedbackOverlay.tsx L35 — text-yellow-500 score
