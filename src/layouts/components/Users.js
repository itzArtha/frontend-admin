import TableUsers from "../../components/TableUsers";
import MainInput from "../../components/MainInput";
import { useEffect, useState } from "react";
import apiClient from "../../components/services/apiClient";
import isAdmin from "../../components/services/isAdmin";

const Users = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetchData(10, 1);
  }, []);

    const fetchData = (perPage, page, search = '') => {
        apiClient()
            .get(`/admin/users?perPage=${perPage}&page=${page}&search=${search}`)
            .then((r) => {
                setData(r.data);
            })
            .catch((err) => {
                isAdmin(err.response.status);
            });
    };

    const handlePageChange = (page, perPage) => {
        fetchData(perPage, page)
    }

    const handlePerRowsChange = async (newPerPage, page) => {
        fetchData(newPerPage, page)
    }

  return (
    <div>
      <div className={"md:w-1/3 w-full ml-auto my-4"}>
        <MainInput
            onKeyPress={(e) => {
                if (e.keyCode === 13) {
                    fetchData(10, 1, e.target.value)
                }
            }}
          onChange={(e) => {
              setSearch(e.target.value);
          }}
          value={search}
          placeholder={"Cari users"}
        />
      </div>
      <TableUsers changePage={handlePageChange} changePerPage={handlePerRowsChange} data={data} />
    </div>
  );
};
export default Users;
