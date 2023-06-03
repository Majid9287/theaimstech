import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import React from "react";

import AdminLayout from "../../../components/AdminLayout";

function CourseForm() {
 const router = useRouter()
  const { projectId } = router.query
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    // Fetch the course details using the projectId prop
    const fetchCourseDetails = async () => {
      try {
        const res = await fetch(`/api/project/get-project?id=${projectId}`);
        const data = await res.json();
        setName(data.name);
        setDescription(data.description);
        // Set the image url to display the current photo
        setPhoto(data.photoUrl);
      } catch (error) {
        console.error(error);
      }
    };
    if (projectId) {
      fetchCourseDetails();
    }
  }, [projectId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("file", photo);

    try {
      const res = await fetch(`/api/project/update-project/${projectId}`, {
        method: "PUT",
        body: formData,
      });
      setName("")
      setDescription("")
      setPhoto(null)
      
   
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  
  return (
    <AdminLayout>
        <div className="h-full bg-gray-100 relative">
      <div className="container mx-auto px-4 relative bg-gray-100 py-24 min-h-screen">
        <form onSubmit={handleSubmit} enctype="multipart/form-data">
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter course name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
         
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             value={description}
             rows="8" 
             onChange={(e) => setDescription(e.target.value)}>
            </textarea>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="photo"
            >
              Photo
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="photo"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
            
            />
          </div>
          <div className="flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      </div>
    </AdminLayout>
  );
}
export default CourseForm;
