import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import AdminLayout from "../../components/layout/AdminLayout";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import api from "../../services/axiosInstance";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/admin/getusers");

      if (data.success) {
        setUsers(data.data || []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch users"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Registered Users
          </h1>
          <p className="mt-2 text-slate-600">
            View all users on the platform.
          </p>
        </div>

        {loading ? (
          <Loader text="Loading users..." />
        ) : users.length === 0 ? (
          <EmptyState
            title="No users found"
            description="No users have registered yet."
          />
        ) : (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Subscription
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Resume Limit
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {user.subscription}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {user.resumeLimit}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default UsersPage;