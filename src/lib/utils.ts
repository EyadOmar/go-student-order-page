import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function isPhoneValid(phone: string): boolean {
  try {
    if (!phone || typeof phone !== "string") {
      return false;
    }

    // Remove all whitespace characters from the string
    const cleanedPhone = phone.replace(/\s/g, "");

    // Regex to match a pattern of digits, parentheses, hyphens, and an optional leading plus sign
    const regex = /^\+?[0-9()\s-]+$/;

    return regex.test(cleanedPhone);
  } catch (error) {
    console.error("Error validating phone number:", error);
    return false;
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
