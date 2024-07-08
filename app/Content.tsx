"use client";

import Glow from "@/components/layout/Glow";
import Header from "@/components/header/Header";
import { useEffect, useRef, useState } from "react";

export default function Content({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);

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

  const paddingTop = isScrolled ? `${headerHeight + 32}px` : "0";

  return (
    <body className="flex min-h-dvh flex-col gap-8 overflow-x-hidden bg-dark-navy font-camel">
      <Glow />
      <Header fixed={isScrolled} ref={headerRef} />
      <div className={`flex flex-1`} style={{ paddingTop: paddingTop }}>
        {children}
      </div>
    </body>
  );
}
