'use client'

import { Button } from '@/components/ui/button';
import React from 'react';
import { useUpdateProfileContext } from '../profile/update-profile-context';
import Loading from '@/components/ui/loading';

export default function MatchMeCard() {
  const { onSave, isSaving } = useUpdateProfileContext();

  console.log(isSaving)

  return (
    <div className="flex flex-col justify-center items-center rounded-se-3xl rounded-es-3xl overflow-hidden bg-primary text-primary-foreground aspect-square p-5 group hover:bg-secondary hover:text-secondary-foreground cursor-pointer">
      <div className="font-bold mb-8 space-y-1 group-hover:bg-secondary group-hover:text-secondary-foreground">
        <h1 className="text-3xl text-center">100K</h1>
        <p className="text-lg text-center">Potential Matches</p>
      </div>
      <Button className="text-sm font-semibold hover:bg-background hover:text-secondary w-full bg-background text-secondary " onClick={onSave} disabled={isSaving}>
        {isSaving ? <Loading /> : "Match me"}
      </Button>
    </div>
  );
}
