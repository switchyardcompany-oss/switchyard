import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keentel CMS",
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: [{ url: "/images/Favicon/kgc-sharp.svg?v=9", type: "image/svg+xml", sizes: "any" }],
    shortcut: "/images/Favicon/kgc-sharp.svg?v=9",
  },
};

export default function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
