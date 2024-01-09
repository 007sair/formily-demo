/**
 * Basic SchemaField
 */
import { createSchemaField } from "@formily/react";
import {
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
  FormLayout,
} from "@formily/antd-v5";
import ActionButtons from "@/components/ActionButtons";
import Card from "@/components/Card";

const formTab = FormTab.createFormTab();

export const SchemaField = createSchemaField({
  components: {
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
    ActionButtons,
    Checkbox,
    Card,
    ArrayItems,
    FormTab,
    Switch,
    FormLayout,
  },
  scope: {
    formTab,
  },
});
