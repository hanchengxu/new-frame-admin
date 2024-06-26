/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_AXIOS_TIMEOUT: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
