import { Markdown } from "@storybook/blocks";
import { Story } from "../index.stories";
import readme from "./README.md?raw";

export const demo4: Story = {
  render: (args, meta) => {
    const BasicRender = meta.component;
    return (
      <div style={{ margin: "0 auto", maxWidth: 800 }}>
        <Markdown>{readme}</Markdown>
        {BasicRender ? <BasicRender {...args} /> : null}
      </div>
    );
  },
  args: {
    schema: {
      type: "object",
      properties: {
        collapse1: {
          type: "void",
          "x-component": "FormCollapse",
          "x-component-props": {
            accordion: false,
            ghost: false,
            title: "运行任务",
            style: { marginBottom: 10 },
          },
          name: "collapse1",
          "x-index": 0,
          properties: {
            run: {
              type: "object",
              "x-component": "FormCollapse.CollapsePanel",
              "x-component-props": {
                header: "运行规则",
              },
              properties: {
                grid: {
                  type: "void",
                  "x-component": "FormGrid",
                  "x-component-props": {
                    minColumns: 2,
                    maxColumns: 2,
                    columnGap: 48,
                  },
                  "x-index": 0,
                  properties: {
                    periodicType: {
                      type: "string | number",
                      title: "调度方式",
                      "x-decorator": "FormItem",
                      "x-component": "Radio.Group",
                      default: "cycle",
                      required: true,
                      enum: [
                        {
                          label: "周期调度",
                          value: "cycle",
                        },
                        {
                          label: "只运行一次",
                          value: "temp",
                        },
                      ],
                    },
                    maxRunTime: {
                      type: "number",
                      title: "执行超时时长（分）",
                      "x-decorator": "FormItem",
                      "x-component": "NumberPicker",
                      "x-component-props": {
                        min: 0,
                        max: 3600,
                      },
                      default: 1440,
                      required: true,
                    },
                    cycleType: {
                      type: "string",
                      title: "周期类型",
                      "x-decorator": "FormItem",
                      "x-component": "Select",
                      enum: [
                        { label: "月", value: "month" },
                        { label: "周", value: "week" },
                        { label: "天", value: "day" },
                        { label: "时", value: "hour" },
                        { label: "1分", value: "1minute" },
                        { label: "5分", value: "5minute" },
                        { label: "10分", value: "10minute" },
                        { label: "15分", value: "15minute" },
                        { label: "30分", value: "30minute" },
                        { label: "自定义", value: "custom" },
                      ],
                      default: "day",
                      required: true,
                      "x-visible": "{{$values.run.periodicType === 'cycle'}}",
                      // "x-reactions": "{{cycleTypeReaction}}",
                      "x-index": 2,
                    },
                    nextTime: {
                      type: "string",
                      title: "运行时间",
                      "x-decorator": "FormItem",
                      "x-component": "Input",
                      "x-visible": "{{$values.run.periodicType === 'temp'}}",
                      "x-index": 3,
                    },
                    grid2: {
                      type: "void",
                      "x-component": "Space",
                      "x-component-props": {
                        minColumns: 1,
                        maxColumns: 3,
                        align: "start",
                      },
                      "x-designable-id": "3j570ckuxdx",
                      "x-index": 5,
                      properties: {
                        day: {
                          title: "天",
                          type: "number",
                          required: true,
                          "x-decorator": "FormItem",
                          "x-component": "NumberPicker",
                          "x-component-props": {
                            min: 1,
                            max: 32,
                          },
                          "x-visible":
                            "{{$values.run.periodicType === 'cycle' && ['month', 'week'].includes($values.run.cycleType) }}",
                          "x-index": 6,
                        },
                        hour: {
                          title: "时",
                          type: "number",
                          required: true,
                          "x-decorator": "FormItem",
                          "x-component": "NumberPicker",
                          "x-component-props": {
                            min: 0,
                            max: 23,
                          },
                          "x-visible":
                            "{{$values.run.periodicType === 'cycle' && ['month', 'week', 'day'].includes($values.run.cycleType) }}",
                          "x-index": 7,
                        },
                        minute: {
                          title: "分",
                          type: "number",
                          required: true,
                          "x-decorator": "FormItem",
                          "x-component": "NumberPicker",
                          "x-component-props": {
                            min: 0,
                            max: 59,
                          },
                          "x-visible":
                            "{{$values.run.periodicType === 'cycle' && ['month', 'week', 'day', 'hour'].includes($values.run.cycleType)}}",
                          "x-index": 8,
                        },
                      },
                    },

                    cycleStep: {
                      title: "周期步长",
                      type: "number",
                      "x-component": "Input",
                      "x-decorator": "FormItem",
                      required: false,
                      "x-hidden": true,
                      default: "",
                      "x-index": 9,
                    },
                    cronExpression: {
                      title: "自定义运行规则",
                      type: "string",
                      "x-component": "Input",
                      "x-component-props": {
                        placeholder: "0 0 0 * * ?",
                      },
                      "x-decorator": "FormItem",
                      required: true,
                      "x-visible": "{{$values.run.cycleType === 'custom'}}",
                      "x-validator": {
                        format: "cronExpressionPattern",
                        message: "只支持格式：0 0 0 * * ?",
                      },
                      "x-index": 10,
                    },
                    failRetry: {
                      title: "失败重试策略",
                      type: "NumberPicker",
                      "x-component": "Radio.Group",
                      "x-decorator": "FormItem",
                      enum: [
                        {
                          label: "关闭",
                          value: 0,
                        },
                        {
                          label: "开启",
                          value: 1,
                        },
                      ],
                      default: 1,
                      required: true,
                    },
                    retryTimes: {
                      title: "失败重试次数",
                      type: "number",
                      "x-decorator": "FormItem",
                      "x-component": "NumberPicker",
                      default: 1,
                      "x-hidden": "{{!$values.run.failRetry}}",
                      "x-index": 12,
                    },
                    retryInterval: {
                      title: "失败重试间隔（秒）",
                      type: "number",
                      "x-decorator": "FormItem",
                      "x-component": "NumberPicker",
                      default: 30,
                      "x-hidden": "{{!$values.run.failRetry}}",
                      "x-index": 13,
                    },
                    effectiveTime: {
                      title: "任务生效时间",
                      type: "string",
                      "x-decorator": "FormItem",
                      "x-component": "DatePicker",
                      "x-component-props": {
                        showTime: true,
                      },
                      "x-hidden": '{{$values.run.periodicType === "temp"}}',
                      "x-index": 14,
                    },
                    selfDepend: {
                      title: "实例执行策略",
                      type: "number",
                      "x-component": "Radio.Group",
                      "x-decorator": "FormItem",
                      enum: [
                        {
                          label: "不依赖上一周期",
                          value: 0,
                        },
                        {
                          label: "依赖上一周期",
                          value: 1,
                        },
                        {
                          label: "只运行最新周期",
                          value: 2,
                        },
                      ],
                      default: 0,
                      "x-hidden": '{{$values.run.periodicType === "temp"}}',
                      "x-index": 15,
                    },
                    slaTime: {
                      title: "预计完成时间",
                      type: "string",
                      "x-component": "Input",
                      "x-decorator": "FormItem",
                      "x-component-props": {
                        placeholder: "请输入小时和分钟，如00:00",
                      },
                      "x-validator": [
                        {
                          format: "slaTimePattern",
                          message: "时间格式不正确",
                        },
                      ],
                      "x-index": 16,
                    },
                    waitCurrency: {
                      title: "最多等待实例个数",
                      type: "string",
                      "x-component": "PreviewText",
                      "x-component-props": {
                        value: 12,
                      },
                      "x-decorator": "FormItem",
                      default: "12",
                      "x-index": 17,
                    },
                    concurrency: {
                      title: "最大并发实例数",
                      type: "number",
                      "x-decorator": "FormItem",
                      "x-component": "NumberPicker",
                      "x-component-props": {
                        min: 1,
                        max: 999,
                      },
                      default: 5,
                      "x-index": 18,
                    },
                    waitDay: {
                      title: "等待超时时长（天）",
                      type: "string",
                      "x-decorator": "FormItem",
                      "x-component": "PreviewText",
                      "x-component-props": {
                        value: "7",
                      },
                      default: "7",
                      "x-index": 19,
                    },
                    parentRerunPolicy: {
                      title: "父任务重跑设置",
                      type: "number",
                      "x-decorator": "FormItem",
                      "x-component": "Select",
                      enum: [
                        {
                          label: "不通知任务负责人，不自动重跑",
                          value: 0,
                        },
                        {
                          label: "通知任务负责人，不自动重跑",
                          value: 1,
                        },
                        {
                          label:
                            "通知任务负责人，自动跟随4.0任务重跑（正在执行时除外）",
                          value: 3,
                        },
                      ],
                      default: 0,
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
