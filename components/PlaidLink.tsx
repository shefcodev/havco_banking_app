import { Fragment, useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import {
  PlaidLinkOptions,
  PlaidLinkOnSuccess,
  usePlaidLink,
} from 'react-plaid-link';
import { createLinkToken } from '@/lib/actions/user.actions';
import { exchangePublicToken } from '@/lib/actions/user.actions';
import Image from 'next/image';

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const [token, setToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);
      setToken(data?.linkToken);
    };

    getLinkToken();
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      await exchangePublicToken({ publicToken: public_token, user });

      router.push('/');
    },
    [user, router]
  );

  const config: PlaidLinkOptions = { token, onSuccess };

  const { open, ready } = usePlaidLink(config);

  return (
    <Fragment>
      {variant === 'primary' ? (
        <Button
          onClick={() => open()}
          disabled={!ready}
          className='plaidlink-primary'
        >
          Connect bank
        </Button>
      ) : variant === 'ghost' ? (
        <Button
          onClick={() => open()}
          className='plaidlink-ghost'
          variant='ghost'
        >
          <Image
            src='/icons/connect-bank.svg'
            alt='connect bank'
            width={24}
            height={24}
          />
          <p className='hidden text-[16px] font-semibold text-black-2 xl:block'>
            Connect bank
          </p>
        </Button>
      ) : (
        <Button onClick={() => open()} className='plaidlink-default'>
          <Image
            src='/icons/connect-bank.svg'
            alt='connect bank'
            width={24}
            height={24}
          />
          <p className='max-xl:hidden text-[16px] font-semibold text-black-2 '>
            Connect bank
          </p>
        </Button>
      )}
    </Fragment>
  );
};

export default PlaidLink;
