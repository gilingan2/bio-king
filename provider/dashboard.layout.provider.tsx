'use client';
import HeaderSearch from '@/components/header-search';
import LayoutLoader from '@/components/layout-loader';
import ThemeCustomize from '@/components/partials/customizer/theme-customizer';
import Footer from '@/components/partials/footer';
import Header from '@/components/partials/header';
import Sidebar from '@/components/partials/sidebar';
import MobileSidebar from '@/components/partials/sidebar/mobile-sidebar';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useMounted } from '@/hooks/use-mounted';
import { cn } from '@/lib/utils';
import { useSidebar, useThemeStore } from '@/store';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Brain,
  ChevronRight,
  CreditCard,
  FileText,
  Github,
  Home,
  Layout,
  LogOut,
  Link as LucideLink,
  Mail,
  Settings,
  Shield,
  User,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react';

const DashBoardLayoutProvider = ({
  children,
  trans,
}: {
  children: React.ReactNode;
  trans: any;
}) => {
  const { collapsed, sidebarType, setCollapsed, subMenu } = useSidebar();
  const [open, setOpen] = React.useState(false);
  const { layout } = useThemeStore();
  const location = usePathname();
  const isMobile = useMediaQuery('(min-width: 768px)');
  const mounted = useMounted();
  if (!mounted) {
    return <LayoutLoader />;
  }
  if (layout === 'semibox') {
    return (
      <>
        <Header handleOpenSearch={() => setOpen(true)} trans={trans} />
        <Sidebar trans={trans} />

        <div
          className={cn('content-wrapper transition-all duration-150', {
            'ltr:xl:ml-[72px] rtl:xl:mr-[72px]': collapsed,
            'ltr:xl:ml-[272px] rtl:xl:mr-[272px]': !collapsed,
          })}
        >
          <div className={cn('page-min-height-semibox px-4 pb-8 pt-6')}>
            <div className='semibox-content-wrapper'>
              <LayoutWrapper
                isMobile={isMobile}
                setOpen={setOpen}
                open={open}
                location={location}
                trans={trans}
              >
                {children}
              </LayoutWrapper>
            </div>
          </div>
        </div>
        <Footer handleOpenSearch={() => setOpen(true)} />
        <ThemeCustomize />
      </>
    );
  }
  if (layout === 'horizontal') {
    return (
      <>
        <Header handleOpenSearch={() => setOpen(true)} trans={trans} />

        <div className={cn('content-wrapper transition-all duration-150')}>
          <div className={cn('page-min-height-horizontal px-6 pb-8 pt-6', {})}>
            <LayoutWrapper
              isMobile={isMobile}
              setOpen={setOpen}
              open={open}
              location={location}
              trans={trans}
            >
              {children}
            </LayoutWrapper>
          </div>
        </div>
        <Footer handleOpenSearch={() => setOpen(true)} />
        <ThemeCustomize />
      </>
    );
  }

  if (sidebarType !== 'module') {
    return (
      <>
        <Header handleOpenSearch={() => setOpen(true)} trans={trans} />
        <Sidebar trans={trans} />

        <div
          className={cn('content-wrapper transition-all duration-150', {
            'ltr:xl:ml-[248px] rtl:xl:mr-[248px]': !collapsed,
            'ltr:xl:ml-[72px] rtl:xl:mr-[72px]': collapsed,
          })}
        >
          <div className={cn('page-min-height px-6 pb-8 pt-6', {})}>
            <LayoutWrapper
              isMobile={isMobile}
              setOpen={setOpen}
              open={open}
              location={location}
              trans={trans}
            >
              {children}
            </LayoutWrapper>
          </div>
        </div>
        <Footer handleOpenSearch={() => setOpen(true)} />
        <ThemeCustomize />
      </>
    );
  }
  return (
    <>
      <Header handleOpenSearch={() => setOpen(true)} trans={trans} />
      <Sidebar trans={trans} />

      <div
        className={cn('content-wrapper transition-all duration-150', {
          'ltr:xl:ml-[300px] rtl:xl:mr-[300px]': !collapsed,
          'ltr:xl:ml-[72px] rtl:xl:mr-[72px]': collapsed,
        })}
      >
        <div className={cn('layout-padding page-min-height px-6 pt-6')}>
          <LayoutWrapper
            isMobile={isMobile}
            setOpen={setOpen}
            open={open}
            location={location}
            trans={trans}
          >
            {children}
          </LayoutWrapper>
        </div>
      </div>
      <Footer handleOpenSearch={() => setOpen(true)} />
      {isMobile && <ThemeCustomize />}
    </>
  );
};

export default DashBoardLayoutProvider;

const LayoutWrapper = ({
  children,
  isMobile,
  setOpen,
  open,
  location,
  trans,
}: {
  children: React.ReactNode;
  isMobile: boolean;
  setOpen: any;
  open: boolean;
  location: any;
  trans: any;
}) => {
  return (
    <>
      <motion.div
        key={location}
        initial='pageInitial'
        animate='pageAnimate'
        exit='pageExit'
        variants={{
          pageInitial: {
            opacity: 0,
            y: 50,
          },
          pageAnimate: {
            opacity: 1,
            y: 0,
          },
          pageExit: {
            opacity: 0,
            y: -50,
          },
        }}
        transition={{
          type: 'tween',
          ease: 'easeInOut',
          duration: 0.5,
        }}
      >
        <main>{children}</main>
      </motion.div>

      <MobileSidebar trans={trans} className='left-[300px]' />
      <HeaderSearch open={open} setOpen={setOpen} />
    </>
  );
};

export const dashboardNavItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'home',
    items: [],
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: 'analytics',
    items: [],
  },
  {
    title: 'Shortlinks',
    href: '/shortlinks',
    icon: 'links',
    items: [],
  },
  {
    title: 'Bio Pages',
    href: '/bio-pages',
    icon: 'biopage',
    items: [],
  },
  {
    title: 'Form Captures',
    href: '/form-captures',
    icon: 'shield',
    items: [],
  },
];

export function getIcon(icon: string) {
  switch (icon) {
    case 'home':
      return <Home className='h-4 w-4' />;
    case 'settings':
      return <Settings className='h-4 w-4' />;
    case 'credit-card':
      return <CreditCard className='h-4 w-4' />;
    case 'file-text':
      return <FileText className='h-4 w-4' />;
    case 'layout':
      return <Layout className='h-4 w-4' />;
    case 'github':
      return <Github className='h-4 w-4' />;
    case 'analytics':
      return <BarChart3 className='h-4 w-4' />;
    case 'links':
      return <LucideLink className='h-4 w-4' />;
    case 'biopage':
      return <Brain className='h-4 w-4' />;
    case 'user':
      return <User className='h-4 w-4' />;
    case 'shield':
      return <Shield className='h-4 w-4' />;
    case 'logout':
      return <LogOut className='h-4 w-4' />;
    case 'mail':
      return <Mail className='h-4 w-4' />;
    default:
      return <ChevronRight className='h-4 w-4' />;
  }
}
