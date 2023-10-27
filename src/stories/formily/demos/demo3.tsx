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
            "支持排序和新增的表格",
            "实现方式: ArrayTable, 应用例子: 数据流Select算子",
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
        //表格
        projects: {
          type: "array",
          title: "",
          default: [],
          "x-decorator": "FormItem",
          "x-component": "ArrayTable",
          "x-component-props": {
            size: "small",
          },
          "x-decorator-props": {
            size: "small",
            asterisk: true,
            wrapperWrap: false,
          },
          items: {
            type: "object",
            properties: {
              column_1: {
                type: "void",
                "x-component": "ArrayTable.Column",
                "x-component-props": {
                  width: 50,
                  title: "排序",
                  align: "center",
                },
                properties: {
                  sortable: {
                    type: "void",
                    "x-component": "ArrayTable.SortHandle",
                  },
                },
              },
              column_2: {
                type: "void",
                "x-component": "ArrayTable.Column",
                "x-component-props": {
                  width: 80,
                  title: "序号",
                  align: "center",
                },
                properties: {
                  index: {
                    type: "void",
                    "x-component": "ArrayTable.Index",
                  },
                },
              },
              column_3: {
                type: "void",
                "x-component": "ArrayTable.Column",
                "x-component-props": {
                  title: "类型",
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
              column_4: {
                type: "void",
                "x-component": "ArrayTable.Column",
                "x-component-props": {
                  title: "自定义类型",
                },
                properties: {
                  custom_type: {
                    type: "number",
                    default: "",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-reactions": {
                      dependencies: [".type"],
                      fulfill: {
                        schema: {
                          "x-disabled": "{{$deps[0] !== 'else'}}",
                        },
                      },
                    },
                  },
                },
              },
              column_5: {
                type: "void",
                "x-component": "ArrayTable.Column",
                "x-component-props": {
                  title: "操作",
                  fixed: "right",
                },
                properties: {
                  item: {
                    type: "void",
                    "x-component": "FormItem",
                    properties: {
                      remove: {
                        type: "void",
                        "x-component": "ArrayTable.Remove",
                      },
                      moveDown: {
                        type: "void",
                        "x-component": "ArrayTable.MoveDown",
                      },
                      moveUp: {
                        type: "void",
                        "x-component": "ArrayTable.MoveUp",
                      },
                    },
                  },
                },
              },
            },
          },
          properties: {
            add: {
              type: "void",
              title: "Add",
              "x-component": "ArrayTable.Addition",
            },
          },
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
