import { Inter } from "next/font/google";
import Nav from "../components/nav";
import '@/styles/globals.css'; 

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Nav></Nav>
      {children}
      </body>
    </html>
  );
}
