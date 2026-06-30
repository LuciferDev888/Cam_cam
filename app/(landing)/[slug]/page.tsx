import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { MenuSection } from "@/components/sections/MenuSection";
import { StorySection } from "@/components/sections/StorySection";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { CTAFooterSection } from "@/components/sections/CTAFooterSection";
import { MapSection } from "@/components/sections/MapSection";
import { LeadForm } from "@/components/forms/LeadForm";
import { getLandingPageContent } from "@/lib/content";

interface PageProps {
  params: {
    slug: string;
  };
}

// SEO Metadata BẮT BUỘC
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const content = await getLandingPageContent(params.slug);

  if (!content) return {};

  return {
    title: content.seoTitle,
    description: content.seoDescription,
    openGraph: {
      title: content.seoTitle,
      description: content.seoDescription,
      images: [{ url: `/og/${params.slug}.png` }],
    },
  };
}

// Page Component
export default async function LandingPage({ params }: PageProps) {
  const content = await getLandingPageContent(params.slug);

  if (!content) notFound();

  return (
    <main className="min-h-screen bg-paper-warm text-espresso-dark">
      {/* 1. Hero banner */}
      <HeroSection {...content.hero} />

      {/* 2. Giới thiệu ngắn về CAM CAM */}
      <AboutSection {...content.about} />

      {/* 3. Sản phẩm nổi bật (5 best seller items) */}
      <FeaturedProducts {...content.featured} />

      {/* 4. Menu / nhóm đồ uống tiêu biểu */}
      <MenuSection />

      {/* 5. Không gian và câu chuyện thương hiệu */}
      <StorySection {...content.story} />

      {/* 6. Lý do nên chọn CAM CAM */}
      <BenefitsSection {...content.benefits} />

      {/* Map & Contact Info Section */}
      <MapSection />

      {/* 7. Địa chỉ / liên hệ / CTA cuối trang */}
      <section id="lien-he" className="relative py-24 px-4 bg-beige-vintage border-t border-border-taupe/30 overflow-hidden">
        {/* Background Space Texture */}
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
          <Image
            src="/images/background/3.png"
            alt="Contact background texture"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-paper-warm/85 z-5" />
        
        <div className="max-w-xl mx-auto relative z-10">
          <div className="text-center mb-10">
            <span className="text-xs font-bold tracking-widest uppercase text-olive-primary">
              Liên hệ với chúng tôi
            </span>
            <h2 className="text-3xl font-serif font-black text-espresso-dark tracking-tight mt-2">
              Kết Nối Cùng CAM CAM
            </h2>
            <p className="mt-3 text-taupe-gray text-sm font-medium">
              Đặt bàn trước để có chỗ ngồi ưng ý hoặc đăng ký nhận ưu đãi cho các gói dịch vụ nước uống.
            </p>
          </div>
          <LeadForm campaignName={content.campaignName} />
        </div>
      </section>

      {/* CTA Footer Section */}
      <CTAFooterSection {...content.cta} />
    </main>
  );
}
