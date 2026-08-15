"use client";

import React, { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { motion } from "framer-motion";
import { handleError } from "@/lib/error-handler";
import { useLanguage } from "@/context/LanguageContext";

const images = [
  "/login-assets/ai-halusination-missinformation.png",
  "/login-assets/bias-awarnes.png",
  "/login-assets/deffense2.png",
  "/login-assets/ethical.png",
];

const prompts = [
  "MIL-AI Competency Framework evaluating AI hallucinations and misinformation",
  "Algorithmic Bias Awareness in modern machine learning systems",
  "Building robust and resilient cognitive defenses against AI dependency",
  "Ethical Reasoning and Cognitive Agency in human-AI collaboration",
];

export default function LoginPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 2600);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="h-screen w-screen overflow-hidden bg-background text-text-strong antialiased [font-synthesis:none]">
      <div className="grid h-full w-full lg:grid-cols-[0.94fr_1.06fr]">
        {/* Left Column (Images Carousel) */}
        <div className="hidden lg:flex h-full justify-center overflow-hidden bg-panel border-r border-border-subtle px-7 py-8 text-text-strong sm:px-10 lg:py-16">
          <div className="flex w-full max-w-[500px] flex-col items-center">
            <div className="flex items-center gap-3 text-lg font-semibold text-text-strong">
              <div className="dark:hidden flex items-center">
                <img src="/icons/sonar-mind-logo-black.png" alt="Sonar Mind" className="h-6 object-contain" />
              </div>
              <div className="hidden dark:flex items-center">
                <img src="/icons/sonar-mind-logo-light.png" alt="Sonar Mind" className="h-6 object-contain" />
              </div>
              SONAR MIND
            </div>

            <div className="relative mt-6 grid w-full grid-cols-[1.55fr_1fr] gap-2 rounded-md">
              <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-20 bg-gradient-to-b from-panel to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-panel to-transparent" />
              <ImageTile
                src={images[0]}
                active={activeIndex === 0}
                className="row-span-2 h-[250px]"
              />
              <ImageTile
                src={images[1]}
                active={activeIndex === 1}
                className="h-[121px]"
              />
              <ImageTile
                src={images[3]}
                active={activeIndex === 3}
                className="h-[121px]"
              />
              <ImageTile
                src={images[2]}
                active={activeIndex === 2}
                className="col-span-2 h-[120px]"
              />
            </div>

            <div className="mt-4 w-full rounded-[10px] border border-dashed border-border-subtle px-5 py-4">
              <div className="flex items-center gap-4">
                <p className="line-clamp-4 flex-1 text-[13px] leading-relaxed text-text-muted">
                  <span className="font-semibold text-text-strong">/evaluate</span>{" "}
                  {prompts[activeIndex]}
                </p>
                <button className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-full bg-border-subtle text-text-strong transition-colors hover:bg-border-strong">
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>

            <p className="mt-4 max-w-[280px] text-center text-xl leading-tight text-text-strong">
              A comprehensive MIL-AI Competency Dashboard
            </p>

            <div className="mt-auto flex gap-2 pb-8 pt-6">
              {prompts.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={
                    activeIndex === index
                      ? "h-1 w-10 cursor-pointer rounded-full bg-text-strong"
                      : "h-1 w-4 cursor-pointer rounded-full bg-border-subtle hover:bg-border-strong"
                  }
                  aria-label={`Show prompt ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Auth Form) */}
        <div className="flex h-full items-center justify-center px-6 py-6 sm:px-10 lg:px-14 xl:px-20 overflow-y-auto">
          <AuthForm />
        </div>
      </div>
    </section>
  );
}

function ImageTile({ src, active, className }: { src: string; active: boolean; className: string }) {
  return (
    <div className={`${className} relative overflow-visible rounded-md ${active ? "z-10" : "z-0"}`}>
      <img
        src={src}
        alt="Generated artwork"
        className={`h-full w-full rounded-md object-cover transition-opacity duration-700 ${active ? "opacity-100" : "opacity-40"}`}
      />
      <FocusCorners active={active} />
    </div>
  );
}

function FocusCorners({ active }: { active: boolean }) {
  const baseClass = `pointer-events-none absolute h-4 w-4 border-text-strong/60 transition-all duration-500 ease-out ${active ? "translate-x-0 translate-y-0 opacity-100" : "opacity-0"}`;

  return (
    <>
      <div className={`${baseClass} -left-2 -top-2 border-l border-t ${active ? "" : "-translate-x-2 -translate-y-2"}`} />
      <div className={`${baseClass} -right-2 -top-2 border-r border-t ${active ? "" : "translate-x-2 -translate-y-2"}`} />
      <div className={`${baseClass} -bottom-2 -left-2 border-b border-l ${active ? "" : "-translate-x-2 translate-y-2"}`} />
      <div className={`${baseClass} -bottom-2 -right-2 border-b border-r ${active ? "" : "translate-x-2 translate-y-2"}`} />
    </>
  );
}

function AuthForm() {
  const router = useRouter();
  const { t } = useLanguage();
  const [isRegistering, setIsRegistering] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    const supabase = createClient();
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      const appError = handleError(error, "handleGoogleSignIn");
      setError(appError.message || "Gagal masuk dengan Google.");
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();

    try {
      if (isRegistering) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) throw signUpError;
        
        setError("Akun berhasil dibuat! Silakan masuk dengan akun baru Anda.");
        setIsRegistering(false);
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;
        
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      const appError = handleError(err, isRegistering ? "handleSignUp" : "handleSignIn");
      setError(appError.message || "Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const termsText = (
    <>
      By creating an account, you agree to our{" "}
      <a href="#" className="font-medium cursor-pointer text-text-muted underline underline-offset-2 hover:text-text-strong transition-colors">Terms and Services</a>
      {" "}and{" "}
      <a href="#" className="font-medium cursor-pointer text-text-muted underline underline-offset-2 hover:text-text-strong transition-colors">Privacy Policy</a>
    </>
  );

  return (
    <div className="mx-auto w-full max-w-[500px] text-center">
      <div className="flex lg:hidden items-center justify-center gap-3 text-lg font-semibold text-text-strong mb-8">
        <div className="dark:hidden flex items-center">
          <img src="/icons/sonar-mind-logo-black.png" alt="Sonar Mind" className="h-6 object-contain" />
        </div>
        <div className="hidden dark:flex items-center">
          <img src="/icons/sonar-mind-logo-light.png" alt="Sonar Mind" className="h-6 object-contain" />
        </div>
        SONAR MIND
      </div>

      <h1 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl lg:text-[42px] lg:leading-[1.05] max-w-full overflow-wrap-normal">
        {t.login.title}
      </h1>

      <div className="mt-7 flex">
        <SocialButton
          icon={<GoogleIcon />}
          label={t.login.continueWithGoogle}
          className="w-full h-11 text-base font-medium"
          onClick={handleGoogleSignIn}
        />
      </div>

      <div className="my-8 flex items-center gap-4 text-sm font-medium text-text-muted">
        <div className="h-px flex-1 bg-black/15" />
        or
        <div className="h-px flex-1 bg-black/15" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 text-left">
        <FieldBox
          label="Email"
          value={email}
          onChange={setEmail}
          type="email"
          placeholder={t.login.emailPlaceholder}
        />

        <FieldBox
          label="Password"
          value={password}
          onChange={setPassword}
          type="password"
          placeholder="•••••••••••••"
        />

        {isRegistering && (
          <div className="space-y-3 pt-2 text-xs leading-4 text-text-muted sm:text-[13px]">
            <CheckboxLine>
              I don't want to receive emails about sonar mind feature updates
            </CheckboxLine>
            <CheckboxLine>{termsText}</CheckboxLine>
          </div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center gap-2 ${error.includes('berhasil') ? 'text-green-600 bg-green-500/10 border-green-500/20' : 'text-red-600 bg-red-500/10 border-red-500/20'} border rounded-[8px] px-4 py-3 mt-2`}
          >
            {error.includes('berhasil') ? (
              <ArrowRight className="w-4 h-4 text-green-600 shrink-0" />
            ) : (
              <Icon id="82783" className="w-4 h-4 bg-red-600 shrink-0" />
            )}
            <p className="text-sm">{error}</p>
          </motion.div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-9 flex h-12 w-full cursor-pointer items-center justify-center rounded-[10px] border border-text-strong bg-text-strong text-lg font-medium text-background transition-colors hover:bg-text-strong/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> {t.results.loading.replace("...", "")}
            </span>
          ) : (
            t.login.continueWithEmail
          )}
        </button>
      </form>

      <p className="text-xs text-text-muted text-center mt-8">
        {isRegistering ? (
          <>
            Already have an account?{" "}
            <button type="button" onClick={() => { setIsRegistering(false); setError(null); }} className="font-semibold cursor-pointer text-text-strong hover:underline">Sign In</button>
          </>
        ) : (
          <>
            Don't have an account?{" "}
            <button type="button" onClick={() => { setIsRegistering(true); setError(null); }} className="font-semibold cursor-pointer text-text-strong hover:underline">Create an account</button>
          </>
        )}
      </p>
    </div>
  );
}

function SocialButton({ icon, label, className, onClick }: { icon: ReactNode; label: string; className?: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex cursor-pointer items-center justify-center gap-2 rounded-[8px] border border-sidebar-border bg-panel px-3 leading-none text-text-strong transition-colors hover:bg-black/5 ${className || 'h-9 text-sm'}`}
    >
      <span className="shrink-0">{icon}</span>
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}

function FieldBox({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: string;
  placeholder?: string;
}) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <label className="flex h-11 items-center justify-between gap-4 rounded-[8px] border border-sidebar-border bg-panel px-4 text-base leading-none focus-within:border-accent-blue focus-within:ring-1 focus-within:ring-accent-blue/20 transition-all">
      <input
        type={type}
        value={value}
        aria-label={label}
        placeholder={placeholder}
        onFocus={() => {
          if (!isEditing && !value) {
            setIsEditing(true);
          }
        }}
        onBlur={() => {
          if (!value) {
            setIsEditing(false);
          }
        }}
        onChange={(event) => {
          onChange(event.target.value);
          setIsEditing(true);
        }}
        className="min-w-0 flex-1 truncate bg-transparent text-text-strong outline-none placeholder:text-text-muted/60"
      />
      {(!isEditing && !value) && (
        <span className="shrink-0 font-medium text-text-strong pointer-events-none">{label}</span>
      )}
    </label>
  );
}

function CheckboxLine({ children }: { children: ReactNode }) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <span className="relative mt-0.5 size-3 shrink-0">
        <input
          type="checkbox"
          className="peer size-full appearance-none rounded-[2px] border border-text-muted/40 bg-panel checked:border-text-strong checked:bg-text-strong cursor-pointer"
        />
        <svg
          viewBox="0 0 12 12"
          className="pointer-events-none absolute inset-0 hidden size-full p-px text-background peer-checked:block"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 6.2 5 8.1 9 3.9"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span>{children}</span>
    </label>
  );
}

function GoogleIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84Z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"
        fill="#EB4335"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.05 12.54c-.03-3.02 2.47-4.47 2.58-4.54-1.41-2.06-3.6-2.34-4.38-2.37-1.86-.19-3.64 1.1-4.58 1.1-.95 0-2.42-1.07-3.98-1.04-2.05.03-3.94 1.19-4.99 3.02-2.13 3.69-.54 9.16 1.53 12.15 1.01 1.46 2.22 3.1 3.81 3.04 1.53-.06 2.11-.99 3.96-.99s2.37.99 3.99.96c1.65-.03 2.69-1.49 3.69-2.96 1.16-1.69 1.64-3.33 1.66-3.41-.04-.02-3.2-1.23-3.24-4.87ZM14.03 3.66c.84-1.02 1.41-2.43 1.25-3.84-1.21.05-2.68.81-3.55 1.83-.78.9-1.46 2.34-1.28 3.72 1.35.1 2.73-.69 3.58-1.71Z" />
    </svg>
  );
}
