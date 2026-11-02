import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#b91c1c',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'నేటి భారతం న్యూస్ (Neti Bharatham News) - Telugu, Hindi & English Portal',
  description: 'నేషనల్, స్టేట్, డిస్ట్రిక్ట్ & మండల వార్తలు, వీడియో బులెటిన్లు మరియు ప్రకటనలు - ప్రజా గొంతుక నిష్పక్షపాత వార్తలు.',
  applicationName: 'నేటి భారతం',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'నేటిభారతం',
  },
  icons: {
    icon: '/assets/aistudio/___________Tricolour_News_Logo__1__1507f5db.png',
    apple: '/assets/aistudio/___________Tricolour_News_Logo__1__1507f5db.png',
  },
  openGraph: {
    title: 'నేటి భారతం న్యూస్ - Neti Bharatham',
    description: 'హైపర్‌లోకల్ మండల వార్తలు, రాష్ట్ర, జాతీయ వార్తలు మరియు ప్రత్యక్ష వీడియోలు.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="te" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-red-700 selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
