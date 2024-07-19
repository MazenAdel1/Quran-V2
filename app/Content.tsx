"use client";

import Glow from "@/components/layout/Glow";
import Header from "@/components/header/Header";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
// import { verses } from "@/data/ayahs";

export default function Content({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const htmlRef = useRef<HTMLHtmlElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset >= headerHeight + 100);
    };

    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    updateHeaderHeight();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateHeaderHeight);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, [headerHeight]);

  useLayoutEffect(() => {
    localStorage && localStorage.getItem("theme")
      ? (htmlRef.current?.classList.add(
          "dark",
          "scrollbar-track-light-navy",
          "scrollbar-thumb-white",
        ),
        htmlRef.current?.classList.remove(
          "scrollbar-track-light-white",
          "scrollbar-thumb-black",
        ))
      : (htmlRef.current?.classList.remove(
          "dark",
          "scrollbar-track-light-navy",
          "scrollbar-thumb-white",
        ),
        htmlRef.current?.classList.add(
          "scrollbar-track-light-white",
          "scrollbar-thumb-black",
        ));
  }, []);

  const paddingTop = isScrolled ? `${headerHeight + 32}px` : "0";

  return (
    <html lang="en" dir="rtl" className="dark scrollbar" ref={htmlRef}>
      <body className="relative flex min-h-dvh flex-col gap-8 overflow-x-hidden bg-light-white font-camel dark:bg-dark-navy">
        <Glow />
        <Header fixed={isScrolled} ref={headerRef} />
        <div className={`flex flex-1`} style={{ paddingTop: paddingTop }}>
          {children}
        </div>
      </body>
    </html>
  );
}
