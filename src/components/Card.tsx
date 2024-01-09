import { connect, mapProps } from "@formily/react";
import { Card as AntdCard } from "antd";

const Card = connect(
  AntdCard,
  mapProps({
    title: "title",
  })
);

export default Card;
