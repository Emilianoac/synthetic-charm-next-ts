"use client"
import { motion } from "framer-motion"
import NextTopLoader from "nextjs-toploader";


const variants = {
  hidden: { opacity: 0, x: -400, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
}

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
    <NextTopLoader />
    <motion.main
      variants={variants}
      initial="hidden"
      animate="enter"
      transition={{  ease: "easeInOut", duration: 0.7 }}
    >
      {children}
    </motion.main>

    </>
  )
}