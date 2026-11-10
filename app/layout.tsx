import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  title: 'StitchCraft — Amigurumi Companion & Pattern Studio',
  description: 'A specialized amigurumi companion web application featuring hands-free voice-controlled row counters, video walkthrough patterns, safety eye comparison matrix, and automatic yarn resizer.',
  openGraph: {
    title: 'StitchCraft — Amigurumi Companion & Pattern Studio',
    description: 'A specialized amigurumi companion web application featuring hands-free voice-controlled row counters, video walkthrough patterns, safety eye comparison matrix, and automatic yarn resizer.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased transition-colors duration-200">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
