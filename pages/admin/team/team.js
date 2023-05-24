import { useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";
const TeamSection = () => {
  const router = useRouter();
 
  const [team, setTeam] = useState([]);
  useEffect(() => {
    fetch("/api/team/get-teams")
      .then((res) => res.json())
      .then((data) => setTeam(data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/team/delete-team?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setTeam((prevTeam) => prevTeam.filter((c) => c._id !== id));
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
                  >
                    Delete
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
