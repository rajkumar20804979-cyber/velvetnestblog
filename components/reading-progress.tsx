"use client"

import { motion, useScroll, useSpring } from "framer-motion"

export function ReadingProgress() {
  const { scrollYProgress } = useScroll()

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 right-0 z-[60] h-[2.5px] origin-left bg-accent"
      style={{ scaleX }}
    />
  )
}
