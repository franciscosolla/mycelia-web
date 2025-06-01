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

export const xLarge: Story = {
  args: {
    name: "eye",
    size: "xl",
  },
};

export const large: Story = {
  args: {
    name: "eye",
    size: "lg",
  },
};

export const medium: Story = {
  args: {
    name: "eye",
    size: "md",
  },
};

export const small: Story = {
  args: {
    name: "eye",
    size: "sm",
  },
};

export const xSmall: Story = {
  args: {
    name: "eye",
    size: "xs",
  },
};
