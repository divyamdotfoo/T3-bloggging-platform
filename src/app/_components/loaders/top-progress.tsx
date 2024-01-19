"use client";
import { motion } from "framer-motion";
export function Loading() {
  return (
    <motion.div
      className="absolute left-0 top-0 h-[3px] rounded-xl bg-primary"
      transition={{ duration: 5 }}
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ width: "100%" }}
    ></motion.div>
  );
}
