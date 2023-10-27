import { useRequest } from "ahooks";
import { Select, notification } from "antd";
import { useCallback, useEffect, useState } from "react";
import { isPlainObject } from "lodash";
import { getSelectRemoteOptions } from "../service/index";

//todo: 拿到接口的值不能直接作为下拉项

export default function AsyncSelect(props: any) {
  const { custom, value, onChange, ...rest } = props;
  const { url, params, requestMethod, formatData, ready } = custom || {};

  const commonParams: any = {
    pipelineId: "cb7cb23d55694476b6f2cc1e10039461",
    martCode: "dew",
  };

  const [options, setOptions] = useState<any>([]);

  const { run: loadOptions, loading } = useRequest(getSelectRemoteOptions, {
    manual: true,
    ready: typeof ready === "undefined" ? true : !!ready,
    onSuccess: (data) => {
      const options = formatData(data);

      /**
       * 返回的数据并不一定能直接作为下拉项使用，存在一定的层级关系
       * 根据option相对于data解析option
       * 当不存在相对路径或者相对路径为data时，option即为data
       */
      // if (!optionPath || optionPath === "data") {
      //   setOptions(data);
      // } else if (eval(optionPath)) {
      //   //data[0].component
      //   setOptions(eval(optionPath));
      // } else {
      //   console.log("路径错误");
      // }

      setOptions(options);
    },
    onError: (err) => {
      notification.error({
        message: "接口请求失败",
        description: err.message,
      });
    },
  });

  //解析请求参数
  const parseRequestParams = useCallback(() => {
    if (params) {
      const res = {};
      //普通参数
      if (params["static"] && isPlainObject(params["static"])) {
        Object.assign(res, params["static"]);
      }
      //表单参数
      if (params["form"] && isPlainObject(params["form"])) {
        Object.assign(res, params["form"]);
      }
      //系统参数
      if (params["public"] && isPlainObject(params["public"])) {
        Object.entries(params["public"]).forEach(([key, value]) => {
          if (commonParams.hasOwnProperty(value as string)) {
            Object.assign(res, { [key]: commonParams[value as string] });
          }
        });
      }
      return res;
    } else {
      return [];
    }
  }, [params]);

  //数据回显
  useEffect(() => {
    const _params = parseRequestParams();
    value && loadOptions({ ..._params, url, method: requestMethod || "POST" });
  }, [props]);

  const onDropdownVisibleChange = (open: boolean) => {
    if (open) {
      const params = parseRequestParams();
      loadOptions({ ...params, url, method: requestMethod || "POST" });
    }
  };

  // const onSearch = (value: string) => {
  //   if (!searchKey) return;
  //   const params = parseRequestParams();
  //   loadOptions({
  //     ...params,
  //     url,
  //     method: requestMethod || "POST",
  //     [searchKey]: value,
  //   });
  // };

  return (
    <Select
      loading={loading}
      style={{ width: "100%" }}
      value={value}
      onDropdownVisibleChange={onDropdownVisibleChange}
      options={options}
      onChange={(value) => {
        props.onChange(value);
      }}
      {...rest}
    />
  );
}
