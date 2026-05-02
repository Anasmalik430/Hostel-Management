import "./globals.css";
import { DataProvider } from "@/context/DataContext";

export const metadata = {
  title: "Elite Hostel Management",
  description: "Premium Living Reimagined",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <DataProvider>
          {children}
        </DataProvider>
      </body>
    </html>
  );
}
