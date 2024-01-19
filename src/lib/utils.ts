import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mergeBetween<T>(arr: T[], el: T, pos: number) {
  return [...arr.slice(0, pos), el, ...arr.slice(pos + 1)];
}

export function capitalize(text: string) {
  return text
    .split(" ")
    .map((t) => t[0]?.toUpperCase() + t.slice(1))
    .join(" ");
}

export function randomize<T>(arr: T[]) {
  return arr.sort(() => Math.random() - 0.5);
}

export const getShortDate = (val: string | number | Date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(val));
};
