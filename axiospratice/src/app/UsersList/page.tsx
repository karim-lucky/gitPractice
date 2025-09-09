"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Users() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [form, setForm] = useState({ name: "", email: "" });

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            query {
              users {
                _id
                name
                email
              }
            }
          `,
        }),
      });

      const result = await res.json();
      setData(result.data);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const handleClick = () => {
    router.push("/register");
  };

  const UPDATE_USER_MUTATION = `
    mutation UpdateUser($_id: ID!, $name: String, $email: String) {
      updateUser(_id: $_id, name: $name, email: $email) {
        _id
        name
        email
      }
    }
  `;

  const DELETE_USER_MUTATION = `
    mutation DeleteUser($_id: ID!) {
      deleteUser(_id: $_id) {
        message
        success
      }
    }
  `;

  // Open modal with user details
  const openModal = (user: any) => {
    setSelectedUser(user);
    setForm({ name: user.name, email: user.email });
    setShowModal(true);
  };

  // Open delete modal
  const openDeleteModal = (user: any) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  // Submit update
  async function handleUpdate() {
    setLoading(true);
    const res = await fetch("/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: UPDATE_USER_MUTATION,
        variables: { _id: selectedUser._id, name: form.name, email: form.email },
      }),
    });

    const result = await res.json();
    // Refresh table
    const updatedUsers = data.users.map((user: any) =>
      user._id === selectedUser._id ? result.data.updateUser : user
    );
    setData({ users: updatedUsers });

    setShowModal(false);
    setLoading(false);
  }

  // Delete user
  async function handleDeleteConfirmed() {
    setLoading(true);
    const res = await fetch("/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: DELETE_USER_MUTATION,
        variables: { _id: userToDelete._id },
      }),
    });
    const result = await res.json();
    if (result.data.deleteUser.success) {
      setData({ users: data.users.filter((u: any) => u._id !== userToDelete._id) });
    }
    setShowDeleteModal(false);
    setLoading(false);
  }

  return (
    <div className="p-6 bg-white text-red-800">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <button onClick={handleClick}>Send user to another page</button>

      {loading && (
        <div className="my-4 text-blue-600 font-semibold">Loading...</div>
      )}

      <table className="min-w-full mt-4 border border-gray-200 shadow-md rounded-lg">
        <tbody>
          {data?.users?.map((u: any, index: number) => (
            <tr key={u._id || index} className="hover:bg-gray-50">
              <td className="px-6 py-3 border-b text-sm text-red-700">{u._id}</td>
              <td className="px-6 py-3 border-b text-sm text-red-700">{u.name}</td>
              <td className="px-6 py-3 border-b text-sm text-red-700">{u.email}</td>
              <td className="px-6 py-3 border-b text-sm">
                <button
                  onClick={() => openModal(u)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2"
                  disabled={loading}
                >
                  Update
                </button>
                <button
                  onClick={() => openDeleteModal(u)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  disabled={loading}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Update User</h2>

            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Name"
              className="w-full border p-2 rounded mb-3"
              disabled={loading}
            />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              className="w-full border p-2 rounded mb-3"
              disabled={loading}
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 bg-gray-400 text-white rounded"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-3 py-1 bg-green-600 text-white rounded"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Delete User</h2>
            <p>Are you sure you want to delete <span className="font-semibold">{userToDelete?.name}</span>?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-3 py-1 bg-gray-400 text-white rounded"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirmed}
                className="px-3 py-1 bg-red-600 text-white rounded"
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}