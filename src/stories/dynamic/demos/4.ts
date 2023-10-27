/**
 * 复杂联动效果
 */

import type { Story } from "../Dynamic.stories";

export const story_4: Story = {
  args: {
    schema: {
      type: "object",
      properties: {
        keyWord: {
          type: "string",
          title: "关键字",
          "x-decorator": "FormItem",
          "x-component": "Input",
        },
        selectValue: {
          type: "string",
          title: "Select",
          "x-decorator": "FormItem",
          "x-component": "Select",
          "x-component-props": {
            style: { width: 300 },
            placeholder: "请选择下拉项",
            request: {
              url: "/api/sugrec",
              params: {
                wd: "{{ $values.keyWord }}",
                prod: "pc",
              },
              format: "{{ res => res?.g }}",
            },
            fieldNames: {
              label: "q",
              value: "q",
            },
            showSearch: true,
            filterOption: false,
            onSearch:
              "{{ str => $self.componentProps.request.params.wd = str }}",
          },
          "x-reactions": "{{ useAsyncDataSource }}",
        },
        radioValue: {
          type: "string",
          title: "Radio",
          description: "数据依赖select",
          "x-decorator": "FormItem",
          "x-component": "Radio.Group",
          "x-component-props": {
            request: {
              service: "{{ queryBaidu }}",
              params: "{{ $values.selectValue }}",
            },
          },
          "x-reactions": "{{ useAsyncDataSource }}",
        },
        checkboxValue: {
          type: "string",
          title: "Checkbox",
          description: "数据依赖radio",
          "x-decorator": "FormItem",
          "x-component": "Checkbox.Group",
          "x-component-props": {
            request: {
              service: "{{ queryBaidu }}",
              params: "{{ $values.radioValue }}",
            },
          },
          "x-reactions": "{{ useAsyncDataSource }}",
        },
      },
    },
  },
};
