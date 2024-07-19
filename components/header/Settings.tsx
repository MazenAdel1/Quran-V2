import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { SettingsIcon } from "lucide-react";

export default function Settings() {
  // TODO make light and dark mode
  return (
    <Sheet>
      <SheetTrigger>
        <SettingsIcon size={"2rem"} className="text-black dark:text-white" />
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="flex flex-col gap-5 bg-light-orange dark:bg-navy"
      >
        <h2 className="text-4xl font-bold text-black dark:text-white">الوضع</h2>
        <div className="flex flex-col gap-2">
          <Button
            variant="white"
            size="full"
            rounded="pill"
            className="text-xl"
            onClick={() => {
              document.documentElement.classList.remove(
                "dark",
                "scrollbar-track-light-navy",
                "scrollbar-thumb-white",
              );
              document.documentElement.classList.add(
                "scrollbar-track-light-white",
                "scrollbar-thumb-black",
              );
              localStorage && localStorage.removeItem("theme");
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
              document.documentElement.classList.add(
                "dark",
                "scrollbar-track-light-navy",
                "scrollbar-thumb-white",
              );
              document.documentElement.classList.remove(
                "scrollbar-track-light-white",
                "scrollbar-thumb-black",
              );
              localStorage && localStorage.setItem("theme", "dark");
            }}
          >
            ليل
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
