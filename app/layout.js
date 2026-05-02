import "./globals.css";
import { DataProvider } from "@/context/DataContext";
import { AuthProvider } from "@/context/AuthContext";
import WhatsAppWidget from "@/components/WhatsAppWidget";

export const metadata = {
  title: "Comfort Hostel BD",
  description: "Premium Living Reimagined",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <DataProvider>
            {children}
            <WhatsAppWidget />
          </DataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
