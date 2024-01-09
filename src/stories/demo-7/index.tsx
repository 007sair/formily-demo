import { Markdown } from "@storybook/blocks";
import { Story } from "../index.stories";
import readme from "./README.md?raw";

// for custom
import { ISchema, Schema } from "@formily/react";
import { Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Field } from "@formily/core";

/**
 * 合并 schema 字段，转换为数组结构
 */
export const mergeProp = (prop: ISchema[keyof ISchema], value: any) => {
  const toArr = (v: any) => (!v ? [] : Array.isArray(v) ? v : [v]);
  return [...toArr(prop), ...toArr(value)];
};

Schema.registerPatches((schema) => {
  if (schema["x-component-props"]?.useTooltip) {
    const reaction = (field: Field) => {
      field.dataSource = field.dataSource.map((item) => {
        const tooltip = item.tooltip ? (
          <Tooltip title={item.tooltip} key={item.title}>
            <QuestionCircleOutlined style={{ marginLeft: 5 }} />
          </Tooltip>
        ) : null;
        if (tooltip && typeof item.label === "string") {
          return {
            ...item,
            label: (
              <>
                {item.label}
                {tooltip}
              </>
            ),
          };
        }
        return item;
      });
    };
    schema["x-reactions"] = mergeProp(schema["x-reactions"], reaction);
  }
  return schema;
});

Schema.registerPatches((schema) => {
  if (schema["x-component"] === "Checkbox.Group") {
    const xcp = schema["x-component-props"];
    if (xcp?.min || xcp?.max) {
      const reaction = (field: Field) => {
        const min = Math.max(xcp.min, 0);
        const len = field.value?.length || 0;
        field.dataSource = field.dataSource.map((item) => {
          const that = field.value.find((v: any) => v === item.value);
          const found = typeof that !== "undefined";
          return {
            ...item,
            disabled: (len <= min && found) || (len >= xcp.max && !found),
          };
        });
      };
      schema["x-reactions"] = mergeProp(schema["x-reactions"], reaction);
    }
  }
  return schema;
});

export const demo7: Story = {
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
        dataType: {
          type: "number",
          title: "商品类型",
          "x-decorator": "FormItem",
          "x-component": "Radio.Group",
          "x-component-props": {
            useTooltip: true,
          },
          enum: [
            { label: "类型1", value: 0, tooltip: "类型1的描述信息" },
            { label: "类型2", value: 1, tooltip: "类型2的描述信息" },
            { label: "类型3", value: 2 },
          ],
        },
        rate: {
          type: "object",
          title: "好评率",
          "x-decorator": "FormItem",
          "x-decorator-props": {
            tooltip: "好评率tooltip",
          },
          default: {
            start: 95,
            end: 92,
          },
          "x-data": {
            "default-text": "95% - 100%",
          },
          properties: {
            grid: {
              type: "void",
              "x-component": "Space",
              "x-component-props": {
                align: "start",
              },
              properties: {
                start: {
                  type: "number",
                  "x-decorator": "FormItem",
                  "x-decorator-props": { style: { marginBottom: 0 } },
                  "x-component": "NumberPicker",
                  minimum: 0,
                  maximum: 100,
                  "x-reactions": {
                    dependencies: [".end"],
                    fulfill: {
                      state: {
                        selfErrors:
                          "{{$deps[0] < $self.value ? '不能大于结束值' : ''}}",
                      },
                    },
                  },
                },
                line: {
                  type: "void",
                  "x-content": "-",
                },
                end: {
                  type: "number",
                  "x-decorator": "FormItem",
                  "x-decorator-props": { style: { marginBottom: 0 } },
                  "x-component": "NumberPicker",
                  minimum: 0,
                  maximum: 100,
                  "x-reactions": {
                    dependencies: [".start"],
                    fulfill: {
                      state: {
                        selfErrors:
                          "{{$deps[0] > $self.value ? '不能小于起始值' : ''}}",
                      },
                    },
                  },
                },
                suffix: {
                  type: "void",
                  "x-content": "%",
                },
              },
            },
          },
        },
        jdPrice: {
          type: "object",
          title: "京东价",
          "x-decorator": "FormItem",
          "x-decorator-props": {
            tooltip: "",
          },
          properties: {
            grid: {
              type: "void",
              "x-component": "Space",
              properties: {
                start: {
                  type: "number",
                  "x-decorator": "FormItem",
                  "x-decorator-props": { style: { marginBottom: 0 } },
                  "x-component": "NumberPicker",
                  "x-component-props": {
                    precision: 2,
                  },
                },
                line: {
                  type: "void",
                  "x-content": "-",
                },
                end: {
                  type: "number",
                  "x-decorator": "FormItem",
                  "x-decorator-props": { style: { marginBottom: 0 } },
                  "x-component": "NumberPicker",
                  "x-component-props": {
                    precision: 2,
                  },
                },
                suffix: {
                  type: "void",
                  "x-content": "元",
                },
              },
            },
          },
        },
        itemQIGrade: {
          type: "array",
          title: "商品质量等级",
          "x-decorator": "FormItem",
          "x-component": "Checkbox.Group",
          default: [5, 4],
          "x-component-props": {
            min: 1,
            max: 3,
          },
          enum: [
            { label: "等级A", value: 5 },
            { label: "等级B", value: 4 },
            { label: "等级C", value: 3 },
            { label: "等级D", value: 2 },
            { label: "等级E", value: 1 },
            { label: "无等级", value: 0 },
          ],
        },
        wxDomain: {
          type: "object",
          title: "微信域成交数据",
          "x-decorator": "FormItem",
          "x-decorator-props": {
            tooltip: "微信域成交数据聚合",
          },
          properties: {
            grid: {
              type: "void",
              "x-component": "FormGrid",
              "x-component-props": {
                maxColumns: 6,
                minColumns: 1,
              },
              properties: {
                transaction: {
                  type: "string",
                  "x-component": "Select",
                  "x-component-props": {
                    allowClear: true,
                  },
                  enum: [
                    { label: "成交金额", value: 1 },
                    { label: "成交金额环比", value: 2 },
                  ],
                },
                day: {
                  type: "number",
                  "x-component": "Select",
                  "x-component-props": {
                    allowClear: true,
                  },
                  "x-reactions": {
                    dependencies: [".transaction"],
                    fulfill: {
                      state: {
                        visible: "{{$deps[0] ? true : false}}",
                        value: "{{$deps[0] ? $self.value : null }}",
                      },
                    },
                  },
                  enum: [
                    { label: "近7天", value: 7 },
                    { label: "近30天", value: 30 },
                  ],
                },
                rank: {
                  type: "number",
                  "x-component": "Select",
                  "x-component-props": {
                    allowClear: true,
                  },
                  "x-reactions": {
                    dependencies: [".day"],
                    fulfill: {
                      state: {
                        visible: "{{$deps[0] ? true : false}}",
                        value: "{{$deps[0] ? $self.value : null }}",
                      },
                    },
                  },
                  enum: [{ label: "排名率", value: "ratio" }],
                },
                range: {
                  type: "number",
                  "x-component": "Select",
                  "x-component-props": {
                    allowClear: true,
                  },
                  "x-reactions": {
                    dependencies: [".rank"],
                    fulfill: {
                      state: {
                        visible: "{{$deps[0] ? true : false}}",
                        value: "{{$deps[0] ? $self.value : null }}",
                      },
                    },
                  },
                  enum: [{ label: "TOP", value: "TOP" }],
                },
                ratio: {
                  type: "number",
                  "x-component": "NumberPicker",
                  "x-reactions": {
                    dependencies: [".range"],
                    fulfill: {
                      state: {
                        visible: "{{$deps[0] ? true : false}}",
                        value: "{{$deps[0] ? $self.value : null }}",
                      },
                    },
                  },
                },
                suffix: {
                  type: "void",
                  "x-component": "Text",
                  "x-component-props": {
                    content: "%",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
