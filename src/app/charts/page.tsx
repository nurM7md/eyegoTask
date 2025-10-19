"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import React from "react";
import { useSelector } from "react-redux";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import SideBar from "@/components/SideBar";

const ChartsPage = () => {
  
  const { users, loading } = useSelector((state) => state.users);
  console.log(users);
  

  if (loading) return <div className="p-6">Loading chart...</div>;
  if (!users.length) return <div className="p-6">No data to display</div>;

  const chart = users.map((user) => ({
    name: user.name,
    emailLength: user.email.length,
  }));

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-900 ">
        <SideBar />
        <div className="flex-1 p-6 text-gray-100 bg-gray-900">
  <h1 className="justify-center mb-6 text-2xl font-bold text-center text-gray-100">
    Charts
  </h1>

  <div className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-md h-96">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chart}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
        <XAxis dataKey="name" stroke="#E5E7EB" />
        <YAxis stroke="#E5E7EB" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1F2937",
            border: "1px solid #374151",
            color: "#E5E7EB",
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="emailLength"
          stroke="#60A5FA"
          activeDot={{ r: 8 }}
        />
      </LineChart>

      <BarChart data={chart} className="pt-5">
        <XAxis dataKey="name" stroke="#E5E7EB" />
        <YAxis stroke="#E5E7EB" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1F2937",
            border: "1px solid #374151",
            color: "#E5E7EB",
          }}
        />
        <Bar dataKey="emailLength" fill="#34D399" />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>

      </div>
    </ProtectedRoute>
  );
};

export default ChartsPage;
