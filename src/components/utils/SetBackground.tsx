"use client"
import { useEffect } from "react";
import { colorModifier } from "@/hooks/colorModifier";

interface Props {
  color: string,
  image: string,
}

export default function SetBackground({color,image}: Props) {
  useEffect(() => {
    document.documentElement.style.setProperty("--color-musico-1", color)
    document.documentElement.style.setProperty("--color-musico-2", colorModifier(color, -130))
    document.documentElement.style.setProperty("--bg-image", `url(${image})`)
  }, []);
  return null;
}