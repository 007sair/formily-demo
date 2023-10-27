/**
 * Basic
 */

import type { Story } from "../Dynamic.stories";

export const story_1: Story = {
  args: {
    schema: {
      type: "object",
      properties: {
        word: {
          type: "string",
          title: "基础下拉",
          "x-decorator": "FormItem",
          "x-component": "Select",
          "x-component-props": {
            style: { width: 300 },
            placeholder: "请选择下拉项",
            request: {
              url: "/api/sugrec",
              params: {
                wd: "formily",
                prod: "pc",
              },
              format: "{{ res => res?.g }}",
            },
            fieldNames: {
              label: "q",
              value: "q",
            },
          },
          "x-reactions": "{{ useAsyncDataSource }}",
        },
        search_word: {
          type: "string",
          title: "搜索下拉",
          "x-decorator": "FormItem",
          "x-component": "Select",
          "x-component-props": {
            style: { width: 300 },
            placeholder: "请选择下拉项",
            request: {
              url: "/api/sugrec",
              params: {
                wd: "formily",
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
      },
    },
  },
};
