import { Field, FormPath, createForm } from "@formily/core";
import { ISchema, createSchemaField } from "@formily/react";
import {
  Form,
  FormItem,
  Submit,
  Input,
  Select,
  Radio,
  Checkbox,
} from "@formily/antd-v5";
import type { FormProps } from "@formily/antd-v5";
import DynamicSelect from "./DynamicSelect";
import { useMemo } from "react";
import { queryBaidu, queryTencent, queryRepositories } from "@/service";
import { action, observe } from "@formily/reactive";
import http from "@/helper/fetch";
import { debounce } from "lodash";

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Select,
    DynamicSelect,
    Submit,
    Input,
    Radio,
    Checkbox,
  },
});

type Props = FormProps & {
  onSubmit: (values: unknown) => void;
  schema: ISchema;
};

type RequestConfig = {
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  params: string | number | Record<string, unknown>;
  staticParams?: string | number | Record<string, unknown>;
  format?: (data: unknown) => [];
  allData?: boolean;
  silent?: boolean;
  service?: (params: unknown) => Promise<unknown>;
};

const sameType = (a: unknown, b: unknown) => {
  const type2str = (v: unknown) => Object.prototype.toString.call(v);
  return type2str(a) === type2str(b);
};

const disposers: Record<string, () => void> = {};

const useAsyncDataSource = (field: Field) => {
  const request = field.componentProps.request as RequestConfig;
  const { url, method, format, allData = true, silent = true } = request;
  const fieldPath = FormPath.parse(field.address.entire).toString();

  const getParams = () => {
    const { params, staticParams } = request;
    if (typeof params === "object") {
      if (
        typeof staticParams !== "undefined" &&
        !sameType(params, staticParams)
      ) {
        throw new Error("params 与 staticParams 的类型不一致");
      }
      return { ...(staticParams as object), ...params };
    }
    // 非对象类型的参数优先使用参数，没有时使用静态参数
    return params || staticParams;
  };

  // 返回的options会受fieldNames影响，不一定是label、value，但一定是数组
  const getOptions = (data: unknown): any[] => {
    try {
      let _options;
      if (!format) {
        _options = data;
      }
      if (typeof format === "function") {
        _options = format(data);
      }
      if (!Array.isArray(_options) && !silent) {
        throw new Error(`转换options失败，options不是数组`);
      }
      return Array.isArray(_options) ? _options : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const asyncLoader = (params: unknown): Promise<unknown> => {
    if (typeof request.service === "function") {
      return request.service(params);
    }
    return http(url, { method: method || "GET", params }, allData);
  };

  const loadData = () => {
    const params = getParams();
    field.loading = true;
    return asyncLoader(params)
      .then(
        action.bound?.((res: unknown) => {
          field.dataSource = getOptions(res);
        })
      )
      .catch((err: unknown) => {
        !silent && console.log(err);
      })
      .finally(() => {
        field.loading = false;
        typeof disposers[fieldPath] === "function" && disposers[fieldPath]();
      });
  };

  if (!field.dataSource) {
    loadData();
  }

  disposers[fieldPath] = observe(request, debounce(loadData, 300));
};

function Demo({ schema, onSubmit, ...formProps }: Props) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const form = useMemo(() => createForm(), [schema]); // schema dep: 用于storybook下修改schema时使用
  return (
    <div style={{ maxWidth: 600 }}>
      <Form form={form} {...formProps} onAutoSubmit={onSubmit}>
        <SchemaField
          schema={schema}
          scope={{
            queryBaidu,
            queryTencent,
            queryRepositories,
            useAsyncDataSource,
          }}
        />
        <div>
          <Submit>提交</Submit>
        </div>
      </Form>
    </div>
  );
}

export default Demo;
