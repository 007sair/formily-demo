import { Markdown } from "@storybook/blocks";
import { Story } from "../index.stories";
import readme from "./README.md?raw";

export const demo8: Story = {
  render: (args, meta) => {
    const BasicRender = meta.component;
    return (
      <div style={{ margin: "1em auto", maxWidth: 800 }}>
        <Markdown>{readme}</Markdown>
        {BasicRender ? <BasicRender {...args} /> : null}
      </div>
    );
  },
  args: {
    schema: {
      type: "object",
      properties: {
        keepValue: {
          type: "boolean",
          title: "是否保留值",
          "x-decorator": "FormItem",
          "x-decorator-props": {
            tooltip: "开启时，切换API类型会保留隐藏的字段（table、stream）",
          },
          "x-component": "Switch",
        },
        apiType: {
          type: "boolean",
          title: "API类型",
          "x-decorator": "FormItem",
          "x-component": "Radio.Group",
          default: "table",
          enum: [
            { label: "Table API", value: "table" },
            { label: "Stream API", value: "stream" },
          ],
        },
        table: {
          type: "object",
          "x-reactions": [
            {
              dependencies: ["apiType", "keepValue"],
              when: "{{ $deps[1] }}",
              fulfill: {
                state: {
                  hidden: "{{$deps[0] !== 'table'}}",
                },
              },
              otherwise: {
                state: {
                  visible: "{{$deps[0] === 'table'}}",
                },
              },
            },
          ],
          properties: {
            dataType: {
              title: "消息格式",
              "x-decorator": "FormItem",
              "x-component": "Select",
              enum: [
                {
                  children: [],
                  label: "Bytes",
                  value: "Bytes",
                },
                {
                  children: [],
                  label: "String",
                  value: "String",
                },
                {
                  children: [],
                  label: "JDW",
                  value: "JDW",
                },
              ],
              required: true,
              default: "String",
            },
            format: {
              title: "format",
              "x-decorator": "FormItem",
              "x-component": "Select",
              required: true,
              enum: [
                {
                  children: [],
                  label: "csv",
                  value: "csv",
                },
                {
                  children: [],
                  label: "raw",
                  value: "raw",
                },
                {
                  children: [],
                  label: "json",
                  value: "json",
                },
              ],
              default: "csv",
              "x-reactions": {
                target: "tableProps.delimiter",
                fulfill: {
                  state: {
                    visible: "{{$self.value === 'csv'}}",
                  },
                },
              },
              description: "此处与下方涉及联动",
            },
            delimiter: {
              title: "分割方式",
              "x-decorator": "FormItem",
              "x-component": "Select",
              enum: [
                {
                  children: [],
                  label: "逗号(,)",
                  value: ",",
                },
              ],
              default: ",",
            },
          },
        },
        stream: {
          type: "object",
          "x-reactions": [
            {
              dependencies: ["apiType", "keepValue"],
              when: "{{ $deps[1] }}",
              fulfill: {
                state: {
                  hidden: "{{$deps[0] !== 'stream'}}",
                },
              },
              otherwise: {
                state: {
                  visible: "{{$deps[0] === 'stream'}}",
                },
              },
            },
          ],
          properties: {
            rateLimit: {
              type: "string",
              title: "消费限速",
              "x-decorator": "FormItem",
              "x-component": "Input",
              default: "100",
              "x-component-props": {
                addonAfter: "条数/分钟",
                placeholder: "",
              },
              "x-decorator-props": {
                tooltip: "每个task manager的消费速率",
              },
              name: "rateLimit",
              description: "",
              "x-designable-id": "nlh0btmdojo",
              "x-index": 0,
            },
            parallelism: {
              type: "number",
              title: "并行度",
              "x-decorator": "FormItem",
              "x-component": "NumberPicker",
              "x-validator": [],
              "x-component-props": {},
              "x-decorator-props": {},
              name: "parallelism",
              "x-designable-id": "xxfg5x86rlv",
              "x-index": 1,
            },
            password: {
              title: "Password",
              "x-decorator": "FormItem",
              "x-component": "Password",
              "x-validator": [],
              "x-component-props": {},
              "x-decorator-props": {},
              name: "password",
              "x-designable-id": "lzkydk7zfxw",
              "x-index": 2,
            },
          },
        },
      },
    },
  },
};
