export default function PageNumber({ page }: { page: number }) {
  return (
    <div className="flex h-full flex-col justify-end">
      <span
        className={`${page % 2 == 0 ? "self-end rounded-tl-[4rem] rounded-tr-md after:-left-1 after:rounded-l-full" : "rounded-tl-md rounded-tr-[4rem] after:-right-1 after:rounded-r-full"} relative block w-fit rounded-b-md bg-white px-8 py-1 text-center text-lg font-extrabold text-black [clip-path:_border-box] after:absolute after:h-full after:w-5 after:bg-black after:opacity-75 after:blur-md sm:px-14 sm:text-2xl`}
      >
        {page}
      </span>
    </div>
  );
}
