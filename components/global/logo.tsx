import Image from "next/image";
import Link from "next/link";

import { Button } from "../ui/button";

interface LogoProps {
  ctx?: string;
}

const Logo = ({ ctx }: LogoProps) => (
  <div className="flex items-center mr-2 z-50">
    <div tabIndex={0} className=" btn-">
      <Link
        href={ctx === "home" ? "/" : "#"}
        className="p-2 flex items-center space-x-2"
        title="Uni-Connect"
      >
        <Image
          src="/assets/logo.png"
          width={150}
          height={150}
          quality={100}
          alt="Uniconnect Logo"
          priority
          className="w-14 rounded-full"
        />
        <Button variant={"outline"} className="font-semi-bold text-lg">
          Uniconnect
        </Button>
      </Link>
    </div>
  </div>
);

export default Logo;
