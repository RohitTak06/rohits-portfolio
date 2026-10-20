"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useReducedMotion,
  type SpringOptions,
} from "framer-motion";
import { cn } from "../../lib/utils";

const SPRING: SpringOptions = { stiffness: 260, damping: 14, mass: 0.9 };

export interface ElasticTextProps
  extends Omit<React.ComponentProps<"span">, "children"> {
  children: string;
  strength?: number;
  radius?: number;
  color?: string;
  static?: boolean;
}

interface LetterProps {
  ch: string;
  pointerX: ReturnType<typeof useMotionValue<number>>;
  pointerY: ReturnType<typeof useMotionValue<number>>;
  active: ReturnType<typeof useMotionValue<number>>;
  strength: number;
  radius: number;
  color?: string;
}

function ElasticLetter({
  ch,
  pointerX,
  pointerY,
  active,
  strength,
  radius,
  color,
}: LetterProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const dx = useMotionValue(0);
  const dy = useMotionValue(0);
  const scaleValue = useMotionValue(1);
  const x = useSpring(dx, SPRING);
  const y = useSpring(dy, SPRING);
  const scale = useSpring(scaleValue, SPRING);
  const tint = useMotionValue(0);
  const tintSpring = useSpring(tint, { stiffness: 200, damping: 26 });
  const colorMix = useMotionTemplate`color-mix(in oklab, ${
    color ?? "currentColor"
  } calc(${tintSpring} * 100%), currentColor)`;

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const compute = () => {
      if (active.get() < 0.5) {
        dx.set(0);
        dy.set(0);
        scaleValue.set(1);
        tint.set(0);
        return;
      }

      const rect = element.getBoundingClientRect();
      const vx = rect.left + rect.width / 2 - pointerX.get();
      const vy = rect.top + rect.height / 2 - pointerY.get();
      const distance = Math.hypot(vx, vy) || 0.0001;
      const falloff = Math.max(0, 1 - distance / radius);
      const smooth = falloff * falloff * (3 - 2 * falloff);

      dx.set((vx / distance) * strength * smooth);
      dy.set((vy / distance) * strength * smooth);
      scaleValue.set(1 + 0.35 * smooth);
      tint.set(smooth);
    };

    const subscriptions = [
      pointerX.on("change", compute),
      pointerY.on("change", compute),
      active.on("change", compute),
    ];

    return () => subscriptions.forEach((unsubscribe) => unsubscribe());
  }, [pointerX, pointerY, active, dx, dy, scaleValue, tint, strength, radius]);

  return (
    <motion.span
      ref={ref}
      className="inline-block"
      style={{
        x,
        y,
        scale,
        color: color ? colorMix : undefined,
        willChange: "transform",
      }}
    >
      {ch}
    </motion.span>
  );
}

export function ElasticText({
  children,
  strength = 26,
  radius = 110,
  color,
  static: isStatic = false,
  className,
  ...props
}: ElasticTextProps) {
  const hostRef = React.useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion() ?? false;
  const [finePointer, setFinePointer] = React.useState(false);

  const pointerX = useMotionValue(-9999);
  const pointerY = useMotionValue(-9999);
  const active = useMotionValue(0);
  const segments = React.useMemo(() => children.split(/(\s+)/), [children]);

  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const syncPointerCapability = () => setFinePointer(mediaQuery.matches);

    syncPointerCapability();
    mediaQuery.addEventListener("change", syncPointerCapability);
    return () => mediaQuery.removeEventListener("change", syncPointerCapability);
  }, []);

  React.useEffect(() => {
    const host = hostRef.current;
    if (!host || isStatic || reducedMotion || !finePointer) return;

    const onMove = (event: PointerEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      active.set(1);
    };
    const onLeave = () => active.set(0);

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [isStatic, reducedMotion, finePointer, pointerX, pointerY, active]);

  if (isStatic || reducedMotion || !finePointer) {
    return (
      <span
        ref={hostRef}
        data-slot="elastic-text"
        className={cn("inline-block", className)}
        {...props}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      ref={hostRef}
      data-slot="elastic-text"
      className={cn("inline-block", className)}
      {...props}
    >
      <span className="sr-only">{children}</span>
      <span aria-hidden="true">
        {segments.map((segment, segmentIndex) =>
          segment === "" ? null : /^\s+$/.test(segment) ? (
            <React.Fragment key={`space-${segmentIndex}`}>{segment}</React.Fragment>
          ) : (
            <span
              key={`word-${segmentIndex}`}
              className="inline-block whitespace-nowrap"
            >
              {Array.from(segment).map((character, index) => (
                <ElasticLetter
                  key={index}
                  ch={character}
                  pointerX={pointerX}
                  pointerY={pointerY}
                  active={active}
                  strength={strength}
                  radius={radius}
                  color={color}
                />
              ))}
            </span>
          ),
        )}
      </span>
    </span>
  );
}

export default ElasticText;
