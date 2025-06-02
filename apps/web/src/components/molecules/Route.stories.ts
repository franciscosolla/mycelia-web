import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { IconName } from "lucide-react/dynamic";
import { Route } from "./Route";

const meta = {
  title: "Molecules/Route",
  component: Route,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    icon: { control: "select", options: ["home", "settings", "user"] },
  },
} satisfies Meta<typeof Route>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: "key-round" as IconName,
    label: "Import",
    href: "/account/add/import",
    description: "Import an existing account",
  },
};

export const Round: Story = {
  args: {
    icon: "scan-qr-code" as IconName,
    label: "Connect",
    href: "/account/connect",
    round: true,
  },
};
