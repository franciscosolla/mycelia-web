import { DynamicIcon, type IconName } from "lucide-react/dynamic";

export const Icon = ({
  name,
  size = "md",
}: {
  name: IconName;
  size?: "xl" | "lg" | "md" | "sm" | "xs";
}) => <DynamicIcon name={name} size={SIZES[size]} />;

const SIZES = {
  xl: 55,
  lg: 42,
  md: 30,
  sm: 24,
  xs: 16,
} as const;
