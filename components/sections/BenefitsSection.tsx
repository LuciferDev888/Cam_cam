import Image from "next/image";
import { cn } from "@/lib/utils";
import { BenefitsSectionProps } from "@/types/landing";
import * as LucideIcons from "lucide-react";

export function BenefitsSection({
  title,
  subtitle,
  items,
  className,
}: BenefitsSectionProps) {
  return (
    <section
      id="gia-tri"
      className={cn(
        "relative py-24 px-4 bg-paper-warm border-t border-border-taupe/30 overflow-hidden",
        className
      )}
    >
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/background/4.png"
          alt="Vintage background texture"
          fill
          className="object-cover opacity-10"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-widest uppercase text-olive-primary">
            Lý do chọn CAM CAM
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item) => {
            const iconName = item.iconName ? (item.iconName as keyof typeof LucideIcons) : null;
            const IconComponent = iconName && LucideIcons[iconName]
              ? (LucideIcons[iconName] as LucideIcons.LucideIcon)
              : LucideIcons.HelpCircle;

            return (
              <div
                key={item.id}
                className="p-6 bg-latte-light/30 backdrop-blur-sm rounded-2xl border border-border-taupe/40 shadow-vintage-sm hover:border-olive-primary/50 transition-vintage hover:shadow-vintage-md group"
              >
                <div className="w-12 h-12 rounded-xl bg-olive-primary/10 text-olive-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-bold text-espresso-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-taupe-gray text-sm leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default BenefitsSection;
