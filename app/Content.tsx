"use client";

import Glow from "@/components/layout/Glow";
import Header from "@/components/header/Header";
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setTheme } from "@/lib/redux/theme/themeSlice";

function SearchParamsWrapper({ children }: { children: React.ReactNode }) {
  useSearchParams();
  return <>{children}</>;
}

export default function Content({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const htmlRef = useRef<HTMLHtmlElement>(null);

  const theme = useAppSelector((state) => state.theme.value);
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    theme === "light" && htmlRef.current?.classList.remove("dark");
    theme === "dark" && htmlRef.current?.classList.add("dark");
  }, [theme]);

  useLayoutEffect(() => {
    localStorage && localStorage.getItem("theme")
      ? (htmlRef.current?.classList.add("dark"), dispatch(setTheme("dark")))
      : (htmlRef.current?.classList.remove("dark"),
        dispatch(setTheme("light")));
  }, [dispatch]);

  return (
    <html
      lang="en"
      dir="rtl"
      className={`scrollbar **:scrollbar ${theme == "dark" ? "scrollbar-track-light-navy scrollbar-thumb-white" : "scrollbar-track-light-white scrollbar-thumb-black"}`}
      ref={htmlRef}
    >
      <body className="bg-light-white font-camel dark:bg-dark-navy relative flex min-h-dvh flex-col gap-8 overflow-x-hidden">
        <Glow />
        <div
          style={
            isScrolled
              ? { height: headerHeight }
              : { height: 0, display: "none" }
          }
        />
        <Header fixed={isScrolled} ref={headerRef} />
        <div className={`flex flex-1`}>
          <Suspense
            fallback={
              <h1 className="text-3xl dark:text-white">تحميل البيانات...</h1>
            }
          >
            <SearchParamsWrapper>{children}</SearchParamsWrapper>
          </Suspense>
        </div>
      </body>
    </html>
  );
}
