import request from "../helper/fetch";

/**
 * request函数默认返回响应体的data字段数据
 * 给request第3个参数设置true后，将返回响应体全量数据
 */
const USE_FULL_DATA = true;

/**
 * 腾讯地图搜素
 */
type TencentRes = {
  data?: Array<{ address: string; id: string }>;
};
export const queryAddress = (keyword: string) => {
  const params = { key: "L6QBZ-UDFCQ-G6T5R-4D5KA-MV6BV-THFZJ", keyword };
  return request<TencentRes>(
    "/ws/place/v1/suggestion",
    { params },
    USE_FULL_DATA
  ).then((res) =>
    res.data?.map(({ address, id }) => ({ label: address, value: id }))
  );
};
