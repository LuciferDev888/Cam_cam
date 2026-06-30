export interface LeadFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  drinkPreference?: string; // Optional: custom fields for drink LP
  note?: string;
}

export interface LeadFormProps {
  campaignName: string;
  className?: string;
}
