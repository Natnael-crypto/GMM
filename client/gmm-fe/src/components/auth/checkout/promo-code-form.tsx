'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import {
  useApplyPromoCodeMutation,
  useGetUnclaimedPromoCodesQuery,
  useValidatePromoCodeMutation,
} from '@/lib/checkout/api';
import { useAppSelector } from '@/lib/hooks';
import { CheckCircle } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

export default function PromoCodeForm({
  onApply,
}: {
  onApply: (promoCodeId: string) => void;
}) {
  const user = useAppSelector((state) => state.auth.user);
  const ref = useRef<HTMLInputElement>(null);

  const [validate] = useValidatePromoCodeMutation();
  const [applyPromoCode, result] = useApplyPromoCodeMutation();
  const { data, isLoading } = useGetUnclaimedPromoCodesQuery(undefined, {
    skip: !user,
  });

  const [inputValue, setInputValue] = useState<string>('');
  const [filteredCodes, setFilteredCodes] = useState(data || []);

  useEffect(() => {
    if (data && data.length) {
      setFilteredCodes(
        data.filter((promoCode) => promoCode.promoCodeId.includes(inputValue))
      );
    }
  }, [data, inputValue]);

  const handleApply = async () => {
    const result = await validate(inputValue).unwrap();

    if (result) {
      if (result.isValid) {
        try {
          await applyPromoCode(result.promoCodeId).unwrap();
        } catch (e) {
          toast({
            title: 'Error',
            description: 'Unable to claim promo code. Please try again.',
            variant: 'destructive',
          });
          return;
        }
        onApply(result.promoCodeId);

        toast({
          title: 'Congratulations!',
          description: 'You have claimed a valid promo code.',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Invalid Promo Code',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <div className="my-5 flex flex-col items-start max-w-md w-full">
      <DropdownMenu>
        <div className="relative w-full rounded overflow-hidden">
          {/* Input Field */}
          <Input
            ref={ref}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            disabled={result.isLoading || result?.data?.isValid}
            placeholder="Enter Promo Code"
            className="rounded h-12 w-full border-gray-300 focus:ring-2 focus:ring-primary  pl-3"
          />

          {/* Apply Button */}
          <Button
            className="absolute right-0 top-0 h-12 rounded-r w-32 bg-primary text-white font-semibold hover:bg-primary focus:ring-4 focus:ring-blue-500"
            onClick={handleApply}
            disabled={!inputValue || result.isLoading || result?.data?.isValid}
          >
            {result?.data?.isValid ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              'Apply'
            )}
          </Button>
        </div>

        {inputValue && (
          <DropdownMenuContent
            align="start"
            className="max-h-60 overflow-y-auto mt-1 rounded-md shadow bg-white border border-gray-200"
          >
            {isLoading ? (
              <DropdownMenuItem disabled>Loading...</DropdownMenuItem>
            ) : (
              filteredCodes?.map((promoCode) => (
                <DropdownMenuItem
                  key={promoCode.promoCodeId}
                  onClick={() => setInputValue(promoCode.promoCodeId)} // Set input value to selected code
                  className="hover:bg-gray-200 cursor-pointer"
                >
                  {/* {promoCode.code} */}
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  );
}
