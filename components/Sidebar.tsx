'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import Footer from '@/components/Footer';

const Sidebar = ({ user }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <section className='sidebar'>
      <nav className='flex flex-col gap-4'>
        <Link href='/' className='mb-12 cursor-pointer flex items-center gap-2'>
          <Image
            src='/icons/logo.svg'
            alt='havco logo'
            width={34}
            height={34}
            className='size-24 max-xl:size-14'
          />
          <h1 className='sidebar-logo'>Hacvo</h1>
        </Link>

        {sidebarLinks.map(({ imgURL, route, label }, index) => {
          const isActive =
            pathname === route || pathname.startsWith(`${route}/`);

          return (
            <Link
              href={route}
              key={index}
              className={cn('sidebar-link', { 'bg-bank-gradient': isActive })}
            >
              <div className='relative size-6'>
                <Image
                  src={imgURL}
                  alt={label}
                  fill
                  className={cn({ 'brightness-[3] invert-[0]': isActive })}
                />
              </div>
              <p className={cn({ '!text-white': isActive }, 'sidebar-label')}>
                {label}
              </p>
            </Link>
          );
        })}

        {/* USER */}
      </nav>
      <Footer user={user} />
    </section>
  );
};

export default Sidebar;
