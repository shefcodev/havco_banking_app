import HeaderBox from '@/components/HeaderBox';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import RightSidebar from '@/components/RightSidebar';

import { getLoggedInUser } from '@/lib/actions/user.actions';

const Home = async () => {
  const loggedIn = await getLoggedInUser();
  console.log(loggedIn);

  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
            type='greeting'
            title='Welcome'
            user={loggedIn?.name.split(' ')[0] || 'Guest'}
            subtext='Access & manage your account and transactions efficiently.'
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1137.35}
          />
        </header>
        RECENT TRANSACTIONS
      </div>

      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 1340 }, { currentBalance: 500 }]}
      />
    </section>
  );
};

export default Home;
