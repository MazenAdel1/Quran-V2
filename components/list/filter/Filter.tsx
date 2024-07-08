import { Button } from "../../ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { changeFilter } from "@/lib/redux/filter/filterSlice";

export default function Filter({ fullWidth }: { fullWidth: boolean }) {
  const filter = useAppSelector((state) => state.filter.value);
  const dispatch = useAppDispatch();
  return (
    <div
      className={`flex ${fullWidth ? "w-full" : "w-full sm:w-auto"} h-10 items-center gap-1`}
    >
      {filter.map(({ title, active }) => (
        <Button
          key={title}
          variant="orange"
          size="full"
          rounded="pill"
          onClick={() =>
            dispatch(
              changeFilter(
                filter.map((item) => ({
                  ...item,
                  active: item.title === title,
                })),
              ),
            )
          }
          className={`${fullWidth ? "min-w-12" : "min-w-20"} ${active ? "bg-dark-orange" : ""}`}
        >
          {title}
        </Button>
      ))}
    </div>
  );
}
