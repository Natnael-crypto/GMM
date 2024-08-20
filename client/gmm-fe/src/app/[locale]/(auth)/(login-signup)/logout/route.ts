'use server';

import { redirect } from '@/lib/navigation';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const ccs = cookies().getAll();

  for (const cc of ccs) {
    cookies().delete(cc.name);
  }

  revalidatePath('/');
  return redirect('/?loggedOut=true');
}
