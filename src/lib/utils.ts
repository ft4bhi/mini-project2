import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const copyToClipboard = (text: string) => {
  return navigator.clipboard.writeText(text)
}

export function formatCode(code: string) {
  return code.trim()
}
