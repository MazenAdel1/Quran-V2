export default function PageNumber({ page }: { page: number }) {
  return (
    <div className={`flex ${page % 2 == 0 ? "justify-end" : "justify-start"}`}>
      <span
        className={`flex ${page % 2 == 0 ? "justify-start rounded-tl-[4rem] rounded-tr-md after:-left-1 after:rounded-l-full" : "justify-end rounded-tl-md rounded-tr-[4rem] after:-right-1 after:rounded-r-full"} relative block w-12 rounded-b-md bg-black px-1 text-base font-extrabold text-white [clip-path:_border-box] after:absolute after:h-full after:w-5 after:bg-white after:opacity-75 after:blur-md dark:bg-white dark:text-black after:dark:bg-black sm:text-xl`}
      >
        {page}
      </span>
    </div>
  );
}
