import { Activity } from "@/app/_components/profile";
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

export const getMonthYear = (val: string | number | Date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  })
    .format(new Date(val))
    .split(" ")
    .join(", ");
};

export function sortActivities(posts: Activity[], comments: Activity[]) {
  return [...posts, ...comments].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
