import React, { useState, useEffect } from "react";
import AdminLayout from "../../../components/AdminLayout";

const EnrolledCourses = () => {
  const [enrolledCourses, setErolledCourses] = useState([]);

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
    try {
      const res = await fetch(`/api/enrollment/delete-enrollment?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setErolledCourses((prevCourses) =>
          prevCourses.filter((c) => c._id !== id)
        );
      } else {
        console.error(res.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-wrap justify-center items-start py-24 bg-gray-100 relative min-h-screen">
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
                >
                  Delete
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
