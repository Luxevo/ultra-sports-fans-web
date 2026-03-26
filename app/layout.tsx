import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ultra Sports Fans — Le chat des vrais fans",
  description: "Suis tes matchs NHL, NBA et NFL en temps réel. Réagis, discute et vis le sport avec des milliers de fans.",
  keywords: "NHL, NBA, NFL, hockey, basketball, football, chat, sports, fans, live",
  openGraph: {
    title: "Ultra Sports Fans",
    description: "Le chat des vrais fans. NHL · NBA · NFL.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className={poppins.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
