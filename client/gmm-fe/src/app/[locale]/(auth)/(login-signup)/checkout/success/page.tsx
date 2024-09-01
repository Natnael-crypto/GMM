'use client'

import { toast } from '@/components/ui/use-toast';
import { useRouter } from '@/lib/navigation';
import { useEffect } from 'react';

export default function SuccessPage() {
    const router = useRouter();

    useEffect(() => {
        localStorage.setItem('gmm-checkout-status', 'success');
        toast(
            {
                title: 'Payment Successful',
                description: 'Your payment was successful'
            }
        )
        router.push('/registration')
    }, [router])


    return <div className="flex h-screen w-full items-center justify-center">
        <h1 className="text-3xl font-bold text-green-500">Payment Successful</h1>
    </div>
}
