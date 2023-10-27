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
            "支持多选的表格，选择对应的项可回显在输入框中，SelectTable，利用reactions进行值联动",
            "应用场景：数据流distinct算子",
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
        selectTable: {
          type: "array",
          "x-decorator": "FormItem",
          "x-component": "SelectTable",
          "x-component-props": {
            bordered: false,
            showSearch: true,
            primaryKey: "key",
            isTree: true,
            filterOption: (input: string, option: any) =>
              option.description.toLowerCase().indexOf(input.toLowerCase()) >=
              0,
            filterSort: (optionA: any, optionB: any) =>
              optionA.description
                .toLowerCase()
                .localeCompare(optionB.description.toLowerCase()),
            optionAsValue: true,
            rowSelection: {
              checkStrictly: false,
            },
            pagination: false,
          },
          enum: [
            { key: "1", name: "name", type: "string", description: "A-描述" },
            {
              key: "2",
              name: "dt",
              type: "object",
              description: "X-描述",
              children: [
                {
                  key: "2-1",
                  name: "alias",
                  type: "string",
                  description: "Y-描述",
                },
                {
                  key: "2-2",
                  name: "age",
                  type: "number",
                  description: "Z-描述",
                },
              ],
            },
            { key: "3", name: "type", type: "string", description: "SS-描述" },
          ],
          properties: {
            name: {
              title: "字段名",
              type: "void",
              "x-component": "SelectTable.Column",
              "x-component-props": {
                width: "30%",
              },
              properties: {
                type: {
                  type: "number",
                  default: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Select",
                  "x-component-props": {
                    addonAfter: "$",
                  },
                  enum: [
                    {
                      children: [],
                      label: "string",
                      value: "string",
                    },
                    {
                      children: [],
                      label: "boolean",
                      value: "boolean",
                    },
                    {
                      children: [],
                      label: "其他",
                      value: "else",
                    },
                  ],
                },
              },
            },
            type: {
              title: "字段类型",
              "x-component": "SelectTable.Column",
              "x-component-props": {
                width: "30%",
              },
              properties: {
                // type: "string",
                // "x-decorator": "FormItem",
                // "x-component": "Input",
              },
            },
            description: {
              title: "描述",
              type: "string",
              "x-component": "SelectTable.Column",
              "x-component-props": {
                width: "40%",
              },
            },
          },
          "x-reactions": {
            target: "selectField",
            fulfill: {
              state: {
                value: "{{ $self.value.map((item) => item.name).join(',') }}",
              },
            },
          },
        },
        selectField: {
          type: "string",
          title: "已选择字段",
          "x-decorator": "FormItem",
          "x-component": "Input",
        },
        submit: {
          type: "void",
          "x-decorator": "FormItem",
          "x-component": "Submit",
          "x-content": "提交",
        },
      },
    },
  },
};

export default demo1;
