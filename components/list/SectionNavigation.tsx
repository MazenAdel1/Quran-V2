"use client";

import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "../ui/select";

export default function SectionNavigation() {
  const SECTIONS = [
    { title: "قراءة", available: true },
    { title: "استماع", available: false },
    { title: "تعلم", available: false },
  ];
  return (
    <>
      <nav className="flex justify-end lg:absolute lg:-right-[20%] lg:h-full">
        <ul className="hidden flex-col gap-3 lg:sticky lg:top-[100px] lg:flex">
          {SECTIONS.map((section) => (
            <li key={section.title}>
              <Link
                href={"/"}
                className={cn(
                  buttonVariants({
                    variant: "orange",
                    effect: "solid-shadow-white",
                    rounded: "md",
                    padding: "md",
                    size: "full",
                    className: `relative block text-center text-2xl font-bold ${!section.available ? "pointer-events-none text-white before:absolute before:left-0 before:top-0 before:flex before:h-full before:w-full before:items-center before:justify-center before:bg-black/40 before:text-base before:content-['تحت_التطوير...']" : ""}`,
                  }),
                )}
              >
                {section.title}
              </Link>
            </li>
          ))}
        </ul>
        <Select>
          <SelectTrigger className="w-36 bg-light-navy text-white lg:hidden">
            <SelectValue placeholder="الأقسام" />
          </SelectTrigger>
          <SelectContent className="flex flex-col items-center justify-center bg-light-navy">
            {SECTIONS.map((section) => (
              <Link
                href={"/"}
                key={section.title}
                className={`relative block size-full flex-1 py-1 text-center text-xl text-white transition hover:bg-navy  ${!section.available ? "before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-black/40" : ""}`}
              >
                {section.title}
              </Link>
            ))}
          </SelectContent>
        </Select>
      </nav>
    </>
  );
}
