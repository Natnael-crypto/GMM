'use client'

import React from "react";
import {
    useStripe,
} from "@stripe/react-stripe-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faInfoCircle, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "@/lib/navigation";

const SuccessIcon = <FontAwesomeIcon icon={faCheckCircle} className="text-2xl text-green-500" />;
const ErrorIcon = <FontAwesomeIcon icon={faXmarkCircle} className="text-2xl text-red-500" />;
const InfoIcon = <FontAwesomeIcon icon={faInfoCircle} className="text-2xl text-gray-400" />;

const STATUS_CONTENT_MAP: Record<any, any> = {
    succeeded: {
        text: "Payment succeeded",
        icon: SuccessIcon,
    },
    processing: {
        text: "Your payment is being processed.",
        icon: InfoIcon,
    },
    requires_payment_method: {
        text: "Your payment was not successful, please try again.",
        icon: ErrorIcon,
    },
    default: {
        text: "Something went wrong, please try again.",
        icon: ErrorIcon,
    }
};

export function CheckoutCompletePage() {
    const stripe = useStripe();
    const router = useRouter();

    const [status, setStatus] = React.useState<any>("processing");
    const [intentId, setIntentId] = React.useState<any>(null);

    React.useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then((result) => {
            const { paymentIntent } = result

            if (!paymentIntent) {
                return;
            }

            setStatus(paymentIntent.status);
            setIntentId(paymentIntent.id);

            if (paymentIntent.status === 'succeeded') {
                localStorage.setItem('gmm-checkout-status', 'success')
                router.replace('/registration')
            }
        });
    }, [stripe, router]);

    return (
        <div className="flex gap-3 items-center justify-center">
            {STATUS_CONTENT_MAP[status].icon}
            <h2>{STATUS_CONTENT_MAP[status].text}</h2>
        </div>
    );
}