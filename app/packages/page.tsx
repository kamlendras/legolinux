import type { Metadata } from "next";
import '@fontsource/roboto/700.css';
import { Suspense } from "react";
import Packages from "../components/packages"

export const metadata: Metadata = {
  title: "Lego Linux | Packages",
  description: "Lego Linux",
   icons: {
    icon: '/icons/blue-favicon.ico', 
  },
};

function LoadingFallback() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#202124',
      color: '#e8eaed',
    }}>
      <div className="loading-spinner" style={{
        width: '40px',
        height: '40px',
        border: '4px solid #3c4043',
        borderTop: '4px solid #8ab4f8',
        borderRadius: '50%',
        marginBottom: '16px'
      }} />
      <div style={{ color: '#9aa0a6', fontSize: '20px', fontWeight: 500 }}>
        Loading packages...
      </div>
    </div>
  );
}

export default function RootLayout() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Packages/>
    </Suspense>
  );
}
