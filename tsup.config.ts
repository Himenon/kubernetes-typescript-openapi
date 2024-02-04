import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src"],
  minify: false,
  target: "es2022",
  format: ["esm"],
  clean: true,
  dts: true,
  tsconfig: "./tsconfig.json",
  sourcemap: false,
  treeshake: false,
});
