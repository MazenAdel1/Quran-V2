import { useAppDispatch } from "@/lib/redux/hooks";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { SettingsIcon } from "lucide-react";
import { setTheme } from "@/lib/redux/theme/themeSlice";

export default function Settings() {
  const dispatch = useAppDispatch();

  return (
    <Sheet>
      <SheetTrigger>
        <SettingsIcon size={"2rem"} className="text-black dark:text-white" />
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="bg-light-orange dark:bg-navy flex flex-col gap-5"
      >
        <h2 className="text-4xl font-bold text-black dark:text-white">الوضع</h2>
        <div className="flex flex-col gap-2">
          <Button
            variant="white"
            size="full"
            rounded="pill"
            className="text-xl"
            onClick={() => {
              localStorage && localStorage.removeItem("theme");
              dispatch(setTheme("light"));
            }}
          >
            نهار
          </Button>
          <Button
            variant="black"
            size="full"
            rounded="pill"
            className="text-xl"
            onClick={() => {
              localStorage && localStorage.setItem("theme", "dark");
              dispatch(setTheme("dark"));
            }}
          >
            ليل
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
