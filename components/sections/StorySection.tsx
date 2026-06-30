import Image from "next/image";
import { cn } from "@/lib/utils";

interface StorySectionProps {
  title: string;
  subtitle?: string;
  content: string;
  bgImage: string;
  className?: string;
}

export function StorySection({
  title,
  subtitle,
  content,
  bgImage,
  className,
}: StorySectionProps) {
  return (
    <section
      id="cau-chuyen"
      className={cn(
        "relative py-24 px-4 bg-beige-vintage border-t border-border-taupe/30 overflow-hidden",
        className
      )}
    >
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none">
        <Image
          src="/images/background/3.png"
          alt="Vintage background texture"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Large Space Photo */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-vintage-lg border-[6px] border-paper-warm">
              <Image
                src={bgImage}
                alt="CAM CAM Cozy Space"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Story Card */}
          <div className="lg:col-span-6 p-8 md:p-10 bg-paper-warm rounded-3xl border border-border-taupe/40 shadow-vintage-md space-y-6">
            <span className="text-xs font-bold tracking-widest uppercase text-olive-primary">
              {subtitle || "Câu Chuyện Thương Hiệu"}
            </span>
            <h2 className="text-2xl md:text-4xl font-serif font-black text-espresso-dark leading-tight">
              {title}
            </h2>
            <div className="w-16 h-[2px] bg-olive-primary"></div>
            <p className="text-taupe-gray leading-relaxed text-sm md:text-base font-medium">
              {content}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default StorySection;
