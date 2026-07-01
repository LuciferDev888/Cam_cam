"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LeadFormSchema, LeadFormType } from "@/lib/validations";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { LeadFormProps } from "@/types/form";
import { useLanguage } from "@/context/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const REGIONS = [
  { vi: "Hải Châu", en: "Hai Chau" },
  { vi: "Thanh Khê", en: "Thanh Khe" },
  { vi: "Sơn Trà", en: "Son Tra" },
  { vi: "Ngũ Hành Sơn", en: "Ngu Hanh Son" },
  { vi: "Liên Chiểu", en: "Lien Chieu" },
  { vi: "Cẩm Lệ", en: "Cam Le" }
];

export function LeadForm({ campaignName, className }: LeadFormProps) {
  const { lang } = useLanguage();
  const { ref, isInView } = useScrollAnimation();

  const { submitForm, isSubmitting, isSuccess } = useFormSubmit(campaignName);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormType>({
    resolver: zodResolver(LeadFormSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      deliveryAddress: "",
      district: "Hải Châu",
      paymentMethod: "cod",
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
    <div ref={ref} className={cn("w-full relative z-10", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Delivery Details & Regions (Columns 1-6) */}
        <div
          style={{ transitionDelay: "0ms" }}
          className={cn(
            "lg:col-span-6 space-y-6 animate-slide-in-left duration-700",
            isInView && "in-view"
          )}
        >
          <span className="text-xs font-bold tracking-widest uppercase text-olive-primary block">
            {lang === "vi" ? "KHU VỰC GIAO HÀNG" : "DELIVERY SERVICE"}
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-espresso-dark leading-[1.15] tracking-tight">
            {lang === "vi" ? "Giao trà tận nơi tại Đà Nẵng" : "Fresh Tea Delivery in Danang"}
          </h2>
          <p className="text-taupe-gray text-sm md:text-base leading-relaxed font-sans font-medium">
            {lang === "vi" 
              ? "Giao nhanh nội thành. Phí giao hàng có thể áp dụng theo khoảng cách. Hỗ trợ đặt qua Zalo, Messenger và các nền tảng giao hàng nếu cửa hàng có gian hàng."
              : "Fast local delivery. Delivery fee is distance-based. Support ordering via Zalo, Messenger, and popular delivery platforms."}
          </p>

          {/* Region Pills */}
          <div className="pt-4 space-y-3">
            <span className="text-[10px] font-bold tracking-wider uppercase text-espresso-dark/60 block font-sans">
              {lang === "vi" ? "QUẬN PHỤC VỤ CHÍNH" : "MAIN SERVICE AREAS"}
            </span>
            <div className="flex flex-wrap gap-2.5">
              {REGIONS.map((region, rIdx) => (
                <span
                  key={rIdx}
                  className="px-4 py-2 border border-border-taupe/35 text-espresso-dark bg-paper-warm/50 hover:bg-[#FAF7F0] font-sans font-bold rounded-full text-xs shadow-vintage-sm hover:shadow-vintage-md hover:-translate-y-0.5 transition-all duration-300 pointer-events-none"
                >
                  {lang === "vi" ? region.vi : region.en}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Order Form Card (Columns 7-12) */}
        <div
          style={{ transitionDelay: "200ms" }}
          className={cn(
            "lg:col-span-6 flex justify-center animate-slide-in-right duration-700",
            isInView && "in-view"
          )}
        >
          <div className="w-full max-w-[480px] p-6 md:p-8 bg-[#FAF7F0] rounded-3xl shadow-vintage-lg text-espresso-dark border border-border-taupe/35 relative overflow-hidden bg-paper-warm/45 backdrop-blur-sm">
            
            {/* Corner Ornaments */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-border-taupe/30"></div>
            <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-border-taupe/30"></div>
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-border-taupe/30"></div>
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-border-taupe/30"></div>

            {isSuccess ? (
              <div className="text-center py-10 relative z-10">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-olive-primary/10 text-olive-primary mb-4 animate-[bounce_1.2s_infinite]">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif font-black text-espresso-dark uppercase tracking-tight">
                  {lang === "vi" ? "Đã đặt hàng thành công!" : "Order Placed Successfully!"}
                </h3>
                <p className="mt-4 text-taupe-gray text-xs md:text-sm font-medium font-sans leading-relaxed">
                  {lang === "vi"
                    ? "CAM CAM đã tiếp nhận đơn hàng giao trà của bạn. Đội ngũ của chúng tôi sẽ gọi điện xác nhận trong ít phút."
                    : "CAM CAM has received your delivery order. Our team will call you shortly to confirm."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-sans relative z-10">
                
                {/* Họ và tên */}
                <div>
                  <input
                    type="text"
                    placeholder={lang === "vi" ? "Họ và tên" : "Full name"}
                    {...register("fullName")}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl border bg-white/70 text-espresso-dark text-xs font-semibold focus:ring-2 focus:outline-none transition-all placeholder:text-espresso-dark/40",
                      errors.fullName
                        ? "border-red-500 focus:ring-red-100"
                        : "border-border-taupe/35 focus:ring-olive-primary/20 focus:border-olive-primary"
                    )}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-[10px] text-red-500 font-semibold">{errors.fullName.message}</p>
                  )}
                </div>

                {/* Số điện thoại */}
                <div>
                  <input
                    type="text"
                    placeholder={lang === "vi" ? "Số điện thoại" : "Phone number"}
                    {...register("phoneNumber")}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl border bg-white/70 text-espresso-dark text-xs font-semibold focus:ring-2 focus:outline-none transition-all placeholder:text-espresso-dark/40",
                      errors.phoneNumber
                        ? "border-red-500 focus:ring-red-100"
                        : "border-border-taupe/35 focus:ring-olive-primary/20 focus:border-olive-primary"
                    )}
                  />
                  {errors.phoneNumber && (
                    <p className="mt-1 text-[10px] text-red-500 font-semibold">{errors.phoneNumber.message}</p>
                  )}
                </div>

                {/* Địa chỉ nhận hàng */}
                <div>
                  <input
                    type="text"
                    placeholder={lang === "vi" ? "Địa chỉ nhận hàng" : "Delivery address"}
                    {...register("deliveryAddress")}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl border bg-white/70 text-espresso-dark text-xs font-semibold focus:ring-2 focus:outline-none transition-all placeholder:text-espresso-dark/40",
                      errors.deliveryAddress
                        ? "border-red-500 focus:ring-red-100"
                        : "border-border-taupe/35 focus:ring-olive-primary/20 focus:border-olive-primary"
                    )}
                  />
                  {errors.deliveryAddress && (
                    <p className="mt-1 text-[10px] text-red-500 font-semibold">{errors.deliveryAddress.message}</p>
                  )}
                </div>

                {/* Chọn quận dropdown */}
                <div>
                  <select
                    {...register("district")}
                    className="w-full px-4 py-3 rounded-xl border border-border-taupe/35 bg-white/70 text-espresso-dark text-xs font-semibold focus:ring-2 focus:ring-olive-primary/20 focus:border-olive-primary focus:outline-none transition-all appearance-none cursor-pointer"
                  >
                    {REGIONS.map((region, idx) => (
                      <option key={idx} value={region.vi}>
                        {lang === "vi" ? `Quận ${region.vi}` : `${region.en} District`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Ghi chú đơn hàng */}
                <div>
                  <textarea
                    rows={3}
                    placeholder={lang === "vi" ? "Ghi chú đơn hàng (Các loại nước muốn gọi, số lượng...)" : "Order notes (Drinks you want to order, quantity...)"}
                    {...register("note")}
                    className="w-full px-4 py-3 rounded-xl border border-border-taupe/35 bg-white/70 text-espresso-dark text-xs font-semibold focus:ring-2 focus:ring-olive-primary/20 focus:border-olive-primary focus:outline-none transition-all placeholder:text-espresso-dark/40 resize-none"
                  />
                </div>

                {/* Thanh toán khi nhận hàng */}
                <div>
                  <select
                    {...register("paymentMethod")}
                    className="w-full px-4 py-3 rounded-xl border border-border-taupe/35 bg-white/70 text-espresso-dark text-xs font-semibold focus:ring-2 focus:ring-olive-primary/20 focus:border-olive-primary focus:outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="cod">
                      {lang === "vi" ? "Thanh toán khi nhận hàng (COD)" : "Cash on Delivery (COD)"}
                    </option>
                    <option value="bank_transfer">
                      {lang === "vi" ? "Chuyển khoản ngân hàng" : "Bank Transfer"}
                    </option>
                  </select>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#FAF7F0] hover:bg-olive-primary border border-border-taupe/35 text-espresso-dark hover:text-paper-warm font-sans font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-vintage-sm hover:shadow-vintage-md disabled:opacity-50"
                  >
                    {isSubmitting
                      ? (lang === "vi" ? "ĐANG GỬI ĐƠN HÀNG..." : "SUBMITTING ORDER...")
                      : (lang === "vi" ? "Gửi đơn hàng ngay" : "Submit Order Now")}
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

export default LeadForm;
