import "./globals.css";
import { Anton, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { ZenosProvider } from "@/context/ZenosContext";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata = {
  title: "ZEN_OS — Powered by Dante",
  description: "Productivity Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" />
      </head>
      <body className={`${anton.variable} ${hanken.variable} ${jetbrains.variable}`}>
        <ZenosProvider>
          {children}
        </ZenosProvider>
      </body>
    </html>
  );
}
