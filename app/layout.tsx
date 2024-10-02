// app/layout.tsx
import './globals.css'; // Import global CSS to apply Tailwind styles

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 p-4">
      <h1 className="text-2xl font-bold text-blue-600">AI Scholar Bot: Enhance Your Learning with Gemini</h1>
    </header>
  );
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>AI Scholar Bot</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-gray-100 pt-16"> {/* Add padding to prevent overlap with header */}
        <Header />
        {children}
      </body>
    </html>
  );
}
