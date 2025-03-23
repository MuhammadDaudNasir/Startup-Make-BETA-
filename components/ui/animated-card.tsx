"use client"

import { motion } from "framer-motion"
import { Card, type CardProps } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface AnimatedCardProps extends CardProps {
  delay?: number
}

export function AnimatedCard({ children, className, delay = 0, ...props }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className={cn("overflow-hidden", className)} {...props}>
        {children}
      </Card>
    </motion.div>
  )
}

