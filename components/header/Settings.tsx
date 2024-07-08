import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { SettingsIcon } from "lucide-react";

export default function Settings() {
  return (
    <Sheet>
      <SheetTrigger>
        <SettingsIcon size={"2rem"} color="white" />
      </SheetTrigger>
      <SheetContent side={"left"} className="flex flex-col gap-5 bg-navy">
        <span className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black/50 text-2xl font-bold text-white">
          تحت التطوير...
        </span>
        <h2 className="text-4xl font-bold text-white">الوضع</h2>
        <div className="flex flex-col gap-2">
          <Button
            variant="white"
            size="full"
            rounded="pill"
            className="text-xl"
          >
            نهار
          </Button>
          <Button
            variant="black"
            size="full"
            rounded="pill"
            className="text-xl"
          >
            ليل
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
