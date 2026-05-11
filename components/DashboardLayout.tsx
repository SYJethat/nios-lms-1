"use client";
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';
import { ShieldX } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  allowedRoles?: string[]; // e.g. ['teacher'] or ['admin']
}

export default function DashboardLayout({
  children,
  title = 'Dashboard',
  subtitle,
  allowedRoles,
}: DashboardLayoutProps) {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Protect role-specific dashboards
    const rolePaths = ['learner', 'teacher', 'admin', 'parent'];
    const currentPathRole = pathname.split('/')[2]; // assumes /dashboard/[role]

    if (pathname.startsWith('/dashboard/') && rolePaths.includes(currentPathRole)) {
      if (user?.role !== currentPathRole) {
        router.replace(`/dashboard/${user?.role}`);
      }
    } else if (pathname === '/dashboard') {
      router.replace(`/dashboard/${user?.role || 'learner'}`);
    }

    // Protect /teacher/* routes → teacher only
    if (pathname.startsWith('/teacher/') && user?.role !== 'teacher') {
      router.replace(`/dashboard/${user?.role}`);
    }

    // Protect /admin/* routes → admin only
    if (pathname.startsWith('/admin/') && user?.role !== 'admin') {
      router.replace(`/dashboard/${user?.role}`);
    }
  }, [isAuthenticated, user, router, pathname]);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Block render if allowedRoles is set and user doesn't have permission
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 ml-[280px] min-h-screen flex flex-col items-center justify-center">
          <div className="text-center space-y-4 p-8">
            <div className="w-20 h-20 rounded-xl bg-blue-50 flex items-center justify-center mx-auto">
              <ShieldX size={36} className="text-blue-400" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Access Restricted</h2>
            <p className="text-slate-500 text-sm max-w-xs">
              This area is reserved for <span className="font-bold text-blue-600">{allowedRoles.join(' / ')}</span> accounts only.
            </p>
            <button
              onClick={() => router.replace(`/dashboard/${user.role}`)}
              className="mt-4 px-6 py-3 bg-slate-900 text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-blue-500 transition-all"
            >
              Go to My Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // redirect check for dashboard path mismatch (show spinner while redirecting)
  const isFeaturePath = ['ai-support'].includes(pathname.split('/')[2]);
  if (pathname.startsWith('/dashboard/') && !isFeaturePath && user?.role !== pathname.split('/')[2]) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-[280px] min-h-screen flex flex-col">
        <Topbar title={title} subtitle={`${user?.name || ''} · ${subtitle || ''}`} />
        <main id="main" tabIndex={-1} aria-label="Main dashboard content">
          <div className="p-8 flex-1">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
