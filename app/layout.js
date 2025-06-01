import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ReduxProvider } from "@/redux/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PIXORA",
  description: "Pixora - An image editing web app",
  icons: {
    icon: "/logo2.png", 
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo2.png" />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} font-mono antialiased`}>
          <ReduxProvider>{children}</ReduxProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
