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
          title: "百度搜formily",
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
          title: "百度搜索",
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
        search_word_multiple: {
          type: "string",
          title: "百度搜索（多选）",
          "x-decorator": "FormItem",
          "x-component": "Select",
          "x-component-props": {
            mode: "multiple",
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
        github_search_topics: {
          type: "string",
          title: "Github Search Topics",
          "x-decorator": "FormItem",
          "x-component": "Select",
          "x-component-props": {
            mode: "multiple",
            style: { width: 300 },
            placeholder: "请选择下拉项",
            request: {
              url: "/github/search/topics",
              params: {
                q: "react",
              },
              format: "{{ res => res?.items }}",
            },
            fieldNames: {
              label: "display_name",
              value: "name",
            },
            showSearch: true,
            filterOption: false,
            onSearch:
              "{{ str => { str ? $self.componentProps.request.params.q = str : $self.dataSource = [] } }}",
          },
          "x-reactions": "{{ useAsyncDataSource }}",
        },
      },
    },
  },
};
