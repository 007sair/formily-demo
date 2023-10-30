import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      base: ".",
      server: {
        proxy: {
          "/mock": {
            // https://lbs.qq.com/service/webService/webServiceGuide/webServiceSuggestion
            target: "https://apis.map.qq.com",
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/mock/, ""),
          },
          "/api": {
            target: "http://www.baidu.com/",
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ""),
          },
        },
      },
    });
  },
};
export default config;
