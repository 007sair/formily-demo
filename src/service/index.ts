import request from "../helper/fetch";

const isDev = import.meta.env.MODE === "development";

/**
 * request函数默认返回响应体的data字段数据
 * 给request第3个参数设置true后，将返回响应体全量数据
 */
const USE_FULL_DATA = true;

/**
 * 百度搜索
 * @param keyword 搜索关键字
 */
type BaiduRes = {
  g?: Array<{ q: string }>;
};
export const queryBaidu = (keyword: string) => {
  const params = { wd: keyword, prod: "pc" };
  return request<BaiduRes>(
    "/sugrec",
    { baseURL: "/api", params },
    USE_FULL_DATA
  ).then((res) => res.g?.map((item) => ({ label: item.q, value: item.q })));
};

/**
 * 腾讯地图搜素
 */
type TencentRes = {
  data?: Array<{ title: string; id: string }>;
};
export const queryTencent = (keyword: string) => {
  const params = {
    key: "L6QBZ-UDFCQ-G6T5R-4D5KA-MV6BV-THFZJ",
    keyword,
  };
  return request<TencentRes>(
    "/ws/place/v1/suggestion",
    { baseURL: "/mock", params },
    USE_FULL_DATA
  ).then((res) =>
    res.data?.map((item) => ({ label: item.title, value: item.id }))
  );
};

/**
 * Github 搜索仓库
 * @usage https://api.github.com/search/repositories?q={query}{&page,per_page,sort,order}
 * @param params
 * @returns
 */
type GithubRepRes = {
  total_count: number;
  incomplete_results: boolean;
  items: Array<{ id: number; full_name: string }>;
};

export const queryRepositories = (params: { q: string }) => {
  return request<GithubRepRes>(
    "/search/repositories",
    { baseURL: isDev ? "/github" : "", params },
    USE_FULL_DATA
  ).then((res) =>
    res?.items.map((item) => ({ label: item.full_name, value: item.id }))
  );
};
