import type { Meta, StoryObj } from "@storybook/react";
import BasicRender from "../components/BasicRender";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export const meta = {
  title: "Example/Formily",
  component: BasicRender,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    // layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    schema: { control: "object" },
  },
} satisfies Meta<typeof BasicRender>;

export type Story = StoryObj<typeof meta>;
