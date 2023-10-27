import type { Meta, StoryObj } from "@storybook/react";
import FormilyRender from "./Formily";

import demo2 from "./demos/demo2";
import demo3 from "./demos/demo3";
import demo4 from "./demos/demo4";
import demo5 from "./demos/demo5";
import demo6 from "./demos/demo6";
import demo7 from "./demos/demo7";
import demo8 from "./demos/demo8";
import demo9 from "./demos/demo9";
import demo10 from "./demos/demo10";
import demo11 from "./demos/demo11";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Example/Formily",
  component: FormilyRender,
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
} satisfies Meta<typeof FormilyRender>;

export default meta;

export type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
// export const EP1: Story = {
//   ...demo1,
//   name: "省市区联动",
// };

export const EP2: Story = {
  ...demo2,
  name: "表格过滤",
};
export const EP3: Story = {
  ...demo3,
  name: "可拖拽排序表格",
};

export const EP4: Story = {
  ...demo4,
  name: "输入框组合",
};

export const EP5: Story = {
  ...demo5,
  name: "前后端数据差异",
};

export const EP6: Story = {
  ...demo6,
  name: "表单校验",
};

export const EP7: Story = {
  ...demo7,
  name: "数据流",
};

export const EP8: Story = {
  ...demo8,
  name: "观星搜索",
};

export const EP9: Story = {
  ...demo9,
  name: "复杂关联",
};

export const EP10: Story = {
  ...demo10,
  name: "Selection",
};

export const EP11: Story = {
  ...demo11,
  name: "KeepValue",
};
