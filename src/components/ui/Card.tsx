import type { ReactNode, ImgHTMLAttributes } from "react";
import { formatBRL } from "@/lib/format";

/* ── Container ── */
interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`
        Card bg-[var(--surface)] rounded-xl border border-[var(--border)]
        overflow-hidden
        ${hover ? "group transition-shadow duration-[var(--duration-normal)] hover:shadow-lg" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

/* ── Image ── */
interface CardImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  badge?: ReactNode;
  aspectRatio?: "square" | "video" | "auto";
}

function CardImage({
  badge,
  aspectRatio = "square",
  className = "",
  alt = "",
  ...props
}: CardImageProps) {
  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    auto: "",
  };

  return (
    <div
      className={`Card-Imagem relative overflow-hidden bg-[var(--background)] ${aspectClasses[aspectRatio]}`}
    >
      {badge && (
        <div className="absolute top-3 left-3 z-10">{badge}</div>
      )}
      <img
        className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-[var(--duration-slow)] ${className}`}
        alt={alt}
        {...props}
      />
    </div>
  );
}

/* ── Body ── */
interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

function CardBody({ children, className = "" }: CardBodyProps) {
  return <div className={`Card-Corpo p-4 ${className}`}>{children}</div>;
}

/* ── Footer ── */
interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

function CardFooter({ children, className = "" }: CardFooterProps) {
  return (
    <div className={`Card-Rodapé px-4 pb-4 ${className}`}>{children}</div>
  );
}

/* ── Price ── */
interface CardPriceProps {
  from?: number;
  to: number;
  unit?: string;
}

function CardPrice({ from, to, unit }: CardPriceProps) {

  return (
    <div className="Card-Preço flex flex-col">
      {from && (
        <span className="text-xs text-[var(--muted)] line-through">
          De: {formatBRL(from)}
        </span>
      )}
      <span className="text-2xl font-black text-[var(--color-primary)] leading-none">
        {formatBRL(to)}{" "}
        {unit && (
          <span className="text-sm font-normal text-[var(--muted)]">
            {unit}
          </span>
        )}
      </span>
    </div>
  );
}

/* ── Exports com Compound Component Pattern ── */
Card.Image = CardImage;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Price = CardPrice;

export { Card, CardImage, CardBody, CardFooter, CardPrice };
