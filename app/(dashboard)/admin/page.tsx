import { redirect } from 'next/navigation';
import { requireServerSessionUser, isAdminEmail } from '@/lib/session';
import AdminPageClient from '@/components/AdminPageClient';

export default async function AdminPage() {
  const user = await requireServerSessionUser();

  if (!isAdminEmail(user.email)) {
    redirect('/dashboard');
  }

  return <AdminPageClient />;
}
