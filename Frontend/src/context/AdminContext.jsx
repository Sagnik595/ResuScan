import React, {
  createContext,
  useState,
} from "react";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [adminData, setAdminData] = useState(null);

  return (
    <AdminContext.Provider
      value={{
        adminData,
        setAdminData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;