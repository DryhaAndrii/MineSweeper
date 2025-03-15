/* eslint-disable spaced-comment */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_URL: string;
  // добавьте другие переменные окружения, которые вам нужны
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
