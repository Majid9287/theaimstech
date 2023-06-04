import { useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const TeamSection = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [team, setTeam] = useState([]);
  useEffect(() => {
    fetch("/api/team/get-teams")
      .then((res) => res.json())
      .then((data) => setTeam(data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/team/delete-team?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.warn("Team delete successfully!", {
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
        setTeam((prevTeam) => prevTeam.filter((c) => c._id !== id));
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
      <div className="h-full bg-gray-100 relative">
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
        <div className="container mx-auto px-4 pt-24 pb-24 ">
          <h1 className="text-3xl font-bold mb-8">Team</h1>
          <button
            onClick={() => router.push("/admin/team/team-add-form")}
            className="px-4 py-2 bg-green-500 text-white rounded mb-4"
          >
            Add New Member
          </button>
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {team.map((Team) => (
              <div
                key={Team._id}
                class="relative block rounded-lg shadow-lg bg-white p-6"
              >
                <div class="lg:flex flex-row items-center">
                  <div class="grow-0 shrink-0 basis-auto w-full lg:w-5/12 lg:pr-6">
                    <img
                      src={Team.photo}
                      alt={Team.name}
                      class="w-full rounded-md mb-6 lg:mb-0"
                    />
                  </div>
                  <div class="grow-0 shrink-0 basis-auto w-full lg:w-7/12">
                    <h5 class="text-lg font-bold mb-2">{Team.name}</h5>
                    <p class="text-gray-500 mb-4">{Team.description}</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-between">
                  <button
                    className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded"
                    onClick={() =>
                      router.push( `/admin/team/team-update-form?teamId=${Team._id}`)
                    }
                  >
                    Update
                  </button>
                  <button
                    className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded"
                    onClick={() => handleDelete(Team._id)}
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
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default TeamSection;
