import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Image } from "./Image";

const meta = {
  title: "Atoms/Image",
  component: Image,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    src: { control: "text" },
    alt: { control: "text" },
    size: { control: "select", options: ["xl", "lg", "md", "sm", "xs"] },
  },
} satisfies Meta<typeof Image>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "https://www.solla.dev/_next/image?url=%2Ffavicon.webp&w=640&q=75",
    alt: "Profile image",
  },
};
