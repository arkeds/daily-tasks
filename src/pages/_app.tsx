import "@fontsource/roboto/300.css";
import "src/global.styles.scss";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
