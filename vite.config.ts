import { defineConfig } from "vite";

const removeModuleCrossorigin = () => {
  return {
    name: "no-attribute",
    transformIndexHtml(html: string) {
      return html.replace(`type="module" crossorigin `, "");
    },
  };
};

export default defineConfig({
  plugins: [removeModuleCrossorigin()],
  base: "./",
  build: {
    minify: false,
  },
});
