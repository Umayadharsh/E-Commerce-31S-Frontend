import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { backendUrl } from "../config";
import { toast } from "react-toastify";

const Profile = () => {

  const [passwords, setPasswords] = useState({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const [message, setMessage] = useState("");

  const { user, setUser } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("userToken");

      const res = await axios.put(
        `${backendUrl}/api/user/update`,
        form,
        { headers: { token } }
      );

      if (res.data.success) {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success("Profile updated successfully");
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handlePasswordChange = (e) => {
  setPasswords({ ...passwords, [e.target.name]: e.target.value });
};

const submitPasswordChange = async () => {
  if (passwords.newPassword !== passwords.confirmPassword) {
    setMessage("New passwords do not match");
    return;
  }

  try {
    const token = localStorage.getItem("userToken");

    const res = await axios.post(
      `${backendUrl}/api/user/change-password`,
      {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      },
      { headers: { token } }
    );

    if (res.data.success) {
      setMessage("Password changed successfully");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } else {
      setMessage(res.data.message);
    }
  } catch (error) {
    setMessage("Something went wrong");
  }
};


  return (
    <div className="max-w-xl mx-auto py-20 px-4">
      <h2 className="text-2xl mb-6">My Profile</h2>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        className="w-full border p-3 mb-4"
        placeholder="Name"
      />

      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        className="w-full border p-3 mb-4"
        placeholder="Email"
      />

      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        className="w-full border p-3 mb-4"
        placeholder="Phone"
      />

      <textarea
        name="address"
        value={form.address}
        onChange={handleChange}
        className="w-full border p-3 mb-6"
        placeholder="Address"
      />

      <button
        onClick={handleSave}
        className="w-full bg-black text-white py-3"
      >
        SAVE PROFILE
      </button>

      <h2 className="text-lg mt-10 mb-4">Change Password</h2>

<input
  type="password"
  name="currentPassword"
  placeholder="Current Password"
  value={passwords.currentPassword}
  onChange={handlePasswordChange}
  className="input w-full mb-3"
/>

<input
  type="password"
  name="newPassword"
  placeholder="New Password"
  value={passwords.newPassword}
  onChange={handlePasswordChange}
  className="input w-full mb-3"
/>

<input
  type="password"
  name="confirmPassword"
  placeholder="Confirm New Password"
  value={passwords.confirmPassword}
  onChange={handlePasswordChange}
  className="input w-full mb-3"
/>

<button
  onClick={submitPasswordChange}
  className="w-full bg-black text-white py-3 mt-2"
>
  CHANGE PASSWORD
</button>

{message && (
  <p className="text-sm mt-3 text-center text-red-500">{message}</p>
)}

    </div>
  );
};

export default Profile;
