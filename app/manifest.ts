import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ChatBuddy - 社交英文互動學習",
    short_name: "ChatBuddy",
    description: "用真實情境練習，勇敢和外國朋友開口聊天吧！",
    start_url: "/",
    display: "standalone",
    background_color: "#FBF4E8",
    theme_color: "#84cc16",
    orientation: "portrait",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
