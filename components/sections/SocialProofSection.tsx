import Image from "next/image";
import { cn } from "@/lib/utils";
import { SocialProofSectionProps } from "@/types/landing";
import { Star } from "lucide-react";

export function SocialProofSection({
  title,
  subtitle,
  testimonials,
  className,
}: SocialProofSectionProps) {
  return (
    <section
      id="danh-gia"
      className={cn("py-24 px-4 bg-beige-vintage border-t border-border-taupe/30 relative overflow-hidden", className)}
    >
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/background/5.png"
          alt="Vintage texture overlay"
          fill
          className="object-cover opacity-10"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-widest uppercase text-olive-primary">
            Cảm nhận khách hàng
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-espresso-dark tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base text-taupe-gray max-w-xl mx-auto font-medium">
              {subtitle}
            </p>
          )}
          <div className="w-12 h-[2px] bg-olive-primary mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="p-8 bg-paper-warm/90 backdrop-blur-sm rounded-2xl border border-border-taupe/50 shadow-vintage-sm hover:shadow-vintage-md transition-vintage flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-5 text-olive-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-espresso-dark/95 italic leading-relaxed text-sm md:text-base font-medium">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4 border-t border-border-taupe/20 pt-4">
                {item.avatarUrl ? (
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border border-border-taupe/40 bg-latte-light/35">
                    <Image
                      src={item.avatarUrl}
                      alt={item.author}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-11 h-11 rounded-full border border-border-taupe/40 bg-latte-light/35 flex items-center justify-center font-bold text-espresso-dark">
                    {item.author.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-espresso-dark text-sm">{item.author}</h4>
                  {item.role && (
                    <span className="text-[11px] text-taupe-gray font-semibold uppercase tracking-wider">{item.role}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SocialProofSection;
