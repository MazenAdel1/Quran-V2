import Link from "next/link";
import Logo from "./Logo";
import Settings from "./Settings";
import { useParams } from "next/navigation";
import List from "../list/List";
import { BookOpen } from "lucide-react";
import React, { forwardRef } from "react";

const Header = forwardRef<HTMLDivElement, { fixed: boolean }>(
  ({ fixed }, ref) => {
    const params = Object.keys(useParams())[0];
    return (
      <header
        className={`z-50 flex w-full items-center justify-between p-2 transition-all sm:p-5 ${fixed ? "fixed top-0 backdrop-blur" : "-top-full"}`}
        ref={ref}
      >
        <Link href={"/"}>
          <Logo />
        </Link>
        <div className="flex items-center gap-6 sm:gap-10">
          {params == "page" && (
            <List
              sheet
              surahButtonProps={{ idExist: false, versesCountExist: false }}
              sheetTriggerIcon={
                <BookOpen
                  className="text-black dark:text-white"
                  size={"2rem"}
                />
              }
              filterAndSearchLayout="col"
            />
          )}
          <Settings />
        </div>
      </header>
    );
  },
);
Header.displayName = "Header";

export default Header;
