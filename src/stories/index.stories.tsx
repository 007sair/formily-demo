import type { Meta, StoryObj } from "@storybook/react";
import BasicRender from "@/components/BasicRender";

import { demo1 } from "./demo-1/index";
import { demo2 } from "./demo-2/index";
import { demo3 } from "./demo-3/index";
import { demo4 } from "./demo-4/index";
import { demo5 } from "./demo-5/index";
import { demo6 } from "./demo-6/index";
import { demo7 } from "./demo-7/index";
import { demo8 } from "./demo-8/index";
import { demo9 } from "./demo-9/index";
import { demo10 } from "./demo-10/index";

const meta = {
  title: "Example/Formily",
  component: BasicRender,
  // tags: ["autodocs"],
  argTypes: {
    schema: { control: "object" },
  },
} satisfies Meta<typeof BasicRender>;

export default meta;

export type Story = StoryObj<typeof meta>;

// stories
export const Story1: Story = { ...demo1, name: "前后端数据差异" };
export const Story2: Story = { ...demo2, name: "表单校验" };
export const Story3: Story = { ...demo3, name: "输入框组合" };
export const Story4: Story = { ...demo4, name: "数据流" };
export const Story5: Story = { ...demo5, name: "观星" };
export const Story6: Story = { ...demo6, name: "复杂联动" };
export const Story7: Story = { ...demo7, name: "选品标签" };
export const Story8: Story = { ...demo8, name: "字段保留" };
export const Story9: Story = { ...demo9, name: "表格过滤" };
export const Story10: Story = { ...demo10, name: "可拖拽排序表格" };
