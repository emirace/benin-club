import Navbar from '@/components/Navbar';
import FooterSection from '@/sections/FooterSection';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Navbar />
      <Component {...pageProps} />
      <FooterSection />
    </div>
  );
}
