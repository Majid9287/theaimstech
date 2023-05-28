import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function EnrolledCourses({token,UserId}) {
  const [courses, setCourses] = useState([]);
  const router = useRouter();
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  useEffect(() => {
    if (!token ||!UserId) {
      router.push('/signin');
    }
  }, [token,router]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/enrollment/get-enrollment?userId=${UserId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch enrolled courses');
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        
        toast.error('There is some issue', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // You can set an error state here to display a message to the user
      }
    }
    fetchData();
  }, [UserId]);
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/enrollment/delete-enrollment?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.warn("Course Delete Successfully", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme:"colored"
        });
        setCourses((prevCourses) => prevCourses.filter((c) => c._id !== id));
      } 
    } catch (error) {
     
      toast.error('There is some issue', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    hideConfirmation();
  };
  const showConfirmation = (id) => {
    setConfirmDeleteId(id);
  };

  const hideConfirmation = () => {
    setConfirmDeleteId(null);
  };
  return (
    <section className="bg-gray-100 py-12  py-24 relative">
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
          theme="colored"
        />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Enrolled Courses
        </h2>
        {courses.length === 0 ? (
          <p className="text-gray-500 text-center">
            You have no enrolled courses.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white shadow overflow-hidden rounded-lg"
              >
                <div className="px-4 py-5 sm:p-6">
                  
                  <img
                    src={course.course.photo}
                    alt={course.course.name}
                    className="mx-auto mb-4"
                  />
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    {course.course.name}
                  </h3>
                  <p className="text-gray-500 mb-2">
                    Enrolled on {new Date(course.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex justify-center">
                    <button
                      className="mt-2 text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => showConfirmation(course._id)}
                    >
                      Leave Course
                    </button>
                    <button
                      onClick={() => {
                        window.open("https://wa.me/923113471713", "_blank");
                      }}
                      className=" ml-4 mt-2 text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
         {confirmDeleteId && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Are you sure you want to leave this course?
              </h3>
              <div className="flex justify-end">
                <button
                  className="text-gray-600 hover:text-gray-900 mr-2"
                  onClick={hideConfirmation}
                >
                  Cancel
                </button>
                <button
                  className="text-red-600 hover:text-red-900"
                  onClick={() => handleDelete(confirmDeleteId)}
                >
                  Leave
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default EnrolledCourses;
