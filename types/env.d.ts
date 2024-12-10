/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 网站标题 */
  readonly VITE_APP_TITLE: string
  /** 站点根目录 */
  readonly VITE_BASE_URL: string
  /** api接口请求路径 */
  readonly VITE_BASE_API_URL: string
  /** 基础代理路径 */
  readonly VITE_BASE_PROXY_URL: string

}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
