export interface LeadFormData {
  fullName: string;
  phoneNumber: string;
  email?: string;
  deliveryAddress?: string;
  district?: string;
  paymentMethod?: string;
  drinkPreference?: string;
  note?: string;
}

export interface LeadFormProps {
  campaignName: string;
  className?: string;
}
