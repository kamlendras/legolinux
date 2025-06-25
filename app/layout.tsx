import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/header"
import Footer from "./components/fotter";
export const metadata: Metadata = {
  title: "Lego Linux",
  description: "Lego Linux",
   icons: {
    icon: '/icons/default-favicon.ico', 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body > 
      <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
