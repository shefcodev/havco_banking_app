import Image from 'next/image';
import { redirect } from 'next/navigation';

import Sidebar from '@/components/Sidebar';
import MobileNav from '@/components/MobileNav';
import { getLoggedInUser } from '@/lib/actions/user.actions';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedInUser = await getLoggedInUser();

  console.log(loggedInUser); // check logged-in user

  if (!loggedInUser) redirect('/sign-in');

  return (
    <main className='flex w-full h-screen font-inter'>
      <Sidebar user={loggedInUser} />
      <div className='flex size-full flex-col'>
        <div className='root-layout'>
          <Image
            src='/icons/logo.svg'
            alt='havco logo'
            width={30}
            height={30}
          />
          <div className=''>
            <MobileNav user={loggedInUser} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
