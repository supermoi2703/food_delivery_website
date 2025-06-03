import "react";
import "./ListUsers.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ListUsers = ({ url }) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.post(`${url}/api/user/listusers`);
      console.log("API response:", response.data);
      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        toast.error("Failed to fetch users.");
      }
    } catch (error) {
      console.error("Fetch users error:", error);
      toast.error("Error fetching users.");
    }
  };

  const removeUser = async (userId) => {
    try { 
      const response = await axios.post(`${url}/api/user/removeuser`, { id: userId });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchUsers(); 
      } else {
        toast.error("Failed to remove user.");
      }
    } catch (error) {
      console.error("Remove user error:", error);
      toast.error("Error removing user.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Users List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Name</b>
          <b>Email</b>
          <b>Role</b>
          <b>Action</b>
        </div>
        {users.map((user, index) => (
          <div key={index} className="list-table-format">
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.role}</p>
            <p onClick={() => removeUser(user._id)} className="cursor">
              X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListUsers;
