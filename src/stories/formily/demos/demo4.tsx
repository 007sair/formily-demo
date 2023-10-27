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
            "数字输入框组合后缀",
            "实现方式: NumberPicker、scope, 应用例子: 存在单位的表单项",
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
        time: {
          type: "number",
          title: "时间",
          "x-component": "NumberPicker",
          "x-decorator": "FormItem",
          "x-component-props": {
            style: {
              width: "100%",
            },
            addonAfter:
              "{{addonSelect('addon', 's', { options: [{label: '秒',value: 's',},{label: '毫秒',value: 'ms',}]})}}",
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
