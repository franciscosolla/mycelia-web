import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { iconNames } from "lucide-react/dynamic";
import { Icon } from "./Icon";

const meta = {
  title: "Atoms/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    name: { control: "select", options: iconNames },
    size: { control: "select", options: ["xl", "lg", "md", "sm", "xs"] },
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "eye",
  },
};
