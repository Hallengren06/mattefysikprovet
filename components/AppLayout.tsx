import { requireServerSessionUser, isAdminEmail } from '@/lib/session';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await requireServerSessionUser();

  return (
    <div className="flex h-screen overflow-hidden bg-mafy-bg">
      <Sidebar isAdmin={isAdminEmail(user.email)} />
      <div className="flex flex-col flex-1 min-w-0">
        <TopNav user={user} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
