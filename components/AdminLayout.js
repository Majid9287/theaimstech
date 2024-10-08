import Link from "next/link";
import { useRouter } from "next/router";

const AdminLayout = ({ children }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <nav className="w-full md:w-64 bg-gray-200 relative pt-24">
        <div className="h-16 bg-gray-800 text-white flex items-center justify-center ">
          <span className="font-bold text-lg">Admin Panel</span>
        </div>
        <ul className="hidden  md:flex flex-col flex-1">
          <Link href="/admin/course/course">
            <li
              className={`p-4 hover:bg-amber-400  ${
                router.pathname === "/admin/course/course" ? "bg-amber-500" : ""
              }`}
            >
              Courses
            </li>
          </Link>
          <Link href="/admin/project/project">
          <li
            className={`p-4 hover:bg-amber-400 ${
              router.pathname === "/admin/project/project" ? "bg-amber-500" : ""
            }`}
          >
            Projects
          </li>
          </Link>
          <Link href="/admin/user/student">
          <li
            className={`p-4 hover:bg-amber-400 ${
              router.pathname === "/admin/user/student" ? "bg-amber-500" : ""
            }`}
          >
            Students
          </li>
          </Link>
          <Link href="/admin/message/message">
          <li
            className={`p-4 hover:bg-amber-400 ${
              router.pathname === "/admin/message//message" ? "bg-amber-500" : ""
            }`}
          >
            Message
          </li>
          </Link>
          <Link href="/admin/course/enrolled-course">
          <li
            className={`p-4 hover:bg-amber-400 ${
              router.pathname === "/admin/course/enrolled-course" ? "bg-amber-500" : ""
            }`}
          >
            Enrolled Course
          </li>
          </Link>
          <Link href="/admin/team/team">
          <li
            className={`p-4 hover:bg-amber-400 ${
              router.pathname === "/admin/team/team" ? "bg-amber-500" : ""
            }`}
          >
            Team
          </li>
          </Link>
        </ul>
        <div className="md:hidden p-4 flex flex-col justify-center  ">
          <button
            onClick={() => router.push("/admin/course/course")}
            type="button"
            className={` text-black border border-current py-2 px-4 rounded-md ${
              router.pathname === "/admin/course/course" ? "bg-amber-500" : ""
            }`}
          >
            Courses
          </button>
          <button
            onClick={() => router.push("/admin/project/project")}
            type="button"
            className={` text-black border border-current py-2 px-4 rounded-md ${
              router.pathname === "/admin/project/project" ? "bg-amber-500" : ""
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => router.push("/admin/message/message")}
            type="button"
            className={` text-black border border-current py-2 px-4 rounded-md ${
              router.pathname === "/admin/message/message" ? "bg-amber-500" : ""
            }`}
          >
            Messages
          </button>
          <button
            onClick={() => router.push("/admin/user/student")}
            type="button"
            className={` text-black border border-current py-2 px-4 rounded-md ${
              router.pathname === "/admin/user/student" ? "bg-amber-500" : ""
            }`}
          >
            Students
          </button>
          <button
            onClick={() => router.push("/admin/course/enrolled-course")}
            type="button"
            className={` text-black border border-current py-2 px-4 rounded-md ${
              router.pathname === "/admin/course/enrolled-course" ? "bg-amber-500" : ""
            }`}
          >
            Enrolled Course
          </button>
          <button
            onClick={() => router.push("/admin/team/team")}
            type="button"
            className={` text-black border border-current py-2 px-4 rounded-md ${
              router.pathname === "/admin/team/team" ? "bg-amber-500" : ""
            }`}
          >
            Team
          </button>
        </div>
      </nav>
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default AdminLayout;
