export const metadata = { title: "ANKH Mining", description: "ANKH Mining Community - TON" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body style={{ margin: 0, background: "#000" }}>{children}</body>
    </html>
  );
}
