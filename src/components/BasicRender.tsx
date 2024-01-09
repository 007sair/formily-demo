/**
 * 所有 demo 通用的 form 渲染组件
 * -------------
 * 这样后续的 story 就不需要写组件了，直接传入 schema 配置即可
 */

import { createForm } from "@formily/core";
import { ISchemaFieldProps } from "@formily/react";
import { Form, Submit } from "@formily/antd-v5";
import { useMemo } from "react";
import { SchemaField } from "./SchemaField";

type Props = ISchemaFieldProps & {
  hiddenSubmit?: boolean;
  onSubmit: (values: unknown) => void;
};

/**
 * Formily demos
 */
function BasicRender({ onSubmit, hiddenSubmit, ...schemaFieldProps }: Props) {
  const { schema, ...rest } = schemaFieldProps;

  const form = useMemo(() => {
    console.log("schema", schema);
    return createForm();
  }, [schema]);

  return (
    <Form form={form} onAutoSubmit={onSubmit}>
      <SchemaField schema={schema} {...rest} />
      {!hiddenSubmit && <Submit>提交</Submit>}
    </Form>
  );
}

export default BasicRender;
