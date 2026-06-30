import { useState } from "react";
import { LeadFormData } from "@/types/form";
import { trackFormSubmit } from "@/lib/analytics";

export function useFormSubmit(campaignName: string) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitForm = async (data: LeadFormData) => {
    setIsSubmitting(true);
    setIsSuccess(false);
    setError(null);

    try {
      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          campaignName,
          data,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Gửi thông tin thất bại.");
      }

      setIsSuccess(true);
      trackFormSubmit(campaignName, true);
      return true;
    } catch (err: any) {
      const errMsg = err?.message || "Đã xảy ra lỗi kết nối mạng.";
      setError(errMsg);
      trackFormSubmit(campaignName, false);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitForm, isSubmitting, isSuccess, error };
}
