import DashBoardLayoutProvider from '@/provider/dashboard.layout.provider';

import { getDictionary } from '@/app/dictionaries';
import { getAuthSession } from '@/lib/auth';
import { AlertDialogProvider } from '@/provider/alert.dialog.provider';
import { redirect } from 'next/navigation';

const layout = async ({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: any };
}) => {
  const session = await getAuthSession();
  if (!session?.user?.email) {
    redirect('/auth/login');
  }

  const trans = await getDictionary(lang);

  return (
    <DashBoardLayoutProvider trans={trans}>
      <AlertDialogProvider>{children}</AlertDialogProvider>
    </DashBoardLayoutProvider>
  );
};

export default layout;
