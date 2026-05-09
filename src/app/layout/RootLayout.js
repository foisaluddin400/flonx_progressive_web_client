import localFont from "next/font/local";
import "./globals.css";
import ReduxProvider from "@/provider/ReduxProvider";

const style = localFont({
  src: "../../font/Nunito-VariableFont_wght.ttf",
  variable: "--font-style",
});

export const metadata = {
  title: "Flonx App",
  description: "E-commerce",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="product">
      <body
        className={`${style.variable} bg-white antialiased`}
      >
        <ReduxProvider>
            <div className="max-w-[1400px] m-auto font-style text-black">{children}</div>
        </ReduxProvider>
      </body>
    </html>
  );
}
