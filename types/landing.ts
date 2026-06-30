export interface HeroSectionProps {
  headline: string;
  subheadline?: string;
  ctaText: string;
  ctaHref: string;
  className?: string;
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  iconName?: string;
}

export interface BenefitsSectionProps {
  title: string;
  subtitle?: string;
  items: BenefitItem[];
  className?: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role?: string;
  avatarUrl?: string;
}

export interface SocialProofSectionProps {
  title: string;
  subtitle?: string;
  testimonials: TestimonialItem[];
  className?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
  className?: string;
}

export interface CTAFooterSectionProps {
  title: string;
  subtitle?: string;
  ctaText: string;
  ctaHref: string;
  className?: string;
}

export interface AboutSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  highlights: { title: string; text: string }[];
  className?: string;
}

export interface FeaturedItem {
  id: string;
  name: string;
  price: string;
  description: string;
  imageUrl: string;
  badge?: string;
}

export interface FeaturedProductsProps {
  title: string;
  subtitle?: string;
  items: FeaturedItem[];
  className?: string;
}

export interface MenuItem {
  name: string;
  price: string;
  desc: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface MenuSectionProps {
  title: string;
  subtitle?: string;
  categories: MenuCategory[];
  className?: string;
}

export interface StorySectionProps {
  title: string;
  subtitle?: string;
  content: string;
  bgImage: string;
  className?: string;
}

export interface LandingPageData {
  seoTitle: string;
  seoDescription: string;
  campaignName: string;
  hero: HeroSectionProps;
  about: AboutSectionProps;
  featured: FeaturedProductsProps;
  menu: MenuSectionProps;
  story: StorySectionProps;
  benefits: BenefitsSectionProps;
  socialProof: SocialProofSectionProps;
  faq: FAQItem[];
  cta: CTAFooterSectionProps;
}
