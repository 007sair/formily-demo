import type { Story } from "@/stories/formily/Formily.stories";
import FormilyDemo from "@/stories/formily/Formily";
import DemoWrapper from "@/components/DemoWrapper";

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const demo1: Story = {
  render: (args) => {
    return (
      <>
        <DemoWrapper
          paragraph={[
            "前后端数据不一致时的处理方式",
            "日期范围组件在前端是一个array字段，有时后端会拆分为2个key作为入参",
          ]}
        />
        <FormilyDemo {...args} />
      </>
    );
  },
  args: {
    labelCol: 6,
    wrapperCol: 18,
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
        submit: {
          type: "void",
          title: " ",
          "x-decorator": "FormItem",
          "x-component": "Submit",
          "x-content": "提交",
        },
      },
    },
  },
};

export default demo1;
