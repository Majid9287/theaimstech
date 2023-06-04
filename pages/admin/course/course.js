import { useEffect, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CourseSection = ({ isUserLoggedIn, isAdmin }) => {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!isUserLoggedIn && !isAdmin) {
      router.push("/signin");
    }
  }, [isUserLoggedIn, isAdmin, router]);
  useEffect(() => {
    fetch("/api/course/getcourse")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/course/deletecourse?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCourses((prevCourses) => prevCourses.filter((c) => c._id !== id));
       
          toast.warn('Course delete successfully!', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        setLoading(false);
      } else {
        toast.error(res.statusText, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="h-full bg-gray-100 relative">
        <div className="container mx-auto px-4 pt-24 pb-24 ">
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <h1 className="text-3xl font-bold mb-8">Courses</h1>
          <button
            onClick={() => router.push("/admin/course/courseaddform")}
            className="relative px-4 py-2 bg-green-500 text-white rounded mb-4"
          >
            Add New Course
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {courses.map((course) => (
              <div key={course._id} className="bg-white rounded-lg shadow-lg">
                <img
                  src={course.photo}
                  alt={course.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h2 className="text-lg font-medium">{course.name}</h2>
                  <p className="mt-2 text-gray-600">{course.price}</p>
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={() =>
                        router.push(
                          `/admin/course/course-update-form?courseId=${course._id}`
                        )
                      }
                      className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded"
                    >
                      Update
                    </button>
                    
                    <button
                      className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded"
                      onClick={() => handleDelete(course._id)}
                      disabled={loading} // Disable the button when loading is true
                    >
                      {loading ? (
                       <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zm7-2.647l3 2.647C19.865 17.824 21 15.042 21 12h-4a7.96 7.96 0 01-2 5.291zM14 4.515V0h-4v4.515A8.003 8.003 0 0112 4c1.657 0 3 1.343 3 3h-2c0-.552-.448-1-1-1s-1 .448-1 1h-2c0-1.657 1.343-3 3-3a3.96 3.96 0 012.586 1H14z"
                      ></path>
                    </svg>
                      ) : (
                        "Delete"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CourseSection;
