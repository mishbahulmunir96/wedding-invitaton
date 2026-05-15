import NuqsProvider from "@/providers/NuqsProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import type { Metadata } from "next";
import { Cormorant_Garamond, Dancing_Script, Jost, Tangerine } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-jost",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dancing",
});

const tangerine = Tangerine({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-tangerine",
});

export const metadata: Metadata = {
  title: "Undangan Pernikahan | Mishbahul Munir & Kuni Sa'adati",
  description:
    "Dengan penuh sukacita, kami mengundang Anda untuk merayakan pernikahan kami.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${cormorant.variable} ${jost.variable} ${dancing.variable} ${tangerine.variable} antialiased`}
      >
        <NuqsProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
          <ToastContainer
            position="top-center"
            theme="dark"
            autoClose={3000}
          />
        </NuqsProvider>
      </body>
    </html>
  );
}
