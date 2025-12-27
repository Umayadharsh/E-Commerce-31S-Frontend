import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Account = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-10">
      <h1 className="text-2xl">Welcome, {user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
};

export default Account;
