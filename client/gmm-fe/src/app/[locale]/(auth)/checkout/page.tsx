import CheckoutCard from '@/components/auth/checkout/checkout-card';
import { auth } from '@/lib/auth/utils';
import { redirect } from '@/lib/navigation';

export default async function Checkout() {
  const session = await auth();

  if (
    session &&
    session.user &&
    session.user.accountStatus === 'Incomplete Registration'
  ) {
    return redirect('/registration');
  }

  if (session && session.user && session.user.accountStatus === 'Suspended') {
    return redirect('/dashboard');
  }

  return <CheckoutCard />;
}
