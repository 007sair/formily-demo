import type { Story } from "@/stories/formily/Formily.stories";
import FormilyDemo from "@/stories/formily/Formily";
import DemoWrapper from "@/components/DemoWrapper";

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const demo1: Story = {
  render: (args) => {
    return (
      <>
        <DemoWrapper
          paragraph={["几种不同的校验方式，普通校验、全局自定义校验"]}
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
        simpleValidate: {
          name: "simpleValidate",
          type: "string",
          title: "普通校验",
          "x-component": "Input",
          "x-decorator": "FormItem",
          "x-validator": {
            required: true,
          },
        },
        customValidate: {
          name: "customValidate",
          type: "string",
          title: "自定义校验",
          "x-component": "Input",
          "x-component-props": {
            placeholder: "请输入包含123的字符串",
          },
          "x-decorator": "FormItem",
          "x-validator": {
            format: "custom_format",
            message: "错误❎❎❎❎❎❎❎❎❎❎❎❎",
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
