import { Slot } from "@/components/custom/Slot";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import dayjs from "dayjs";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Slot",
  component: Slot,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    slotType: {
      control: {
        type: "select",
        options: ["available", "reserved", "owned", "disabled", "past"],
      },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Slot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Available: Story = {
  args: {
    slotType: "available",
    day: dayjs().add(1, "day").format("YYYY-MM-DD"),
    hour: "12:00",
  },
};

export const Reserved: Story = {
  args: {
    slotType: "reserved",
    day: dayjs().add(1, "day").format("YYYY-MM-DD"),
    hour: "12:00",
  },
};

export const Owned: Story = {
  args: {
    slotType: "owned",
    day: dayjs().add(1, "day").format("YYYY-MM-DD"),
    hour: "12:00",
  },
};

export const Unavailable: Story = {
  args: {
    slotType: "unavailable",
    day: dayjs().add(1, "day").format("YYYY-MM-DD"),
    hour: "12:00",
  },
};

export const Past: Story = {
  args: {
    slotType: "past",
    day: dayjs().subtract(1, "day").format("YYYY-MM-DD"),
    hour: "12:00",
  },
};
