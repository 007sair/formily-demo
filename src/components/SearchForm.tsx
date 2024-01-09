/**
 * 基于 Formily 的表单渲染器.
 * 用于渲染 CURD 中“查询”表单的模块，该模块具有以下特定：
 *  1.三列Grid布局展示
 *  2.提交、重置按钮跟随在最后一项后面，且与表单控件对齐（空出label的位置）
 *
 * TODO: 根据业务需要可能会扩展此组件内部功能
 */
import { Button, Space } from "antd";
import { createForm, isVoidField } from "@formily/core";
import {
  Form,
  FormGrid,
  FormItem,
  Input,
  Select,
  DatePicker,
} from "@formily/antd-v5";
import {
  createSchemaField,
  ISchema,
  ISchemaFieldProps,
  useForm,
} from "@formily/react";
import styled from "styled-components";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { useState } from "react";
import type { Form as IForm } from "@formily/core";

const FormStyled = styled(Form)`
  display: flex;
  align-items: flex-start;
  > form {
    display: block;
    position: relative;
    width: 100%;
    margin: -10px 0;
    .ant-formily-item {
      margin: 5px 24px 5px 0;
    }
  }
`;

/**
 * 展开收起时需要配置在 schema 的字段，如果有配置该字段，页面会展示 “展开收起” 按钮
 * e.g.:
 * const schema = {
 *   type: 'object',
 *   properties: {
 *     name: {},
 *     age: {},
 *     __extra: {
 *       type: 'void',
         'x-visible': false,
 *     }
 *   }
 * }
 * 上面 schema 中的 name、age 会始终显示，包裹在 __extra 中的配置将会出现在 展开收起 中
 *
 */
const ExtraField = "__extra";

const ActionButtons = () => {
  const form = useForm();
  const [expand, setExpand] = useState(false);

  const toggle = () => {
    setExpand(!expand);
    form
      .query(ExtraField)
      .take()
      ?.setState((state) => (state.visible = !state.visible));
  };

  const extraField = form.query(ExtraField).take();
  const hasExtraConfig = !!(extraField && isVoidField(extraField));

  return (
    <Space>
      <Button htmlType="submit" type="primary">
        提交
      </Button>
      <Button onClick={() => form.reset()}>重置</Button>
      {hasExtraConfig && (
        <Button type="link" onClick={toggle}>
          {!expand ? "展开" : "收起"}
          {expand ? <UpOutlined /> : <DownOutlined />}
        </Button>
      )}
    </Space>
  );
};

const SchemaField = createSchemaField({
  // 注意：如果props的schema使用了这里没有的组件，需要先注册
  components: {
    Input,
    Select,
    FormItem,
    FormGrid,
    ActionButtons,
    DatePicker,
  },
});

type Props = ISchemaFieldProps & {
  form?: IForm;
  onSubmit?: (values: any) => void;
  children?: React.ReactNode;
};

const SearchForm = (props: Props) => {
  const { onSubmit, form, ...rest } = props;
  const _form = form || createForm();
  const properties = rest.schema?.properties as object;

  const _schema: ISchema = {
    type: "object",
    properties: {
      grid: {
        type: "void",
        "x-component": "FormGrid",
        "x-component-props": {
          minColumns: 3,
          maxColumns: 3,
          columnGap: 10,
        },
        properties: {
          ...properties,
          btns: {
            type: "void",
            title: " ",
            "x-decorator": "FormItem",
            "x-component": "ActionButtons",
          },
        },
      },
    },
  };

  return (
    <FormStyled form={_form} labelCol={6} onAutoSubmit={onSubmit}>
      {rest.schema ? (
        <SchemaField {...rest} schema={_schema} />
      ) : (
        props.children
      )}
    </FormStyled>
  );
};

export default SearchForm;
