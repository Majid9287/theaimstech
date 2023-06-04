import React, { useState, useEffect } from "react";
import AdminLayout from "../../../components/AdminLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const EnrolledCourses = () => {
  const [enrolledCourses, setErolledCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/enrollment/get-enrollments`);
        if (!response.ok) {
          throw new Error("Failed to fetch enrolled courses");
        }
        const data = await response.json();
        setErolledCourses(data);
        
      } catch (error) {
        console.error(error);
        // You can set an error state here to display a message to the user
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/enrollment/delete-enrollment?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.warn('EnrollCourse delete successfully!', {
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
        setErolledCourses((prevCourses) =>
          prevCourses.filter((c) => c._id !== id)
        );
      } else {
        console.error(res.statusText);
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
      console.error(error);
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
      <div className="flex flex-wrap justify-center items-start py-24 bg-gray-100 relative min-h-screen">
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
        {enrolledCourses.length > 0 ? (
          enrolledCourses.map((course) => (
            <div
              key={course._id}
              className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden m-4"
            >
              <div className="px-4 py-2">
                <h2 className="text-gray-800 font-bold text-2xl mb-2">
                  {course.course.name}
                </h2>
              </div>
              <div className="px-4 py-2">
                <h3 className="text-gray-800 font-bold text-xl mb-2">
                  Student Information
                </h3>
                <p className="text-gray-600 text-sm">
                  <span className="font-bold">Name:</span> {course.user.name}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-bold">Email:</span> {course.user.email}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-bold">Phone:</span> {course.user.phone}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-bold">Address:</span>{" "}
                  {course.user.address}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-bold">Enroll Data:</span>{" "}
                  {new Date(course.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="px-4 py-2 flex justify-end">
                <button
                  className=" w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => handleDelete(course._id)}
                  disabled={loading}
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
          ))
        ) : (
          <p>No enrolled courses found.</p>
        )}
      </div>
    </AdminLayout>
  );
};

export default EnrolledCourses;
