import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Florida Real Estate Broker',
  description: 'Find your dream home or commercial property in Florida',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
