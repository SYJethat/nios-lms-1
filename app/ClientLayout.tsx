'use client';

import { AuthProvider } from '@/contexts/AuthContext';
// import AccessibilityBar from '@/components/AccessibilityBar';
// import ChatbotToggle from '@/components/ChatbotToggle';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <AuthProvider>
      <>
        
        {/* <ChatbotToggle /> */}
        <main id="main" tabIndex={-1} aria-label="Main content">
          {children}
        </main>
      </>
    </AuthProvider>
  );
}
