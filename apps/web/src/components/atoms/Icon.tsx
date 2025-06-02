import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import type { Size } from "./types";

export const Icon = ({
  name,
  size = "md",
  className,
}: {
  name: IconName;
  size?: Size;
  className?: string;
}) => <DynamicIcon name={name} size={SIZES[size]} className={className} />;

const SIZES = {
  xl: 55,
  lg: 42,
  md: 30,
  sm: 24,
  xs: 16,
} as const;
