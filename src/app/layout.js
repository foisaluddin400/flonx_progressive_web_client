import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from "./layout/ClientLayout";
import ReduxProvider from "@/provider/ReduxProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const style = localFont({
  src: "../font/Nunito-VariableFont_wght.ttf",
  variable: "--font-style",
});

export const metadata = {
  title: "Flonx App",
  description: "E-commerce",
  manifest: "/manifest.json",
  themeColor: "#0F0B1A",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Flonx App",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* PWA + Mobile support */}
        <meta name="application-name" content="Flonx App" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Flonx App" />
      </head>

      <body
        className={`${style.variable} antialiased bg-[#0F0B1A] text-white min-h-screen w-full`}
      >
        <ReduxProvider>
          <div className="font-style min-h-screen w-full bg-[#0F0B1A]">
            <ToastContainer
              position="top-center"
              autoClose={3000}
              pauseOnHover
            />

            <ClientLayout>{children}</ClientLayout>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}