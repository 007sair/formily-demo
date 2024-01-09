import { Markdown } from "@storybook/blocks";
import { Story } from "../index.stories";
import readme from "./README.md?raw";

export const demo1: Story = {
  render: (args, meta) => {
    const BasicRender = meta.component;
    return (
      <div style={{ margin: "0 auto", maxWidth: 800 }}>
        <Markdown>{readme}</Markdown>
        {BasicRender ? <BasicRender {...args} /> : null}
      </div>
    );
  },
  args: {
    schema: {
      type: "object",
      properties: {
        visible_destructor: {
          type: "boolean",
          title: "是否显示解构字段",
          default: true,
          enum: [
            { label: "是", value: true },
            { label: "否", value: false },
          ],
          "x-decorator": "FormItem",
          "x-component": "Radio.Group",
        },
        undestructor: {
          type: "string",
          title: "解构前",
          "x-decorator": "FormItem",
          "x-component": "DatePicker.RangePicker",
        },
        "[startDate,endDate]": {
          type: "string",
          title: "解构后",
          default: ["2020-11-20", "2021-12-30"],
          "x-decorator": "FormItem",
          "x-component": "DatePicker.RangePicker",
          "x-reactions": {
            dependencies: ["visible_destructor"],
            fulfill: {
              state: {
                visible: "{{!!$deps[0]}}",
              },
            },
          },
        },
      },
    },
  },
};
