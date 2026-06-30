"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LeadFormSchema, LeadFormType } from "@/lib/validations";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { LeadFormProps } from "@/types/form";

export function LeadForm({ campaignName, className }: LeadFormProps) {
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
    <div className={`p-8 bg-paper-warm rounded-2xl shadow-vintage-md text-espresso-dark border border-border-taupe/40 ${className || ""}`}>
      {isSuccess ? (
        <div className="text-center py-8">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-olive-primary/10 text-olive-primary mb-4 animate-[bounce_1s_infinite]">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-serif font-black text-espresso-dark">Đăng Ký Thành Công!</h3>
          <p className="mt-3 text-taupe-gray text-sm font-medium">
            Cảm ơn bạn. Đội ngũ CAM CAM sẽ liên hệ xác nhận bàn đặt và gửi quà tặng đặc biệt trong vòng 5 phút.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 font-sans">
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-espresso-dark mb-1.5" htmlFor="fullName">
              Họ và tên <span className="text-red-500">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Nguyễn Văn A"
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
                Số điện thoại <span className="text-red-500">*</span>
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
                placeholder="email@cua-ban.com"
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
              Món nước bạn muốn thưởng thức
            </label>
            <select
              id="drinkPreference"
              {...register("drinkPreference")}
              className="w-full px-4 py-3 rounded-xl border border-border-taupe/50 bg-paper-warm/50 text-espresso-dark text-sm focus:ring-2 focus:ring-olive-primary/20 focus:border-olive-primary focus:outline-none transition-all"
            >
              <option value="ca-phe-muoi">Cà Phê Muối CAM CAM (Signature)</option>
              <option value="matcha-latte">Matcha Latte Espresso</option>
              <option value="tra-sen-vang">Trà Sen Vàng Kem Sữa</option>
              <option value="tra-gao-rang">Trà Gạo Rang Trân Châu Đen</option>
              <option value="sua-chua-da">Sữa Chua Đá Xay Cổ Điển</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-espresso-dark mb-1.5" htmlFor="note">
              Lời nhắn gửi cho CAM CAM
            </label>
            <textarea
              id="note"
              rows={2}
              placeholder="Ghi chú thêm về giờ giấc đặt bàn hoặc khẩu vị nước..."
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
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-paper-warm" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Đang xử lý thông tin...
              </>
            ) : (
              "Xác Nhận Đăng Ký"
            )}
          </button>
        </form>
      )}
    </div>
  );
}

export default LeadForm;
