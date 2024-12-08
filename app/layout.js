import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
// import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/context/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: `Page Title here`,
  description: "Enter Description Here",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn("antialiased dark:bg-black bg-white", inter.className)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          {/* <Footer /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
