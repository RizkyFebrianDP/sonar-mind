16:17:04.878 Running build in Washington, D.C., USA (East) – iad1
16:17:04.879 Build machine configuration: 2 cores, 8 GB
16:17:05.016 Cloning github.com/RizkyFebrianDP/sonar-mind (Branch: main, Commit: 35d602a)
16:17:05.017 Previous build caches not available.
16:17:05.297 Cloning completed: 281.000ms
16:17:05.627 Running "vercel build"
16:17:05.645 Vercel CLI 58.1.0
16:17:05.854 Installing dependencies...
16:17:19.135 
16:17:19.137 added 418 packages in 13s
16:17:19.138 
16:17:19.138 149 packages are looking for funding
16:17:19.138   run `npm fund` for details
16:17:19.181 Detected Next.js version: 16.3.0
16:17:19.188 Running "npm run build"
16:17:19.298 
16:17:19.298 > dashboard-assasment@0.1.0 build
16:17:19.299 > next build
16:17:19.299 
16:17:19.688 ▲ Next.js 16.3.0 (Turbopack)
16:17:19.737 ⚠ Invalid next.config.ts options detected: 
16:17:19.737 ⚠     Unrecognized key(s) in object: 'allowedDevOrigins' at "experimental"
16:17:19.737 ⚠ See more info here: https://nextjs.org/docs/messages/invalid-next-config
16:17:19.830   Applying modifyConfig from Vercel
16:17:19.832 ✓ Running next.config.ts took 145ms
16:17:19.880 Attention: Next.js now collects completely anonymous telemetry regarding usage.
16:17:19.881 This information is used to shape Next.js' roadmap and prioritize features.
16:17:19.881 You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
16:17:19.881 https://nextjs.org/telemetry
16:17:19.881 
16:17:19.899 - Experiments (use with caution):
16:17:19.899   ? allowedDevOrigins (invalid experimental key)
16:17:19.899 
16:17:19.930   Creating an optimized production build ...
16:17:30.706 ✓ Compiled successfully in 9.9s
16:17:30.716   Running TypeScript ...
16:17:34.714 next.config.ts(5,5): error TS2353: Object literal may only specify known properties, and 'allowedDevOrigins' does not exist in type 'ExperimentalConfig'.
16:17:34.715 src/app/page.tsx(37,19): error TS2322: Type '{ hidden: { opacity: number; y: number; }; show: { opacity: number; y: number; transition: { type: string; stiffness: number; damping: number; }; }; }' is not assignable to type 'Variants'.
16:17:34.716   Property 'show' is incompatible with index signature.
16:17:34.716     Type '{ opacity: number; y: number; transition: { type: string; stiffness: number; damping: number; }; }' is not assignable to type 'Variant'.
16:17:34.716       Type '{ opacity: number; y: number; transition: { type: string; stiffness: number; damping: number; }; }' is not assignable to type 'TargetAndTransition'.
16:17:34.717         Type '{ opacity: number; y: number; transition: { type: string; stiffness: number; damping: number; }; }' is not assignable to type '{ transition?: Transition<any> | undefined; transitionEnd?: ResolvedValues$1 | undefined; }'.
16:17:34.717           Types of property 'transition' are incompatible.
16:17:34.717             Type '{ type: string; stiffness: number; damping: number; }' is not assignable to type 'Transition<any> | undefined'.
16:17:34.717               Type '{ type: string; stiffness: number; damping: number; }' is not assignable to type 'TransitionWithValueOverrides<any>'.
16:17:34.717                 Type '{ type: string; stiffness: number; damping: number; }' is not assignable to type 'ValueAnimationTransition<any>'.
16:17:34.717                   Types of property 'type' are incompatible.
16:17:34.717                     Type 'string' is not assignable to type 'AnimationGeneratorType | undefined'.
16:17:34.717 src/app/page.tsx(60,23): error TS2322: Type '{ hidden: { opacity: number; y: number; }; show: { opacity: number; y: number; transition: { type: string; stiffness: number; damping: number; }; }; }' is not assignable to type 'Variants'.
16:17:34.717   Property 'show' is incompatible with index signature.
16:17:34.717     Type '{ opacity: number; y: number; transition: { type: string; stiffness: number; damping: number; }; }' is not assignable to type 'Variant'.
16:17:34.717       Type '{ opacity: number; y: number; transition: { type: string; stiffness: number; damping: number; }; }' is not assignable to type 'TargetAndTransition'.
16:17:34.718         Type '{ opacity: number; y: number; transition: { type: string; stiffness: number; damping: number; }; }' is not assignable to type '{ transition?: Transition<any> | undefined; transitionEnd?: ResolvedValues$1 | undefined; }'.
16:17:34.718           Types of property 'transition' are incompatible.
16:17:34.718             Type '{ type: string; stiffness: number; damping: number; }' is not assignable to type 'Transition<any> | undefined'.
16:17:34.718               Type '{ type: string; stiffness: number; damping: number; }' is not assignable to type 'TransitionWithValueOverrides<any>'.
16:17:34.721                 Type '{ type: string; stiffness: number; damping: number; }' is not assignable to type 'ValueAnimationTransition<any>'.
16:17:34.722                   Types of property 'type' are incompatible.
16:17:34.722                     Type 'string' is not assignable to type 'AnimationGeneratorType | undefined'.
16:17:34.722 src/app/page.tsx(101,23): error TS2322: Type '{ hidden: { opacity: number; y: number; }; show: { opacity: number; y: number; transition: { type: string; stiffness: number; damping: number; }; }; }' is not assignable to type 'Variants'.
16:17:34.722   Property 'show' is incompatible with index signature.
16:17:34.722     Type '{ opacity: number; y: number; transition: { type: string; stiffness: number; damping: number; }; }' is not assignable to type 'Variant'.
16:17:34.722       Type '{ opacity: number; y: number; transition: { type: string; stiffness: number; damping: number; }; }' is not assignable to type 'TargetAndTransition'.
16:17:34.722         Type '{ opacity: number; y: number; transition: { type: string; stiffness: number; damping: number; }; }' is not assignable to type '{ transition?: Transition<any> | undefined; transitionEnd?: ResolvedValues$1 | undefined; }'.
16:17:34.722           Types of property 'transition' are incompatible.
16:17:34.723             Type '{ type: string; stiffness: number; damping: number; }' is not assignable to type 'Transition<any> | undefined'.
16:17:34.723               Type '{ type: string; stiffness: number; damping: number; }' is not assignable to type 'TransitionWithValueOverrides<any>'.
16:17:34.723                 Type '{ type: string; stiffness: number; damping: number; }' is not assignable to type 'ValueAnimationTransition<any>'.
16:17:34.723                   Types of property 'type' are incompatible.
16:17:34.723                     Type 'string' is not assignable to type 'AnimationGeneratorType | undefined'.
16:17:34.723 src/app/page.tsx(136,23): error TS2322: Type '{ hidden: { opacity: number; y: number; }; show: { opacity: number; y: number; transition: { type: string; stiffness: number; damping: number; }; }; }' is not assignable to type 'Variants'.
16:17:34.724   Property 'show' is incompatible with index signature.
16:17:34.724     Type '{ opacity: number; y: number; transition: { type: string; stiffness: number; damping: number; }; }' is not assignable to type 'Variant'.
16:17:34.724       Type '{ opacity: number; y: number; transition: { type: string; stiffness: number; damping: number; }; }' is not assignable to type 'TargetAndTransition'.
16:17:34.724         Type '{ opacity: number; y: number; transition: { type: string; stiffness: number; damping: number; }; }' is not assignable to type '{ transition?: Transition<any> | undefined; transitionEnd?: ResolvedValues$1 | undefined; }'.
16:17:34.724           Types of property 'transition' are incompatible.
16:17:34.724             Type '{ type: string; stiffness: number; damping: number; }' is not assignable to type 'Transition<any> | undefined'.
16:17:34.724               Type '{ type: string; stiffness: number; damping: number; }' is not assignable to type 'TransitionWithValueOverrides<any>'.
16:17:34.724                 Type '{ type: string; stiffness: number; damping: number; }' is not assignable to type 'ValueAnimationTransition<any>'.
16:17:34.724                   Types of property 'type' are incompatible.
16:17:34.724                     Type 'string' is not assignable to type 'AnimationGeneratorType | undefined'.
16:17:34.743 Failed to type check.
16:17:34.744 
16:17:34.818 Error: Command "npm run build" exited with 1