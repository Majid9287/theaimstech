import AdminLayout from "../../components/AdminLayout";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
const StudentsPage = ({isUserLoggedIn,isAdmin}) => {
  const router = useRouter();

  useEffect(() => {
    
    if (!isUserLoggedIn && !isAdmin) {
      router.push('/signin');
    }
  }, [isUserLoggedIn,isAdmin, router]);
  return (
    <AdminLayout>
        <div className="h-full bg-gray-100 relative">
      <section className="flex justify-center items-center text-center min-h-screen bg-gray-100 relative">
        <h1 className="text-6xl text-amber-500 font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] ">
          Welcome to admin panel
        </h1>

      </section>
     </div>
    </AdminLayout>
  );
};

export default StudentsPage;
