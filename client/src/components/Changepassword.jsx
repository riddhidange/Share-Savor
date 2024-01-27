import React, { useState } from "react";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword === confirmPassword) {
      console.log("Password changed successfully!");
      setError("");
    } else {
      setError("New password and confirm password do not match.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 h-full">
      <div className="w-3/6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Change Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="currentPassword"
              className="text-lg text-gray-600 block"
            >
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              className="border p-2 w-full"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="text-lg text-gray-600 block"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="border p-2 w-full"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="text-lg text-gray-600 block"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="border p-2 w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="bg-primary text-white p-2 rounded-md"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
