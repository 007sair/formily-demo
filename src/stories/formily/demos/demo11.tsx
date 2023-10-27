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
            "针对不同的业务场景，左侧表单是UI隐藏保留值的场景，右侧表单是UI隐藏不保留值的场景。",
            "实现方式: 涉及schema属性visible和hidden的区别，应用例子：数据流JDQ算子",
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
