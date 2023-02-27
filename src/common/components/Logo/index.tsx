import { FC } from "react";
import Image from "next/image";

export interface LogoProps {
  width?: number;
  height?: number;
}

const Logo: FC<LogoProps> = ({ width = 95.81, height = 22.42 }) => (
  <Image src='/svg/druffle_logo_text_only.svg' alt='Druffle logo' width={width} height={height} />
);

export default Logo;
