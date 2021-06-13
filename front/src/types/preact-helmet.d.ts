declare module "preact-helmet" {
  import { ComponentType, JSX } from "preact"

  export interface HelmetProperties {
    htmlAttributes?: JSX.HTMLAttributes<HTMLHtmlElement>
    title?: string
    titleTemplate?: string
    defaultTitle?: string
    titleAttributes?: JSX.HTMLAttributes<HTMLTitleElement>
    base?: JSX.HTMLAttributes<HTMLBaseElement>
    meta?: Array<JSX.HTMLAttributes<HTMLMetaElement>>
    link?: Array<JSX.HTMLAttributes<HTMLLinkElement>>
    script?: Array<JSX.HTMLAttributes<HTMLScriptElement>>
    noscript?: Array<JSX.HTMLAttributes<HTMLElement>>
    style?: Array<JSX.HTMLAttributes<HTMLStyleElement>>
  }

  const Helmet: ComponentType<HelmetProperties>
  export default Helmet
}
