import { Markdown } from "@storybook/blocks";
import { Story } from "../index.stories";
import readme from "./README.md?raw";

// for custom
import { Schema } from "@formily/react";
import { Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Field } from "@formily/core";

Schema.registerPatches((schema) => {
  if (schema["x-component-props"]?.useTooltip) {
    schema["x-reactions"] = (field: Field) => {
      field.dataSource = field.dataSource.map((item) => {
        const tooltip = item.tooltip ? (
          <Tooltip title={item.tooltip}>
            <QuestionCircleOutlined style={{ marginLeft: 5 }} />
          </Tooltip>
        ) : null;
        return {
          ...item,
          label: (
            <>
              {item.label}
              {tooltip}
            </>
          ),
        };
      });
    };
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
            { label: "全部", value: 0, tooltip: "全部的描述信息" },
            { label: "自营", value: 1, tooltip: "自营的描述信息" },
            { label: "POP", value: 2 },
          ],
        },
        rate: {
          type: "object",
          title: "好评率",
          "x-decorator": "FormItem",
          "x-decorator-props": {
            tooltip: "截止当前4-5星评论数 / 截止当前1-5星评论数，不含默认好评",
          },
          default: {
            start: 95,
            end: 100,
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
                  "x-component": "NumberPicker",
                  minimum: 0,
                  maximum: 100,
                  "x-reactions": {
                    dependencies: ["skuGoodCommentRate.end"],
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
                  "x-component": "NumberPicker",
                  minimum: 0,
                  maximum: 100,
                  "x-reactions": {
                    dependencies: ["skuGoodCommentRate.start"],
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
            tooltip:
              "京东基准价，维护时直接更新，与商品详情页展示的京东价可能不一致，例如商品有促销情况下则不一致，商品详情页展示的是实时京东价。",
          },
          properties: {
            grid: {
              type: "void",
              "x-component": "Space",
              properties: {
                start: {
                  type: "number",
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
          enum: [
            { label: "等级AA", value: 5 },
            { label: "等级A", value: 4 },
            { label: "等级B", value: 3 },
            { label: "等级C", value: 2 },
            { label: "等级D", value: 1 },
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
