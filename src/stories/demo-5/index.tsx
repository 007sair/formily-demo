import { Markdown } from "@storybook/blocks";
import { Story } from "../index.stories";
import readme from "./README.md?raw";
import { Tag } from "antd";

export const demo5: Story = {
  render: (args, meta) => {
    const BasicRender = meta.component;
    return (
      <div style={{ margin: "0 auto", maxWidth: 1400 }}>
        <Markdown
          options={{ overrides: { code: (props) => <Tag {...props} /> } }}
        >
          {readme}
        </Markdown>
        {BasicRender ? <BasicRender {...args} /> : null}
      </div>
    );
  },
  args: {
    hiddenSubmit: true,
    schema: {
      type: "object",
      properties: {
        layout: {
          type: "void",
          "x-component": "FormLayout",
          "x-component-props": {
            labelCol: 6,
          },
          properties: {
            grid: {
              type: "void",
              "x-component": "FormGrid",
              "x-component-props": {
                minColumns: 1,
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
    },
  },
};
