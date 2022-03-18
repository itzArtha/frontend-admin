import TableUsers from "../../components/TableUsers";
import MainInput from "../../components/MainInput";
import { useEffect, useState } from "react";
import apiClient from "../../components/services/apiClient";
import isAdmin from "../../components/services/isAdmin";

const Users = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchData = () => {
      apiClient()
        .get("/admin/users")
        .then((r) => {
          setData(r.data);
        })
        .catch((err) => {
          isAdmin(err.response.status);
        });
    };
    fetchData();
  }, []);

  const filteredUsers = data.filter((user) => {
    return user.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <div className={"md:w-1/3 w-full ml-auto my-4"}>
        <MainInput
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
          placeholder={"Cari users"}
        />
      </div>
      <TableUsers data={filteredUsers} />
    </div>
  );
};
export default Users;
