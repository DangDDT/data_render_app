import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import zipPack from "vite-plugin-zip-pack";
import { resolve } from "path";
// @ts-expect-error defineConfig
export default defineConfig(async ({ mode }) => {
  const config = {
    base: "/", // Đường dẫn cơ sở của ứng dụng
    server: {
      cors: false,
    },
    plugins: [
      react({ tsDecorators: true }),
      zipPack({
        inDir: resolve(__dirname, "dist"),
        outDir: resolve(__dirname, "dist"),
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
        "@services": resolve(__dirname, "src/services/index.ts"),
        "@icons": resolve(__dirname, "src/components/icons/index.tsx"),
      },
    },
    build: {
      minify: "terser",
      chunkSizeWarningLimit: 1024 * 10 * 10,
      assetsDir: "assets", // Thư mục lưu trữ tệp tĩnh sau khi xây dựng
      manifest: true,
      outDir: "dist", // Thư mục lưu trữ tệp xây dựng
    },
    optimizeDeps: {
      include: ["esm-dep > cjs-dep"],
    },
  };
  return config;
});
