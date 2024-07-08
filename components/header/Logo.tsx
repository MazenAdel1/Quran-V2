import Image from "next/image";
import logo from "@/public/logo.svg";

export default function Logo() {
  return <Image src={logo} alt="Quran Logo" className="w-28 sm:w-32" />;
}
