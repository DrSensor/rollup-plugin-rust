import { Config } from "@stencil/core";
import rust from "rollup-plugin-rust";

export const config: Config = {
  namespace: "mycomponent",
  outputTargets: [
    {
      type: "dist"
    },
    {
      type: "www",
      serviceWorker: null
    }
  ],
  plugins: [rust({ export: "instance" })]
};
