export const metadata = {
  title: 'Kasinolista.fi - Studio',
  description: 'Sisällönhallinta',
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fi">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
