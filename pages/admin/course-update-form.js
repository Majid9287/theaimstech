import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import React from "react";
import dynamic from "next/dynamic";
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
import "react-quill/dist/quill.snow.css";
import AdminLayout from "../../components/AdminLayout";

function CourseForm() {
 const router = useRouter()
  const { courseId } = router.query
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [enrollment, setEnrollment] = useState("open");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    // Fetch the course details using the courseId prop
    const fetchCourseDetails = async () => {
      try {
        const res = await fetch(`/api/getonecourse?id=${courseId}`);
        const data = await res.json();
        setName(data.name);
        setPrice(data.price);
        setEnrollment(data.enrollment);
        setDuration(data.duration);
        setDescription(data.description);
        // Set the image url to display the current photo
        setPhoto(data.photoUrl);
      } catch (error) {
        console.error(error);
      }
    };
    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("duration", duration);
    formData.append("description", description);
    formData.append("enrollment", enrollment);
    formData.append("price", price);
    formData.append("file", photo);

    try {
      const res = await fetch(`/api/updatecourse/${courseId}`, {
        method: "PUT",
        body: formData,
      });

  
   
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [        { list: "ordered" },        { list: "bullet" },        { indent: "-1" },        { indent: "+1" },      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };
  return (
    <AdminLayout>
      <div className="container mx-auto px-4 relative bg-gray-100 py-24 ">
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
              htmlFor="enrollment"
            >
              Enrollment Status
            </label>
            <div className="relative">
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="enrollment"
                value={enrollment}
                onChange={(e) => setEnrollment(e.target.value)}
                required
              >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="duration"
            >
              Duration
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="duration"
              type="number"
              placeholder="Enter course duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="duration"
            >
              price
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="duration"
              type="number"
              placeholder="Enter course duration"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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
            <QuillNoSSRWrapper
              modules={modules}
              value={description}
              onChange={(content, delta, source, editor) => {
                setDescription(editor.getHTML());
              }}
              theme="snow"
            />
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
    </AdminLayout>
  );
}
export default CourseForm;
