/// <reference types="vite/client" />

/**
 * 自定义环境变量类型声明
 */
interface ImportMetaEnv {
  readonly VITE_BASIC_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
