import { z } from "zod";

export const LeadFormSchema = z.object({
  fullName: z.string().min(2, { message: "Họ và tên phải có ít nhất 2 ký tự" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Số điện thoại phải có ít nhất 10 số" })
    .max(11, { message: "Số điện thoại không được quá 11 số" })
    .regex(/^(0|\+84)[3|5|7|8|9][0-9]{8}$/, { message: "Số điện thoại Việt Nam không hợp lệ" }),
  deliveryAddress: z.string().min(5, { message: "Vui lòng nhập địa chỉ nhận hàng chi tiết" }),
  district: z.string().min(1, { message: "Vui lòng chọn quận nhận hàng" }),
  paymentMethod: z.string().default("cod"),
  note: z.string().max(300, { message: "Ghi chú không quá 300 ký tự" }).optional(),
});

export type LeadFormType = z.infer<typeof LeadFormSchema>;
