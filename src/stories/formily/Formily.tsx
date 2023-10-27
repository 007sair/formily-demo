import { createForm, registerValidateFormats } from "@formily/core";
import { ISchema, createSchemaField, Field } from "@formily/react";
import {
  Form,
  FormItem,
  Input,
  SelectTable,
  Select,
  ArrayTable,
  Password,
  NumberPicker,
  Radio,
  Editable,
  Submit,
  DatePicker,
  FormCollapse,
  FormGrid,
  Space,
  PreviewText,
  Checkbox,
  ArrayItems,
  FormTab,
  Switch,
} from "@formily/antd-v5";
import type { FormProps } from "@formily/antd-v5";
import AsyncSelect from "@/components/AsyncSelect";
import { useMemo } from "react";
import ActionButtons from "@/components/ActionButtons";
import Card from "@/components/Card";

const formTab = FormTab.createFormTab();

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    AsyncSelect,
    SelectTable,
    Select,
    ArrayTable,
    Password,
    NumberPicker,
    Radio,
    Editable,
    Submit,
    DatePicker,
    FormCollapse,
    FormGrid,
    Space,
    PreviewText,
    ActionButtons,
    Checkbox,
    Card,
    ArrayItems,
    FormTab,
    Switch,
  },
  scope: {
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
    formTab,
  },
});

registerValidateFormats({
  custom_format: /123/,
  cronExpressionPattern:
    "^\\s*($|#|\\w+\\s*=|(\\?|\\*|(?:[0-5]?\\d)(?:(?:-|\\/|\\,)(?:[0-5]?\\d))?(?:,(?:[0-5]?\\d)(?:(?:-|\\/|\\,)(?:[0-5]?\\d))?)*)\\s+(\\?|\\*|(?:[0-5]?\\d)(?:(?:-|\\/|\\,)(?:[0-5]?\\d))?(?:,(?:[0-5]?\\d)(?:(?:-|\\/|\\,)(?:[0-5]?\\d))?)*)\\s+(\\?|\\*|(?:[01]?\\d|2[0-3])(?:(?:-|\\/|\\,)(?:[01]?\\d|2[0-3]))?(?:,(?:[01]?\\d|2[0-3])(?:(?:-|\\/|\\,)(?:[01]?\\d|2[0-3]))?)*)\\s+(\\?|\\*|(?:0?[1-9]|[12]\\d|3[01])(?:(?:-|\\/|\\,)(?:0?[1-9]|[12]\\d|3[01]))?(?:,(?:0?[1-9]|[12]\\d|3[01])(?:(?:-|\\/|\\,)(?:0?[1-9]|[12]\\d|3[01]))?)*)\\s+(\\?|\\*|(?:[1-9]|1[012])(?:(?:-|\\/|\\,)(?:[1-9]|1[012]))?(?:L|W)?(?:,(?:[1-9]|1[012])(?:(?:-|\\/|\\,)(?:[1-9]|1[012]))?(?:L|W)?)*|\\?|\\*|(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(?:(?:-)(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC))?(?:,(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(?:(?:-)(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC))?)*)\\s+(\\?|\\*|(?:[0-6])(?:(?:-|\\/|\\,|#)(?:[0-6]))?(?:L)?(?:,(?:[0-6])(?:(?:-|\\/|\\,|#)(?:[0-6]))?(?:L)?)*|\\?|\\*|(?:MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-)(?:MON|TUE|WED|THU|FRI|SAT|SUN))?(?:,(?:MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-)(?:MON|TUE|WED|THU|FRI|SAT|SUN))?)*)(|\\s)+(\\?|\\*|(?:|\\d{4})(?:(?:-|\\/|\\,)(?:|\\d{4}))?(?:,(?:|\\d{4})(?:(?:-|\\/|\\,)(?:|\\d{4}))?)*))$",
  slaTimePattern: "^(([0-1][0-9])|([2][0-3]))(:)[0-5][0-9]$",
});

type Props = FormProps & {
  onSubmit: (values: any) => void;
  schema: ISchema;
};

/**
 * Formily demos
 */
function FormilyRender({ schema, onSubmit, ...formProps }: Props) {
  const form = useMemo(() => createForm(), [schema]);
  return (
    <>
      <Form
        form={form}
        style={{ width: 600 }}
        {...formProps}
        onAutoSubmit={onSubmit}
      >
        <SchemaField schema={schema} />
      </Form>
    </>
  );
}

export default FormilyRender;
