import type { Story } from "@/stories/formily/Formily.stories";
import FormilyDemo from "@/stories/formily/Formily";
import DemoWrapper from "@/components/DemoWrapper";

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const demo1: Story = {
  render: (args) => {
    return (
      <>
        <DemoWrapper paragraph={["观星搜索"]} />
        <FormilyDemo {...args} />
      </>
    );
  },
  args: {
    labelCol: 6,
    wrapperCol: 18,
    style: { width: "auto" },
    schema: {
      type: "object",
      properties: {
        grid: {
          type: "void",
          "x-component": "FormGrid",
          "x-component-props": {
            minColumns: 3,
            maxColumns: 3,
            columnGap: 10,
          },
          properties: {
            "[startTime, endTime]": {
              type: "string",
              title: "日期范围",
              "x-decorator": "FormItem",
              "x-component": "DatePicker.RangePicker",
              "x-component-props": {
                showTime: true,
              },
              required: true,
            },
            pin: {
              type: "string",
              title: "User Pin",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-component-props": {
                placeholder: "请输入",
              },
            },
            traceId: {
              type: "string",
              title: "Trace ID",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-component-props": {
                placeholder: "请输入",
              },
            },
            __extra: {
              type: "void",
              "x-visible": false,
              properties: {
                uuid: {
                  type: "string",
                  title: "UUID",
                  "x-decorator": "FormItem",
                  "x-component": "Input",
                  "x-component-props": {
                    placeholder: "请输入",
                  },
                },
                sessionID: {
                  type: "string",
                  title: "Session ID",
                  "x-decorator": "FormItem",
                  "x-component": "Input",
                  "x-component-props": {
                    placeholder: "请输入",
                  },
                },
                site: {
                  type: "string",
                  title: "业务标识",
                  "x-decorator": "FormItem",
                  "x-component": "Input",
                  "x-component-props": {
                    tooltip:
                      "具体的广告位、频道位、推荐位等，例如: 80004（营销秒杀80004推荐位）",
                    placeholder: "请输入",
                  },
                },
                groupId: {
                  type: "string",
                  title: "分组ID",
                  "x-decorator": "FormItem",
                  "x-component": "Input",
                  "x-component-props": {
                    placeholder: "请输入",
                  },
                },
                logType: {
                  type: "string",
                  title: "日志类型",
                  "x-decorator": "FormItem",
                  "x-component": "Input",
                  "x-component-props": {
                    placeholder: "请输入",
                  },
                },
              },
            },
            btns: {
              type: "void",
              title: " ",
              "x-decorator": "FormItem",
              "x-component": "ActionButtons",
            },
          },
        },
      },
    },
  },
};

export default demo1;
