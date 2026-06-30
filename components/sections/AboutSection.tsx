import Image from "next/image";
import { cn } from "@/lib/utils";

interface HighlightItem {
  title: string;
  text: string;
}

interface AboutSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  highlights: HighlightItem[];
  className?: string;
}
export function AboutSection({
  title,
  subtitle,
  description,
  highlights,
  className,
}: AboutSectionProps) {
  return (
    <section
      id="ve-chung-toi"
      className={cn("py-24 px-4 bg-paper-warm border-t border-border-taupe/30 relative overflow-hidden", className)}
    >
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none">
        <Image
          src="/images/background/1.png"
          alt="Vintage background texture"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Headline & Main Paragraph (Columns 1-4) */}
          <div className="lg:col-span-4 space-y-6 flex flex-col justify-center">
            <span className="text-xs font-bold tracking-widest uppercase text-olive-primary">
              {subtitle || "Về Chúng Tôi"}
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-black text-espresso-dark leading-tight">
              {title}
            </h2>
            <div className="w-16 h-[2px] bg-olive-primary"></div>
            <p className="text-taupe-gray leading-relaxed text-sm md:text-base font-medium">
              {description}
            </p>
          </div>

          {/* Spacer to let the background image shine in the middle (Columns 5-6) */}
          <div className="hidden lg:block lg:col-span-2" />

          {/* Handcrafted highlights (Columns 7-12 - Red Box Area) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4 flex items-center">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="p-5 py-8 bg-latte-light/45 rounded-3xl border border-border-taupe/40 shadow-vintage-sm hover:border-olive-primary/50 transition-vintage hover:shadow-vintage-md group flex flex-col justify-between min-h-[300px]"
              >
                <div>
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                    {index === 0 ? "☕" : index === 1 ? "🍃" : "🏛️"}
                  </div>
                  <h3 className="text-lg font-serif font-bold text-espresso-dark mb-3 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-taupe-gray text-xs leading-relaxed font-medium">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default AboutSection;
