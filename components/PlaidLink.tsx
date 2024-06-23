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

  console.log(open, ready, 'see here!');

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
        <Button>Connect bank</Button>
      ) : (
        <Button>Connect bank</Button>
      )}
    </Fragment>
  );
};

export default PlaidLink;
