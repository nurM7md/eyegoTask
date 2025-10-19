"use client";
import React, { useEffect, useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import { fetchUsers, deleteUser } from "@/features/users/userSlice";
import toast from "react-hot-toast";
import EditUserModal from "../../components/EditUserModal";
import SideBar from "../../components/SideBar";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useAppDispatch, useAppSelector } from "../../hooks/Page";


const DashBoard = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.users);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectorUser, setSelectorUser] = useState<any>(null);
  const [sortlogic, setSortLogic] = useState({ key: "id", direction: "asc" });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  if (loading) return <div>...loading</div>;
  if (error) return <div> Error :{error}</div>;

  const handleDelete = (id : number) => {
    dispatch(deleteUser(id));
    toast.success("user deleted successfully");
  };

  const handleEdit = (user : string) => {
    setSelectorUser(user);
    setIsModalOpen(true);
  };

  const filteredUsers = users.filter(
    (user : any) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (a[sortlogic.key] < b[sortlogic.key])
      return sortlogic.direction === "asc" ? -1 : 1;
    if (a[sortlogic.key] > b[sortlogic.key])
      return sortlogic.direction === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (key : any) => {
    setSortLogic((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

  const exportData = users.map((user : any) => ({
    ID: user.id,
    Name: user.name,
    Email: user.email,
  }));

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");
    XLSX.writeFile(wb, "users.xlsx");
  };

  const exportPdf = () => {
    const doc = new jsPDF();
    doc.text("Users List", 14, 16);

    autoTable(doc, {
      startY: 20,
      head: [["ID", "Name", "Email"]],
      body: exportData.map((u) => [u.ID, u.Name, u.Email]),
    });

    doc.save("users.pdf");
  };
  return (
    <ProtectedRoute>
    <div className="flex min-h-screen text-gray-100 bg-gray-900">
        <SideBar />
        
        <div className="flex-1 p-4 mt-8 overflow-x-auto md:p-6 md:ml-64">
          <h1 className="justify-center mb-6 text-2xl font-bold text-center">Dashboard</h1>

          <input
            type="text"
            placeholder="Search user..."
            className="w-full p-2 mb-4 text-white border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="overflow-x-auto bg-gray-800 rounded shadow">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th
                    className="px-4 py-2 cursor-pointer"
                    onClick={() => handleSort("id")}
                  >
                    ID
                  </th>
                  <th
                    className="px-4 py-2 cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    Name
                  </th>
                  <th
                    className="px-4 py-2 cursor-pointer"
                    onClick={() => handleSort("email")}
                  >
                    Email
                  </th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user : any) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-700 hover:bg-gray-700"
                  >
                    <td className="px-4 py-2">{user.id}</td>
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="flex flex-col justify-between gap-1 px-4 py-2 space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                      <button
                        className="px-3 py-1 text-sm text-white transition-colors bg-blue-900 rounded hover:bg-blue-800"
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 text-sm text-white transition-colors bg-red-700 rounded hover:bg-red-800"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isModalOpen && (
            <EditUserModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              user={selectorUser}
            />
          )}

          <div className="flex flex-col justify-between mt-4 md:flex-row">
            <div className="flex justify-between gap-4 mb-2 space-x-2 md:mb-0" >
              <button
                className="px-4 py-2 text-white transition-colors bg-green-700 rounded hover:bg-green-800"
                onClick={exportExcel}
              >
                Export Excel
              </button>

              <button
                className="px-4 py-2 text-white transition-colors bg-green-700 rounded hover:bg-green-800"
                onClick={exportPdf}
              >
                Export PDF
              </button>
            </div>
            <div className="flex justify-center">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-1 rounded mx-1 ${
                    currentPage === index + 1
                      ? "bg-blue-900 text-white"
                      : "bg-gray-700 text-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashBoard;
