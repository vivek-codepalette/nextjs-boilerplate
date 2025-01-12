import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { signOutAction } from '@/app/actions';
export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Hello, {session.user.email}</h1>
      <form action={signOutAction}>
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign Out
        </button>
      </form>
    </div>
  );
}
