import { useState, useEffect } from "react";
import AdminLayout from "../../../components/AdminLayout";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch("/api/user/get-users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }, []);

  const handleAdminChange = (userId) => {
    const user = users.find((user) => user._id === userId);
    const newIsAdmin = !user.isAdmin;

    fetch(`/api/user/update-user?id=${userId}`, {
      method: "PUT",
      body: JSON.stringify({ isAdmin: newIsAdmin }),
      headers: { "Content-Type": "application/json" },
      
    })
      .then((response) => response.json())
      .then((data) => {
        const newUsers = users.map((user) => {
          if (user._id === data._id) {
            return data;
          }
          return user;
        });
        setUsers(newUsers);
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (id) => {
    fetch(`/api/user/delete-user?id=${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        const newUsers = users.filter((user) => user._id !== id);
        setUsers(newUsers);
      })
      .catch((error) => console.log(error));
  };
 
  return (
    <AdminLayout>
      <div className="flex flex-col bg-gray-100 pt-24 relative h-full">
        <div className="-my-2  overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full sm:px-2 lg:px-2">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Phone
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Address
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      delete
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src="https://www.gravatar.com/avatar/11111111111111111111111111111111?d=mp&f=y"
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {user.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {user.address}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="relative inline-block text-left">
                          <div>
                            <button
                              type="button"
                              className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              id="menu-button"
                              aria-expanded={isOpen}
                              aria-haspopup="true"
                              onClick={() => handleAdminChange(user._id)}
                            >
                             {user.isAdmin ? "Remove Admin" : "Make Admin"}
                            </button>
                          </div>
                          <div
                            className={`opacity-0 invisible absolute z-50 mt-2 rounded-md shadow-lg ${
                              isOpen ? "opacity-100 visible" : ""
                            }`}
                          >
                            <div className="rounded-md bg-white shadow-xs">
                              <div className="py-1">
                                <button
                                  className="block px-4 py-2 text-sm text-gray-700 w-full text-left"
                                  role="menuitem"
                                  onClick={() => handleAdminChange(user._id)}
                                >
                                  {user.isAdmin ? "Remove Admin" : "Make Admin"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div>
                          <button
                            type="button"
                            className="inline-flex justify-center bg-red-500 hover:bg-red-600 w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            id="menu-button"
                            aria-expanded="true"
                            aria-haspopup="true"
                            onClick={() => handleDelete(user._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default UserTable;
