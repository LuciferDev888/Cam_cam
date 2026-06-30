"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LeadFormSchema, LeadFormType } from "@/lib/validations";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { LeadFormProps } from "@/types/form";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

export function LeadForm({ campaignName, className }: LeadFormProps) {
  const { lang } = useLanguage();
  const t = translations[lang].leadForm;
  const { ref, isInView } = useScrollAnimation();

  const { submitForm, isSubmitting, isSuccess, error } = useFormSubmit(campaignName);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormType>({
    resolver: zodResolver(LeadFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      drinkPreference: "ca-phe-muoi",
      note: "",
    },
  });

  const onSubmit = async (data: LeadFormType) => {
    const success = await submitForm(data);
    if (success) {
      reset();
    }
  };

  return (
    <div ref={ref} className="max-w-xl mx-auto w-full">
      {/* Title Block - Animates slide up, delay: 0ms */}
      <div
        style={{ transitionDelay: "0ms" }}
        className={cn(
          "text-center mb-10 space-y-3 animate-slide-up duration-700",
          isInView && "in-view"
        )}
      >
        <span className="text-xs font-bold tracking-widest uppercase text-olive-primary">
          {t.subtitle}
        </span>
        <h2 className="text-3xl font-serif font-black text-espresso-dark tracking-tight">
          {t.title}
        </h2>
        <p className="text-taupe-gray text-sm font-medium font-sans">
          {t.description}
        </p>
        <div className="w-12 h-[2px] bg-olive-primary mx-auto"></div>
      </div>

      {/* Form Card - Animates slide up, delay: 300ms */}
      <div
        style={{ transitionDelay: "300ms" }}
        className={cn(
          "p-8 bg-paper-warm rounded-3xl shadow-vintage-lg text-espresso-dark border border-border-taupe/40 animate-slide-up duration-700",
          isInView && "in-view",
          className
        )}
      >
        {isSuccess ? (
          <div className="text-center py-8">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-olive-primary/10 text-olive-primary mb-4 animate-[bounce_1s_infinite]">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-serif font-black text-espresso-dark">
              {lang === "vi" ? "Đăng Ký Thành Công!" : "Successfully Registered!"}
            </h3>
            <p className="mt-3 text-taupe-gray text-sm font-medium font-sans leading-relaxed">
              {t.success}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 font-sans">
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-espresso-dark mb-1.5" htmlFor="fullName">
                {t.fields.name} <span className="text-red-500">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                placeholder={lang === "vi" ? "Nguyễn Văn A" : "John Doe"}
                {...register("fullName")}
                className={`w-full px-4 py-3 rounded-xl border bg-paper-warm/50 text-espresso-dark text-sm focus:ring-2 focus:outline-none transition-all ${
                  errors.fullName
                    ? "border-red-500 focus:ring-red-100"
                    : "border-border-taupe/50 focus:ring-olive-primary/20 focus:border-olive-primary"
                }`}
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-red-500 font-semibold">{errors.fullName.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-espresso-dark mb-1.5" htmlFor="phoneNumber">
                  {t.fields.phone} <span className="text-red-500">*</span>
                </label>
                <input
                  id="phoneNumber"
                  type="text"
                  placeholder="09XXXXXXXX"
                  {...register("phoneNumber")}
                  className={`w-full px-4 py-3 rounded-xl border bg-paper-warm/50 text-espresso-dark text-sm focus:ring-2 focus:outline-none transition-all ${
                    errors.phoneNumber
                      ? "border-red-500 focus:ring-red-100"
                      : "border-border-taupe/50 focus:ring-olive-primary/20 focus:border-olive-primary"
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="mt-1 text-xs text-red-500 font-semibold">{errors.phoneNumber.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-espresso-dark mb-1.5" htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your-email@gmail.com"
                  {...register("email")}
                  className={`w-full px-4 py-3 rounded-xl border bg-paper-warm/50 text-espresso-dark text-sm focus:ring-2 focus:outline-none transition-all ${
                    errors.email
                      ? "border-red-500 focus:ring-red-100"
                      : "border-border-taupe/50 focus:ring-olive-primary/20 focus:border-olive-primary"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500 font-semibold">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-espresso-dark mb-1.5" htmlFor="drinkPreference">
                {lang === "vi" ? "Món nước bạn muốn thưởng thức" : "Your preferred beverage"}
              </label>
              <select
                id="drinkPreference"
                {...register("drinkPreference")}
                className="w-full px-4 py-3 rounded-xl border border-border-taupe/50 bg-paper-warm/50 text-espresso-dark text-sm focus:ring-2 focus:ring-olive-primary/20 focus:border-olive-primary focus:outline-none transition-all"
              >
                <option value="ca-phe-muoi">{lang === "vi" ? "Cà Phê Muối CAM CAM (Signature)" : "CAM CAM Salted Coffee (Signature)"}</option>
                <option value="matcha-latte">Matcha Latte</option>
                <option value="tra-sen-vang">{lang === "vi" ? "Trà Sen Vàng Kem Sữa" : "Golden Lotus Oolong"}</option>
                <option value="tra-gao-rang">{lang === "vi" ? "Trà Gạo Rang Trân Châu Đen" : "Roasted Rice Tea w/ Pearls"}</option>
                <option value="sua-chua-da">{lang === "vi" ? "Sữa Chua Cốm Non" : "Yogurt w/ Green Rice"}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-espresso-dark mb-1.5" htmlFor="note">
                {t.fields.note}
              </label>
              <textarea
                id="note"
                rows={2}
                placeholder={lang === "vi" ? "Số lượng khách, ghi chú đặc biệt..." : "Number of guests, special notes..."}
                {...register("note")}
                className="w-full px-4 py-3 rounded-xl border border-border-taupe/50 bg-paper-warm/50 text-espresso-dark text-sm focus:ring-2 focus:ring-olive-primary/20 focus:border-olive-primary focus:outline-none transition-all"
              ></textarea>
              {errors.note && (
                <p className="mt-1 text-xs text-red-500 font-semibold">{errors.note.message}</p>
              )}
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs font-semibold">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-olive-primary hover:bg-moss-dark text-paper-warm font-serif font-bold rounded-xl shadow-vintage-sm hover:shadow-vintage-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
            >
              {isSubmitting ? t.fields.submitting : t.fields.submit}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default LeadForm;
