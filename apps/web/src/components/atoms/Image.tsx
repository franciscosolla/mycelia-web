import NextImage from "next/image";
import type { IconSize } from "./types";

export const Image = ({
  src,
  alt,
  size = "md",
}: {
  src: string;
  alt: string;
  size?: IconSize;
}) => (
  <NextImage src={src} alt={alt} width={SIZES[size]} height={SIZES[size]} />
);

const SIZES = {
  xl: 94,
  lg: 42,
  md: 30,
  sm: 24,
  xs: 16,
};
