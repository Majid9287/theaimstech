import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";
const ProjectSection = () => {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetch("/api/get-projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/delete-project?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects((prevProjects) => prevProjects.filter((c) => c._id !== id));
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
        <h1 className="text-3xl font-bold mb-8">Projects</h1>
        <button  onClick={() => router.push("/admin/project-add-form")} className="px-4 py-2 bg-green-500 text-white rounded mb-4">
          Add New Project
        </button>
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {projects.map((project) => (
            <div key={project._id} className="bg-white rounded-lg shadow-lg">
              <img
                src={project.photo}
                alt={project.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-lg font-medium">{project.title}</h2>
                <p>{project.description}</p>
                <div className="mt-4 flex justify-between">
                  <button
                    className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded"
                    onClick={() => router.push(`/admin/project-update-form?projectId=${project._id}`)}>
                    Update
                  </button>
                  <button
                    className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded"
                    onClick={() => handleDelete(project._id)}
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

export default ProjectSection;
