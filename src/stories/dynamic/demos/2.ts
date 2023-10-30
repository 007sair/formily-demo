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
        value_with_function_by_gh: {
          type: "string",
          title: "搜索Github仓库",
          description: "service指定函数名，params独立配置，支持搜索",
          "x-decorator": "FormItem",
          "x-component": "Select",
          "x-component-props": {
            placeholder: "请选择下拉项",
            request: {
              service: "{{ queryRepositories }}",
              params: {
                q: "",
              },
            },
            showSearch: true,
            filterOption: false,
            onSearch:
              "{{ str => $self.componentProps.request.params.q = str }}",
          },
          "x-reactions": "{{ useAsyncDataSource }}",
        },
      },
    },
  },
};
