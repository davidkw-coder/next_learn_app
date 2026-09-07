import "./globals.css";
import { inter } from "./ui/fonts";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}


export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="mb-6 text-4xl font-bold">
        Dashboard
      </h1>

      <Image
        src="/dashboard.png"
        alt="Dashboard preview"
        width={800}
        height={500}
      />
    </main>
  );
}