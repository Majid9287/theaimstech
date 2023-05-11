import React from 'react'
import { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
function message() {

    const [contacts, setContacts] = useState([]);
    const [filter, setFilter] = useState("all"); // default filter value
    const [filteredContacts, setFilteredContacts] = useState([]);
    // fetch all contacts on initial load
    useEffect(() => {
      const fetchContacts = async () => {
        const response = await fetch("/api/get-messege");
        const data = await response.json();
        setContacts(data);
      };
      fetchContacts();
    }, []);
  
    // filter contacts based on selected option
    useEffect(() => {
      const filterContacts = () => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const lastMonth = new Date(today);
        lastMonth.setMonth(lastMonth.getMonth() - 1);
  
        if (filter === "today") {
          const filteredContacts = contacts.filter((contact) => {
            const contactDate = new Date(contact.createdAt);
            return (
              contactDate.getFullYear() === today.getFullYear() &&
              contactDate.getMonth() === today.getMonth() &&
              contactDate.getDate() === today.getDate()
            );
          });
          setFilteredContacts(filteredContacts);
        } else if (filter === "yesterday") {
          const filteredContacts = contacts.filter((contact) => {
            const contactDate = new Date(contact.createdAt);
            return (
              contactDate.getFullYear() === yesterday.getFullYear() &&
              contactDate.getMonth() === yesterday.getMonth() &&
              contactDate.getDate() === yesterday.getDate()
            );
          });
          setFilteredContacts(filteredContacts);
        } else if (filter === "lastMonth") {
          const filteredContacts = contacts.filter((contact) => {
            const contactDate = new Date(contact.createdAt);
            return contactDate >= lastMonth && contactDate <= today;
          });
          setFilteredContacts(filteredContacts);
        } else {
          setFilteredContacts(contacts);
        }
      };
      filterContacts();
    }, [contacts, filter]);

    const handleDelete = async (id) => {
      try {
        const res = await fetch(`/api/delete-message?id=${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          setContacts((prev) =>
            prev.filter((c) => c._id !== id)
          );
        } else {
          console.error(res.statusText);
        }
      } catch (error) {
        console.error(error);
      }
    };
  return (
    <AdminLayout > 

<div className="container mx-auto py-24 px-2 bg-gray-100 relative h-full">
  <div className="flex justify-between items-center mb-6 relative">
    <h2 className="text-xl font-bold"> Messages</h2>
    <div>
      <label htmlFor="filter" className="mr-2">
        Filter by:
      </label>
      <select
        id="filter"
        className="border border-gray-400 rounded p-2 relative"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="today">Today</option>
        <option value="yesterday">Yesterday</option>
        <option value="lastMonth">Last Month</option>
        <option value="all">All</option>
      </select>
    </div>
  </div>
  <div className="overflow-x-auto">
    <table className="bg-white relative table-auto border-collapse w-full">
      <thead>
        <tr>
          <th className="border px-4 py-2">Name</th>
          <th className="border px-4 py-2">Email</th>
          <th className="border px-4 py-2">Phone</th>
          <th className="border px-4 py-2">Country</th>
          <th className="border px-4 py-2">Subject</th>
          <th className="border px-4 py-2">Message</th>
          <th className="border px-4 py-2">Date</th>
          <th className="border px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {filteredContacts.map((contact) => (
          <tr key={contact._id}>
            <td className="border px-4 py-2">{contact.name}</td>
            <td className="border px-4 py-2">{contact.email}</td>
            <td className="border px-4 py-2">{contact.phone}</td>
            <td className="border px-4 py-2">{contact.country}</td>
            <td className="border px-4 py-2">{contact.subject}</td>
            <td className="border px-4 py-2">{contact.message}</td>
            <td className="border px-4 py-2">
              {new Date(contact.createdAt).toLocaleDateString()}
            </td>
            <td className="border px-4 py-2">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleDelete(contact._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

    </AdminLayout>
  )
}

export default message

