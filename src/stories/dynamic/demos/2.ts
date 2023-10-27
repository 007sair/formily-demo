/**
 * service function
 */

import type { Story } from "../Dynamic.stories";

export const story_2: Story = {
  args: {
    schema: {
      type: "object",
      properties: {
        selectValue: {
          type: "string",
          title: "Select",
          description: "service指定函数名，params独立配置",
          "x-decorator": "FormItem",
          "x-component": "Select",
          "x-component-props": {
            placeholder: "请选择下拉项",
            request: {
              service: "{{ () => queryBaidu('123') }}",
            },
          },
          "x-reactions": "{{ useAsyncDataSource }}",
        },
        selectValue2: {
          type: "string",
          title: "Select",
          description: "service指定函数名，params独立配置，支持搜索",
          "x-decorator": "FormItem",
          "x-component": "Select",
          "x-component-props": {
            placeholder: "请选择下拉项",
            request: {
              service: "{{ queryBaidu }}",
              params: "123",
            },
            showSearch: true,
            filterOption: false,
            onSearch: "{{ str => $self.componentProps.request.params = str }}",
          },
          "x-reactions": "{{ useAsyncDataSource }}",
        },
      },
    },
  },
};
