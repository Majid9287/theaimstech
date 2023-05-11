import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { useRouter } from "next/router";


const CourseSection = ({isUserLoggedIn,isAdmin}) => {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    
    if (!isUserLoggedIn && !isAdmin) {
      router.push('/signin');
    }
  }, [isUserLoggedIn,isAdmin, router]);
  useEffect(() => {
    fetch("/api/getcourse")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/deletecourse?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setCourses((prevCourses) => prevCourses.filter((c) => c._id !== id));
      } else {
        console.error(res.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AdminLayout>
      <div className="h-full bg-gray-100 relative">
        <div className="container mx-auto px-4 pt-24 pb-24 ">
          <h1 className="text-3xl font-bold mb-8">Courses</h1>
          <button
            onClick={() => router.push("/admin/courseaddform")}
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
                   
                      <button  onClick={() => router.push(`/admin/course-update-form?courseId=${course._id}`)} className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded">
                        Update
                      </button>
                   
                    <button
                      className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded"
                      onClick={() => handleDelete(course._id)}
                    >
                      Delete
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
