// 'use client';
// import {
//   HomeIcon,
//   BookOpen,
//   Video,
//   FileText,
//   Calendar,
//   MessageCircle,
//   Cpu,
//   BarChart2,
//   Award,
//   User,
//   Settings,
//   CreditCard,
//   LogOut,
//   Users,
//   ClipboardList,
//   Shield,
//   Briefcase,
//   UserPlus,
//   Globe,
//   Headphones,
//   BookCheck,
//   Server,
//   Zap,
//   AlertCircle,
//   GraduationCap,
//   Bell,
//   Megaphone,
//   ArrowBigDownDash
// } from 'lucide-react';
// import { usePathname, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import Image from 'next/image';
// import { useAuth } from '@/contexts/AuthContext';

// interface NavItem {
//   icon: any;
//   label: string;
//   href: string;
//   badge?: string;
// }

// export default function Sidebar() {
//   const { user, logout } = useAuth();
//   const pathname = usePathname();
//   const router = useRouter();

//   if (!user) return null;

//   const role = user.role;

//   const learnerNav: NavItem[] = [
//     { icon: <HomeIcon size={18} />, label: 'Dashboard', href: '/dashboard/learner' },
//     { icon: <BookOpen size={18} />, label: 'My Courses', href: '/courses' },
//     { icon: <Video size={18} />, label: 'Live Classes', href: '/live' },
//     { icon: <FileText size={18} />, label: 'Assessments', href: '/assessments', badge: '3' },
//     // { icon: <Calendar size={18} />, label: 'Schedule', href: '/student/schedule' },
//     { icon: <BookOpen size={18} />, label: 'Library', href: '/student/library' },
//     { icon: <BarChart2 size={18} />, label: 'Reports', href: '/report' },
//     // { icon: <Award size={18} />, label: 'Achievements', href: '/student/achievements' },
//     // { icon: <CreditCard size={18} />, label: 'Certificates', href: '/student/certificates' },
//     { icon: <MessageCircle size={18} />, label: 'Invoice', href: '/student/finance' },
//   ];

//   const teacherNav: NavItem[] = [
//     { icon: <HomeIcon size={18} />, label: 'Dashboard', href: '/dashboard/teacher' },
//     { icon: <Users size={18} />, label: 'My Students', href: '/teacher/students' },
//     { icon: <BookOpen size={18} />, label: 'My Classes', href: '/teacher/classes' },
//     { icon: <ClipboardList size={18} />, label: 'Gradebook', href: '/teacher/grades', badge: '38' },
//     { icon: <Shield size={18} />, label: 'Exams', href: '/teacher/exams', badge: '4' },
//     { icon: <FileText size={18} />, label: 'Reports', href: '/teacher/reports', badge: '2' },
//     { icon: <Zap size={18} />, label: 'Announcements', href: '/teacher/announcements', badge: 'New' },
//     { icon: <Cpu size={18} />, label: 'Faculty Hub', href: '/teacher/content' },
//   ];

//   const adminNav: NavItem[] = [
//     { icon: <HomeIcon size={18} />, label: 'Dashboard', href: '/dashboard/admin' },
//     { icon: <Users size={18} />, label: 'Teachers', href: '/admin/teachers', badge: 'New' },
//     { icon: <GraduationCap size={18} />, label: 'Students', href: '/admin/students', badge: 'New' },
//     { icon: <BookOpen size={18} />, label: 'Content Review', href: '/admin/content' },
//     { icon: <Bell size={18} />, label: 'Notifications', href: '/admin/notifications' },
//     { icon: <Megaphone size={18} />, label: 'Announcements', href: '/admin/announcements' },
//     { icon: <UserPlus size={18} />, label: 'Admissions', href: '/admin/admissions' },
//     { icon: <Globe size={18} />, label: 'Integrations', href: '/admin/integrations' },
//     { icon: <CreditCard size={18} />, label: 'Financial Ops', href: '/admin/finance' },
//     { icon: <Headphones size={18} />, label: 'Support & SLA', href: '/admin/support', badge: '12' },
//     { icon: <BookCheck size={18} />, label: 'Academic & Content', href: '/admin/academic' },
//     { icon: <Server size={18} />, label: 'System & Security', href: '/admin/system' },
//     { icon: <FileText size={18} />, label: 'Platform Reports', href: '/admin/reports' },
//     { icon: <Settings size={18} />, label: 'Site Settings', href: '/admin/settings' },
//   ];

//   const parentNav: NavItem[] = [
//     { icon: <HomeIcon size={18} />, label: 'Overview', href: '/dashboard/parent' },
//     { icon: <Users size={18} />, label: 'Student Bio', href: '/profile' },
//     { icon: <FileText size={18} />, label: 'Reports', href: '/dashboard/parent/reports', badge: '3' },
//     { icon: <AlertCircle size={18} />, label: 'Alerts', href: '/dashboard/parent/alerts', badge: 'New' },
//     { icon: <ClipboardList size={18} />, label: 'Activities', href: '/dashboard/parent/activities' },
//     { icon: <Calendar size={18} />, label: 'Attendance', href: '/dashboard/parent/attendance' },
//     { icon: <MessageCircle size={18} />, label: 'PT Meetings', href: '/dashboard/parent/ptm' },
//     { icon: <FileText size={18} />, label: 'TMA Feedback', href: '/dashboard/parent/tma' },
//     { icon: <CreditCard size={18} />, label: 'Fee Payment', href: '/dashboard/parent/fees' },
//   ];

//   const guestNav: NavItem[] = [
//     { icon: <HomeIcon size={18} />, label: 'Guest Portal', href: '/dashboard/guest' },
//     { icon: <BookOpen size={18} />, label: 'Public Catalog', href: '/courses' },
//   ];

//   const commonNav: NavItem[] = [
//      { icon: <Calendar size={18} />, label: 'Schedule', href: '/student/schedule' },
//     { icon: <MessageCircle size={18} />, label: 'Discussion', href: '/discussion', badge: '5' },
//     { icon: <Cpu size={18} />, label: 'AI Tutor', href: '/ai-tutor' },
//   ];

//   const progressNav: NavItem[] = [
//      { icon: <BarChart2 size={18} />, label: 'Analytics', href: '/student/analytics' },
//     { icon: <Award size={18} />, label: 'Achievements', href: '/achievements' },
//     { icon: <CreditCard size={18} />, label: 'Certificates', href: '/student/certificates' },

//   ];

//   const accountNav: NavItem[] = [
//     { icon: <User size={18} />, label: 'Profile', href: '/profile' },
//     { icon: <Settings size={18} />, label: 'Settings', href: '/settings' },
   
//   ];

//   const sections = [
//     { label: 'Main', items: role === 'learner' ? learnerNav : role === 'teacher' ? teacherNav : role === 'admin' ? adminNav : role === 'guest' ? guestNav : parentNav },
//     { label: 'Learning Tools', items: commonNav },
//     ...(role !== 'guest' ? [{ label: 'Performance', items: progressNav }] : []),
//     { label: 'Account', items: accountNav },
//   ];

//   const handleLogout = () => {
//     logout();
//     router.push('/login');
//   };

//   return (
//     <aside className="w-[280px] bg-white border-r border-slate-100 flex flex-col fixed left-0 top-0 bottom-0 z-50 transition-transform duration-300">
//       <Link href="/" className="block border-b border-slate-50">
//         <div className="p-6 flex flex-col items-center border-b border-slate-50">
//           <div className="flex items-center gap-4 mb-2">
//             <Image
//               src="/NIOS.png"
//               alt="NIOS Logo"
//               width={50}
//               height={50}
//               className="object-contain"
//             />
//             <div className="flex flex-col">
//               <div className="text-[10px] font-bold text-blue-900 leading-tight">
//                 राष्ट्रीय मुक्त विद्यालयी शिक्षा संस्थान
//               </div>
//               <div className="text-sm font-black text-blue-800 leading-tight">
//                 National Institute of <span className="text-blue-900">Open Schooling</span>
//               </div>
//             </div>
//           </div>
//           <div className="text-center">
//             <div className="text-[8px] text-slate-400 font-bold leading-tight uppercase tracking-tight">
//               (An autonomous institution under Ministry of Education, Govt. of India)
//             </div>
//             <div className="text-[9px] text-blue-900 font-black mt-1 uppercase tracking-widest">
//               AI-Poweblue LMS Portal
//             </div>
//           </div>
//         </div>
//       </Link>

//       <nav className="flex-1 overflow-y-auto px-6 py-8 space-y-8 scrollbar-hide">
//         {sections.map((section) => (
//           <div className="space-y-2" key={section.label}>
//             <div className="px-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 opacity-70">
//               {section.label}
//             </div>
//             <div className="space-y-1">
//               {section.items.map((item) => {
//                 const isActive = pathname === item.href;
//                 return (
//                   <Link href={item.href} key={item.href} className="block group">
//                     <div className={`flex items-center gap-3.5 px-4 py-2 rounded-xl text-sm transition-all duration-300 ${isActive
//                       ? 'bg-blue-50 text-blue-900 border border-blue-100/50 shadow-sm font-bold'
//                       : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
//                       }`}>
//                       <span className={`text-lg transition-transform duration-300 group-hover:scale-110 ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
//                         }`}>
//                         {item.icon}
//                       </span>
//                       <span className="flex-1 tracking-tight">{item.label}</span>
//                       {item.badge && (
//                         <span className="bg-blue-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
//                           {item.badge}
//                         </span>
//                       )}
//                     </div>
//                   </Link>
//                 );
//               })}
//             </div>
//           </div>
//         ))}
//       </nav>

//       <div className="p-6 mt-auto border-t border-slate-50">
//         <div className="bg-slate-50 p-2 rounded-xl flex items-center gap-3.5 hover:bg-white hover:shadow-lg hover:shadow-slate-200/50 transition-all group cursor-pointer border border-transparent hover:border-slate-100">
//           <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-red-500 flex items-center justify-center font-black text-white text-sm shadow-md transition-all duration-500">
//             {user.name.charAt(0)}
//           </div>
//           <div className="flex-1 min-w-0">
//             <div className="text-xs font-black text-slate-900 truncate">{user.name}</div>
//             <div className="text-[10px] font-bold text-slate-400 truncate tracking-tight uppercase">
//               {user.role} · {user.details.class || user.details.designation || 'Staff'}
//             </div>
//           </div>
//           <button onClick={handleLogout} className="flex items-center justify-center p-2 text-lg text-slate-400 hover:text-blue-900 transition-all">
//             <LogOut size={18} />
//           </button>
//         </div>
//       </div>
//     </aside>
//   );
// }


'use client';
import {
  HomeIcon,
  BookOpen,
  Video,
  FileText,
  Calendar,
  MessageCircle,
  Cpu,
  BarChart2,
  Award,
  User,
  Settings,
  CreditCard,
  LogOut,
  Users,
  ClipboardList,
  Shield,
  Briefcase,
  UserPlus,
  Globe,
  Headphones,
  BookCheck,
  Server,
  Zap,
  AlertCircle,
  GraduationCap,
  Bell,
  Megaphone,
  ArrowBigDownDash,
  ArrowBigDownDashIcon
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';

interface NavItem {
  icon: any;
  label: string;
  href: string;
  badge?: string;
}

export default function Sidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  if (!user) return null;

  const role = user.role;

  const learnerNav: NavItem[] = [
    { icon: <HomeIcon size={18} />, label: 'Dashboard', href: '/dashboard/learner' },
    { icon: <BookOpen size={18} />, label: 'My Courses', href: '/courses' },
    { icon: <Video size={18} />, label: 'Live Classes', href: '/live' },
    { icon: <FileText size={18} />, label: 'Assessments', href: '/assessments', badge: '3' },
    { icon: <FileText size={18} />, label: 'Analytics ', href: '/analytics', badge: '2' },
    // { icon: <Globe size={18} />, label: 'Course Setup', href: '/student/course-setup' },
    { icon: <Globe size={18} />, label: 'Learn Language', href: '/student/learn-language' },
    { icon: <ArrowBigDownDashIcon size={18} />, label: 'Guided Learning', href: '/student/tours' },

  ];

  const teacherNav: NavItem[] = [
    { icon: <HomeIcon size={18} />, label: 'Dashboard', href: '/dashboard/teacher' },
    { icon: <Users size={18} />, label: 'My Students', href: '/teacher/students' },
    { icon: <BookOpen size={18} />, label: 'My Classes', href: '/teacher/classes' },
   
    { icon: <ClipboardList size={18} />, label: 'Gradebook', href: '/teacher/grades', badge: '38' },
    { icon: <Shield size={18} />, label: 'Exams', href: '/teacher/exams', badge: '4' },
    { icon: <FileText size={18} />, label: 'Reports', href: '/teacher/reports', badge: '2' },
    { icon: <Cpu size={18} />, label: 'Faculty Hub', href: '/teacher/content' },
    { icon: <Zap size={18} />, label: 'Announcements', href: '/teacher/announcements', badge: 'New' },
    { icon: <Cpu size={18} />, label: 'AI Chatbot', href: '/chatbot' },
    { icon: <Headphones size={18} />, label: 'AI Support Tickets', href: '/teacher/tickets'  },
  
  ];

  const adminNav: NavItem[] = [
    { icon: <HomeIcon size={18} />, label: 'Dashboard', href: '/dashboard/admin' },
    { icon: <Users size={18} />, label: 'Teachers', href: '/admin/teachers', badge: 'New' },
    { icon: <GraduationCap size={18} />, label: 'Students', href: '/admin/students', badge: 'New' },
    { icon: <BookOpen size={18} />, label: 'Content Review', href: '/admin/content' },
    { icon: <BookOpen size={18} />, label: 'Course Setup ', href: '/admin/create-course' },
    { icon: <Bell size={18} />, label: 'Notifications', href: '/admin/notifications' },
    { icon: <Megaphone size={18} />, label: 'Announcements', href: '/admin/announcements' },
    { icon: <UserPlus size={18} />, label: 'Admissions', href: '/admin/admissions' },
    { icon: <Globe size={18} />, label: 'Integrations', href: '/admin/integrations' },
    { icon: <CreditCard size={18} />, label: 'Financial Ops', href: '/admin/finance' },
    { icon: <Headphones size={18} />, label: 'Support & SLA', href: '/admin/support', badge: '12' },
    { icon: <BookCheck size={18} />, label: 'Academic & Content', href: '/admin/academic' },
    { icon: <Server size={18} />, label: 'System & Security', href: '/admin/system' },
    { icon: <FileText size={18} />, label: 'Platform Reports', href: '/admin/reports' },
    { icon: <Settings size={18} />, label: 'Site Settings', href: '/admin/settings' },
  ];

  const parentNav: NavItem[] = [
    { icon: <HomeIcon size={18} />, label: 'Overview', href: '/dashboard/parent' },
    { icon: <Users size={18} />, label: 'Student Bio', href: '/profile' },
    { icon: <FileText size={18} />, label: 'Reports', href: '/dashboard/parent/reports', badge: '3' },
    { icon: <AlertCircle size={18} />, label: 'Alerts', href: '/dashboard/parent/alerts', badge: 'New' },
    { icon: <ClipboardList size={18} />, label: 'Activities', href: '/dashboard/parent/activities' },
    { icon: <Calendar size={18} />, label: 'Attendance', href: '/dashboard/parent/attendance' },
    { icon: <MessageCircle size={18} />, label: 'PT Meetings', href: '/dashboard/parent/ptm' },
    { icon: <FileText size={18} />, label: 'TMA Feedback', href: '/dashboard/parent/tma' },
    { icon: <CreditCard size={18} />, label: 'Fee Payment', href: '/dashboard/parent/fees' },
  ];

  const guestNav: NavItem[] = [
    { icon: <HomeIcon size={18} />, label: 'Guest Portal', href: '/dashboard/guest' },
    { icon: <BookOpen size={18} />, label: 'Public Catalog', href: '/courses' },
  ];

  const commonNav: NavItem[] = [
    { icon: <Calendar size={18} />, label: 'Schedule', href: '/schedule' },
    { icon: <BookOpen size={18} />, label: 'Library', href: '/student/library' },
    { icon: <MessageCircle size={18} />, label: 'Discussion', href: '/discussion', badge: '5' },
    { icon: <Cpu size={18} />, label: 'AI Tutor', href: '/ai-tutor' },
    { icon: <Headphones size={18} />, label: 'AI Support Tickets', href: role === 'teacher' || role === 'admin' ? '/teacher/tickets' : '/dashboard/ai-support' },
  ];

  const progressNav: NavItem[] = [
    { icon: <BarChart2 size={18} />, label: 'Reports', href: '/report' },
    { icon: <Award size={18} />, label: 'Achievements', href: '/achievements' },
    { icon: <CreditCard size={18} />, label: 'Certificates', href: '/student/certificates' },
  ];

  const accountNav: NavItem[] = [
    { icon: <User size={18} />, label: 'Profile', href: '/profile' },
    // { icon: <FileText size={18} />, label: 'Invoice', href: '/student/finance' },
     ...(role === 'learner'
    ? [{ icon: <FileText size={18} />, label: 'Invoice', href: '/student/finance' }]
    : []),
    { icon: <Settings size={18} />, label: 'Settings', href: '/settings' },
   
  ];

  const sections = [
    { label: 'Main', items: role === 'learner' ? learnerNav : role === 'teacher' ? teacherNav : role === 'admin' ? adminNav : role === 'guest' ? guestNav : parentNav },
    { label: 'Learning Tools', items: role === 'admin' || role === 'teacher' || role === 'parent' || role === 'guest' ? [] : commonNav },
    ...(role === 'learner' ? [{ label: 'Performance', items: progressNav } ]  : []),
    // ...(role === 'learner' ? [{ label: 'Learning Tools', items: progressNav } ]  : []),
    
    { label: 'Account', items: accountNav  },
  ];

  const handleLogout = () => {
    logout();
    router.push('/login');
  };
  return (
    <aside className="w-[280px] bg-white border-r border-slate-100 flex flex-col fixed left-0 top-0 bottom-0 z-50 transition-transform duration-300">
      <Link href="/" className="block border-b border-slate-50">
        <div className="p-6 flex flex-col items-center border-b border-slate-50">
          <div className="flex items-center gap-4 mb-2">
            <Image
              src="/NIOS.png"
              alt="NIOS Logo"
              width={50}
              height={50}
              className="object-contain"
            />
            <div className="flex flex-col">
              <div className="text-[10px] font-bold text-blue-900 leading-tight">
                राष्ट्रीय मुक्त विद्यालयी शिक्षा संस्थान
              </div>
              <div className="text-sm font-black text-blue-800 leading-tight">
                National Institute of <span className="text-blue-900">Open Schooling</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-[8px] text-slate-400 font-bold leading-tight uppercase tracking-tight">
              (An autonomous institution under Ministry of Education, Govt. of India)
            </div>
            <div className="text-[9px] text-blue-900 font-black mt-1 uppercase tracking-widest">
              AI-Poweblue LMS Portal
            </div>
          </div>
        </div>
      </Link>

      <nav className="flex-1 overflow-y-auto px-6 py-8 space-y-8 scrollbar-hide">
        {sections.map((section) => (
          <div className="space-y-2" key={section.label}>
            <div className="px-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 opacity-70">
              {section.label}
            </div>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link href={item.href} key={item.href} className="block group">
                    <div className={`flex items-center gap-3.5 px-4 py-2 rounded-xl text-sm transition-all duration-300 ${isActive
                      ? 'bg-blue-50 text-blue-900 border border-blue-100/50 shadow-sm font-bold'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                      }`}>
                      <span className={`text-lg transition-transform duration-300 group-hover:scale-110 ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
                        }`}>
                        {item.icon}
                      </span>
                      <span className="flex-1 tracking-tight">{item.label}</span>
                      {item.badge && (
                        <span className="bg-blue-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-6 mt-auto border-t border-slate-50">
        <div className="bg-slate-50 p-2 rounded-xl flex items-center gap-3.5 hover:bg-white hover:shadow-lg hover:shadow-slate-200/50 transition-all group cursor-pointer border border-transparent hover:border-slate-100">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-red-500 flex items-center justify-center font-black text-white text-sm shadow-md transition-all duration-500">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-black text-slate-900 truncate">{user.name}</div>
            <div className="text-[10px] font-bold text-slate-400 truncate tracking-tight uppercase">
              {user.role} · {user.details.class || user.details.designation || 'Staff'}
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center justify-center p-2 text-lg text-slate-400 hover:text-blue-900 transition-all">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}

