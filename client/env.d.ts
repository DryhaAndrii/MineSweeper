/* eslint-disable spaced-comment */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_URL: string;
  // add other environment variables you need
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
