import { Markdown } from "@storybook/blocks";
import { Story } from "../index.stories";
import readme from "./README.md?raw";
import { Field } from "@formily/react";
import { Select } from "@formily/antd-v5";

const scope = {
  addonSelect: (name: string, value: string, args: any) => {
    return (
      <Field
        value={value}
        name={name}
        component={[
          Select,
          {
            ...args,
            style: {
              width: "70px",
            },
          },
        ]}
        basePath={""}
      />
    );
  },
};

export const demo3: Story = {
  render: (args, meta) => {
    const BasicRender = meta.component;
    return (
      <div style={{ margin: "0 auto", maxWidth: 800 }}>
        <Markdown>{readme}</Markdown>
        {BasicRender ? <BasicRender {...args} scope={scope} /> : null}
      </div>
    );
  },
  args: {
    schema: {
      type: "object",
      properties: {
        time: {
          type: "number",
          title: "时间",
          "x-component": "NumberPicker",
          "x-decorator": "FormItem",
          "x-component-props": {
            style: {
              width: "100%",
            },
            addonAfter:
              "{{addonSelect('addon', 's', { options: [{label: '秒',value: 's',},{label: '毫秒',value: 'ms',}]})}}",
          },
        },
      },
    },
  },
};
