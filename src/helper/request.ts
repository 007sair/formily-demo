import { merge } from "lodash";
import qs from "query-string";

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export enum ContentType {
  json = "application/json",
  form = "application/x-www-form-urlencoded; charset=UTF-8",
}

/**
 * 封装 fetch 请求
 * @param config 配置项，类型继承自 `fetch`
 */

interface ReqConfig extends RequestInit {
  url: string;
  params?: Record<string, any>;
  data?: Record<string, any>;
}

const parseConfig = (config: ReqConfig) => {
  if (config.method === HttpMethod.GET) {
    return config;
  }
  return {
    method: HttpMethod.POST,
    body: JSON.stringify(config.data), // must match 'Content-Type' header
    ...config,
  };
};

export const baseURL = "http://rap2api.taobao.org/app/mock/297457";

export async function request<T>(config: ReqConfig): Promise<T> {
  const defaultConfig = {
    baseURL,
    method: HttpMethod.GET,
    headers: {
      "Content-Type": ContentType.json,
      "X-Requested-With": "XMLHttpRequest",
    },
    redirect: "manual",
  };
  //兼容上传需要去掉headers的情况
  const _config = config.headers
    ? { ...merge({}, defaultConfig, config), headers: config.headers }
    : merge({}, defaultConfig, config);

  const url = qs.stringifyUrl({
    url: _config.url.startsWith("/mock") ? _config.url : baseURL + _config.url,
    query: _config.params,
  });

  try {
    const res = await fetch(url, parseConfig(_config));
    if (!res.ok) {
      //请求失败，返回解析之后的失败的数据
      return Promise.reject({ code: res.status, message: res.statusText });
    }
    // const res = await fetch(url, parseConfig(_config));

    // if (!res.ok) {
    //   if (res.status === 401) {
    //     window.location.href = `${process.env.REACT_APP_LOGIN}?ReturnUrl=${encodeURI(window.location.href)}`;
    //   }
    //   // 请求失败，返回解析之后的失败的数据
    //   return Promise.reject({ code: res.status, message: res.statusText });
    // }

    const result = await res.json();

    if (result.status === 0) {
      return result;
    }
    return Promise.reject({
      code: result.code || -1,
      message: result.message || "接口请求失败",
    });
  } catch (error) {
    throw error;
  }
}

export default request;

export class CodeError extends Error {
  code: number;
  constructor(response: any) {
    super(response.message);
    this.name = "CodeError";
    this.code = response.code;
  }
}
