import { Link } from "react-router-dom";
import type { MouseEvent, ReactNode } from "react";
import { useRef } from "react";
import { useMotion } from "../../context/MotionContext";

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  to?: string;
  onClick?: () => void;
  variant?: "solid" | "ghost";
  type?: "button" | "submit";
  className?: string;
};

export function MagneticButton({
  children,
  href,
  to,
  onClick,
  variant = "solid",
  type = "button",
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const { reduceMotion } = useMotion();

  const onMove = (event: MouseEvent) => {
    if (reduceMotion) return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    node.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`;
  };

  const onLeave = () => {
    const node = ref.current;
    if (!node) return;
    node.style.transform = "translate(0, 0)";
  };

  const classes = `btn btn-${variant} ${className}`.trim();

  if (to) {
    return (
      <Link
        to={to}
        className={classes}
        onClick={onClick}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        ref={ref as never}
      >
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        ref={ref as never}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      ref={ref as never}
    >
      {children}
    </button>
  );
}
