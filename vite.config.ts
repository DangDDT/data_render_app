import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import zipPack from "vite-plugin-zip-pack";
import { resolve } from "path";
// @ts-expect-error defineConfig
export default defineConfig(() => {
  const config = {
    base: "./", // Đường dẫn cơ sở của ứng dụng
    server: {
      cors: false,
    },
    plugins: [
      react({ tsDecorators: true }),
      zipPack({
        inDir: resolve(__dirname, "build"),
        outDir: resolve(__dirname, "output"),
        outFileName: `${__dirname.split("/").pop()}-${Date.now()}.zip`,
      }),
    ],
    resolve: {
      alias: {
        "@assets": resolve(__dirname, "src/assets/index.ts"),
        "@components": resolve(__dirname, "src/components"),
        "@common": resolve(__dirname, "src/components/common/index.ts"),
        "@animations": resolve(__dirname, "src/components/animations/index.ts"),
        "@contexts": resolve(__dirname, "src/contexts/index.ts"),
        "@enums": resolve(__dirname, "src/enums/index.ts"),
        "@hooks": resolve(__dirname, "src/hooks/index.ts"),
        "@layouts": resolve(__dirname, "src/layouts/index.ts"),
        "@models": resolve(__dirname, "src/models/index.ts"),
        "@pages": resolve(__dirname, "src/pages/index.ts"),
        "@providers": resolve(__dirname, "src/providers/index.ts"),
      },
    },
    build: {
      minify: "terser",
      chunkSizeWarningLimit: 1024 * 10 * 10,
      assetsDir: "assets", // Thư mục lưu trữ tệp tĩnh sau khi xây dựng
      manifest: true,
      outDir: "build", // Thư mục lưu trữ tệp xây dựng
    },
    optimizeDeps: {
      include: ["esm-dep > cjs-dep"],
    },
  };
  return config;
});
