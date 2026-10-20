import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dimera",
    short_name: "Dimera",
    description:
      "A sophisticated digital sanctuary for ladies to explore, book, and experience premium salon services including precision haircuts, color artistry, and aesthetic nail and lash treatments.",
    start_url: "/",
    display: "standalone",
    theme_color: "#f7f4ee",
    background_color: "#f7f4ee",
    icons: [
      { src: "/icon.jpg", sizes: "512x512", type: "image/jpeg" },
    ],
  };
}
