import request from "../helper/request";
import fetch from "../helper/fetch";

type TSelectRemoteParams = {
  url: string;
  method: "GET" | "POST";
};

/**
 * 获取xrender select下拉项通用接口
 * @deprecated
 */
export const getSelectRemoteOptions = ({
  url,
  method,
  ...rest
}: TSelectRemoteParams) => {
  return request({
    url: url,
    credentials: "include",
    method: method,
    data: rest,
  });
};

//校验表名是否唯一
export const validateTableName = (params: { tableName: string }) => {
  return request({
    url: "/uniqueValidate",
    credentials: "include",
    method: "GET",
    params,
  });
};

/**
 * 百度搜索
 * @param keyword 搜索关键字
 */
export const queryBaidu = (keyword: string) => {
  const params = { wd: keyword, prod: "pc" };
  return fetch("/api/sugrec", { params }, true).then((res: any) =>
    res?.g.map((item: any) => ({ label: item.q, value: item.q }))
  );
};

/**
 * 腾讯地图搜素
 */
export const queryTencent = (keyword: string) => {
  const params = {
    key: "L6QBZ-UDFCQ-G6T5R-4D5KA-MV6BV-THFZJ",
    keyword,
  };
  return fetch("/mock/ws/place/v1/suggestion", { params }, true).then((res) =>
    res?.data.map((item: any) => ({ label: item.title, value: item.id }))
  );
};

/**
 * mock select options
 */
export const queryMockOptions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [
          { label: "全部", value: 0 },
          { label: "自营", value: 1 },
          { label: "POP", value: 2 },
        ],
      });
    }, 1000);
  });
};
