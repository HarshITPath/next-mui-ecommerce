"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/utils/theme";
import Appbar from "@/components/app-bar";
import Footer from "@/components/footer";
import { HEADER_HEIGHT } from "@/utils/constant";
import { AuthProvider } from "@/utils/authContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>E-commerce</title>
      </head>
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <Appbar />
            <div style={{ height: HEADER_HEIGHT }}></div>
            <div>{children}</div>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
