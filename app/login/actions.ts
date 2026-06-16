'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const FAKE_USERNAME = 'admin';
const FAKE_PASSWORD = 'password';

export async function loginAction(
  _prevState: { error: string | null },
  formData: FormData
): Promise<{ error: string | null }> {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const from = (formData.get('from') as string) || '/books';

  if (username === FAKE_USERNAME && password === FAKE_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set('auth-token', 'fake-auth-token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });
    redirect(from);
  }

  return { error: 'Invalid username or password.' };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('auth-token');
  redirect('/login');
}
