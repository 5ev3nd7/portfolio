"use client"

import type React from "react"

import { memo, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { animate } from "motion/react"

interface AnimatedGlowingEffectProps {
  blur?: number
  inactiveZone?: number
  proximity?: number
  spread?: number
  variant?: "default" | "white"
  glow?: boolean
  className?: string
  disabled?: boolean
  movementDuration?: number
  borderWidth?: number
}
const AnimatedGlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    variant = "default",
    glow = false,
    className,
    movementDuration = 4,
    borderWidth = 2,
    disabled = true,
  }: AnimatedGlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)
    const animationRef = useRef<ReturnType<typeof animate> | null>(null)

    useEffect(() => {
      if (!containerRef.current || disabled) return

      const element = containerRef.current

      if (isHovered) {
        element.style.setProperty("--active", "1")

        const animateBorder = () => {
          animationRef.current = animate(360, 0, {
            duration: movementDuration,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
            onUpdate: (value) => {
              element.style.setProperty("--start", String(value))
            },
          })
        }

        animateBorder()
      } else {
        element.style.setProperty("--active", "0")
        if (animationRef.current) {
          animationRef.current.stop()
          animationRef.current = null
        }
      }

      return () => {
        if (animationRef.current) {
          animationRef.current.stop()
          animationRef.current = null
        }
      }
    }, [isHovered, disabled])

    useEffect(() => {
      if (disabled) return

      const element = containerRef.current?.parentElement
      if (!element) return

      const handleMouseEnter = () => setIsHovered(true)
      const handleMouseLeave = () => setIsHovered(false)

      element.addEventListener("mouseenter", handleMouseEnter)
      element.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        element.removeEventListener("mouseenter", handleMouseEnter)
        element.removeEventListener("mouseleave", handleMouseLeave)
      }
    }, [disabled])

    return (
      <>
        <div
          className={cn(
            "pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity",
            glow && "opacity-100",
            variant === "white" && "border-white",
            disabled && "!block",
          )}
        />
        <div
          ref={containerRef}
          style={
            {
              "--blur": `${blur}px`,
              "--spread": spread,
              "--start": "0",
              "--active": "0",
              "--glowingeffect-border-width": `${borderWidth}px`,
              "--repeating-conic-gradient-times": "5",
              "--gradient":
                variant === "white"
                  ? `repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  #ffffff,
                  #ffffff calc(25% / var(--repeating-conic-gradient-times))
                )`
                  : `radial-gradient(circle, #dd7bbb 10%, #dd7bbb00 20%),
                radial-gradient(circle at 40% 40%, #d79f1e 5%, #d79f1e00 15%),
                radial-gradient(circle at 60% 60%, #5a922c 10%, #5a922c00 20%), 
                radial-gradient(circle at 40% 60%, #4c7894 10%, #4c789400 20%),
                repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  #dd7bbb 0%,
                  #d79f1e calc(25% / var(--repeating-conic-gradient-times)),
                  #5a922c calc(50% / var(--repeating-conic-gradient-times)), 
                  #4c7894 calc(75% / var(--repeating-conic-gradient-times)),
                  #dd7bbb calc(100% / var(--repeating-conic-gradient-times))
                )`,
                //   : `radial-gradient(circle, #ffc875 15%, #ffeaca 25%, #ffc8752c 35%, transparent 50%),
                // radial-gradient(circle at 40% 40%, #a787ff 10%, #a787ff80 20%, transparent 35%),
                // radial-gradient(circle at 60% 60%, #66e3ff 15%, #d2f7ff 25%, transparent 40%), 
                // radial-gradient(circle at 40% 60%, #66e3ff 10%, #d2f7ff 20%, transparent 35%),
                // repeating-conic-gradient(
                //   from 236.84deg at 50% 50%,
                //   #ffc875 0%,
                //   #ffeaca calc(25% / var(--repeating-conic-gradient-times)),
                //   #a787ff calc(50% / var(--repeating-conic-gradient-times)), 
                //   #66e3ff calc(75% / var(--repeating-conic-gradient-times)),
                //   #d2f7ff calc(100% / var(--repeating-conic-gradient-times))
                // )`,
            } as React.CSSProperties
          }
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity",
            glow && "opacity-100",
            blur > 0 && "blur-[var(--blur)] ",
            className,
            disabled && "!hidden",
          )}
        >
          <div
            className={cn(
              "glow",
              "rounded-[inherit]",
              'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
              "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
              "after:[background:var(--gradient)] after:[background-attachment:fixed]",
              "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
              "after:[mask-clip:padding-box,border-box]",
              "after:[mask-composite:intersect]",
              "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*3deg))]",
            )}
          />
        </div>
      </>
    )
  },
)

AnimatedGlowingEffect.displayName = "AnimatedGlowingEffect"

export { AnimatedGlowingEffect }
