import { Typography } from "antd";

const { Title, Paragraph } = Typography;

type Props = {
  paragraph: string[];
};

export default function DemoWrapper({ paragraph }: Props) {
  return (
    <>
      <Title level={3} style={{ marginTop: 0 }}>
        Introduction
      </Title>
      {paragraph.map((p) => (
        <Paragraph key={p}>{p}</Paragraph>
      ))}
      <Title level={3} style={{ marginTop: 0 }}>
        Demo
      </Title>
    </>
  );
}
