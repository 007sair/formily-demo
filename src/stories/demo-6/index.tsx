import { Markdown } from "@storybook/blocks";
import { Story } from "../index.stories";
import readme from "./README.md?raw";

export const demo6: Story = {
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
        confType: {
          type: "array",
          title: "配置类型",
          "x-decorator": "FormItem",
          "x-component": "Checkbox.Group",
          enum: [
            { label: "黑白名单", value: "whitelist" },
            { label: "通用配置", value: "svcConf" },
            { label: "自定义配置", value: "customConf" },
          ],
        },
        space: {
          type: "void",
          "x-component": "Space",
          "x-component-props": {
            direction: "vertical",
            size: 20,
            style: { width: "100%" },
          },
          properties: {
            collapse: {
              type: "void",
              "x-component": "FormTab",
              "x-component-props": {
                formTab: "{{formTab}}",
              },
              properties: {
                whitelist: {
                  type: "object",
                  "x-component": "FormTab.TabPane",
                  "x-component-props": {
                    tab: "黑白名单",
                  },
                  "x-visible": false,
                  "x-reactions": {
                    dependencies: ["confType"],
                    fulfill: {
                      state: {
                        visible:
                          '{{Array.isArray($deps[0]) && $deps[0].includes("whitelist")}}',
                      },
                    },
                  },
                  properties: {
                    blackUserPin: {
                      type: "string",
                      title: "黑名单",
                      "x-decorator": "FormItem",
                      "x-component": "Input.TextArea",
                      "x-component-props": {
                        placeholder: "多个pin请使用英文逗号(,)隔开",
                        autoSize: { minRows: 3, maxRows: 6 },
                      },
                      "x-validator": {
                        pattern: /^[a-zA-Z0-9*.]+(,[a-zA-Z0-9*.]+){0,999}$/,
                        message:
                          "多个pin使用英文逗号隔开，pin的数量不能超过1000个",
                      },
                    },
                    whiteUserPin: {
                      type: "string",
                      title: "白名单",
                      "x-decorator": "FormItem",
                      "x-component": "Input.TextArea",
                      "x-component-props": {
                        placeholder: "多个userpin请使用英文逗号(,)隔开",
                        autoSize: { minRows: 3, maxRows: 6 },
                      },
                      "x-validator": {
                        pattern: /^[a-zA-Z0-9*.]+(,[a-zA-Z0-9*.]+){0,999}$/,
                        message:
                          "多个pin使用英文逗号隔开，pin的数量不能超过1000个",
                      },
                    },
                  },
                },
                svcConf: {
                  type: "void",
                  "x-component": "FormTab.TabPane",
                  "x-component-props": {
                    tab: "通用配置",
                  },
                  "x-visible": false,
                  "x-reactions": {
                    dependencies: ["confType"],
                    fulfill: {
                      state: {
                        visible:
                          '{{Array.isArray($deps[0]) && $deps[0].includes("svcConf")}}',
                      },
                    },
                  },
                  properties: {
                    svcConf: {
                      type: "array",
                      "x-component": "ArrayItems",
                      "x-decorator": "FormItem",
                      default: [
                        { key: "key1", value: "" },
                        { key: "key2", value: "" },
                        { key: "key3", value: "" },
                      ],
                      items: {
                        type: "object",
                        properties: {
                          space: {
                            type: "void",
                            "x-component": "Space",
                            "x-component-props": {
                              align: "top",
                            },
                            properties: {
                              key: {
                                type: "string",
                                title: "key",
                                required: true,
                                "x-decorator": "FormItem",
                                "x-component": "Input",
                                "x-disabled": "{{ $index < 3 }}", // 前3个索引锁死key，不让编辑
                              },
                              value: {
                                type: "string",
                                title: "value",
                                required: true,
                                "x-decorator": "FormItem",
                                "x-component": "Input",
                              },
                              remove: {
                                type: "void",
                                "x-decorator": "FormItem",
                                "x-component": "ArrayItems.Remove",
                                "x-disabled": "{{ $index < 3 }}", // 前3个索引锁死key，不让编辑
                              },
                            },
                          },
                        },
                      },
                      properties: {
                        add: {
                          type: "void",
                          title: "添加条目",
                          "x-component": "ArrayItems.Addition",
                          "x-component-props": {
                            defaultValue: { key: "", value: "" },
                          },
                        },
                      },
                    },
                  },
                },
                customConf: {
                  type: "void",
                  "x-component": "FormTab.TabPane",
                  "x-component-props": {
                    tab: "自定义配置",
                  },
                  "x-visible": false,
                  "x-reactions": {
                    dependencies: ["confType"],
                    fulfill: {
                      state: {
                        visible:
                          '{{Array.isArray($deps[0]) && $deps[0].includes("customConf")}}',
                      },
                    },
                  },
                  properties: {
                    customConf: {
                      type: "array",
                      "x-component": "ArrayItems",
                      "x-decorator": "FormItem",
                      items: {
                        type: "object",
                        properties: {
                          space: {
                            type: "void",
                            "x-component": "Space",
                            "x-component-props": {
                              align: "top",
                            },
                            properties: {
                              custom_type: {
                                type: "string",
                                title: "类型",
                                "x-decorator": "FormItem",
                                "x-decorator-props": {
                                  tooltip:
                                    '{{ $self.value === "groupid" ? "AB分组等其它分组ID列表" : $self.value === "siteid" ? "推荐位/广告位/营销频道列表" : "" }}',
                                },
                                "x-component": "Select",
                                "x-component-props": {
                                  style: { width: 150 },
                                },
                                default: "permillage",
                                enum: [
                                  {
                                    label: "采样率(千分率)",
                                    value: "permillage",
                                  },
                                  { label: "采样时间段", value: "timerange" },
                                  { label: "分组ID列表", value: "groupid" },
                                  { label: "位置/频道列表", value: "siteid" },
                                ],
                              },
                              custom_value: {
                                type: "object",
                                properties: {
                                  "[start, end]": {
                                    type: "string",
                                    title: "值",
                                    required: true,
                                    "x-decorator": "FormItem",
                                    "x-component": "DatePicker.RangePicker",
                                    "x-component-props": {
                                      showTime: true,
                                    },
                                    "x-reactions": {
                                      dependencies: ["..custom_type"],
                                      fulfill: {
                                        state: {
                                          visible:
                                            '{{$deps[0] === "timerange"}}',
                                        },
                                      },
                                    },
                                  },
                                  permillage: {
                                    type: "number",
                                    title: "值",
                                    required: true,
                                    "x-decorator": "FormItem",
                                    "x-component": "NumberPicker",
                                    minimum: 0,
                                    maximum: 1000,
                                    "x-reactions": {
                                      dependencies: ["..custom_type"],
                                      fulfill: {
                                        state: {
                                          visible:
                                            '{{$deps[0] === "permillage"}}',
                                        },
                                      },
                                    },
                                  },
                                  groupidlist: {
                                    type: "string",
                                    title: "值",
                                    required: true,
                                    "x-decorator": "FormItem",
                                    "x-component": "Input",
                                    "x-reactions": {
                                      dependencies: ["..custom_type"],
                                      fulfill: {
                                        state: {
                                          visible: '{{$deps[0] === "groupid"}}',
                                        },
                                      },
                                    },
                                  },
                                  siteidlist: {
                                    type: "string",
                                    title: "值",
                                    required: true,
                                    "x-decorator": "FormItem",
                                    "x-component": "Input",
                                    "x-reactions": {
                                      dependencies: ["..custom_type"],
                                      fulfill: {
                                        state: {
                                          visible: '{{$deps[0] === "siteid"}}',
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                              remove: {
                                type: "void",
                                title: " ",
                                "x-decorator": "FormItem",
                                "x-component": "ArrayItems.Remove",
                              },
                            },
                          },
                        },
                      },
                      properties: {
                        add: {
                          type: "void",
                          title: "添加条目",
                          "x-component": "ArrayItems.Addition",
                        },
                      },
                    },
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
