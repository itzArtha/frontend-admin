import TableEvent from "../../components/TableEvent";
import MainInput from "../../components/MainInput";
import { useCallback, useEffect, useState } from "react";
import apiClient from "../../components/services/apiClient";
import toast, { Toaster } from "react-hot-toast";
import isAdmin from "../../components/services/isAdmin";

const Event = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [changed, setChanged] = useState(false);

  const callback = useCallback((data, status) => {
    handleSetStatus(data, status);
  }, []);

  useEffect(() => {
    fetchData(10, 1);
  }, [changed]);

  const fetchData = (perPage, page, search = "") => {
    apiClient()
      .get(`/admin/events?perPage=${perPage}&page=${page}&search=${search}`)
      .then((r) => {
        setData(r.data);
      })
      .catch((err) => {
        isAdmin(err.response.status);
      });
  };

  const handleSetStatus = (data, status) => {
    apiClient()
      .put("/admin/events?eventId=" + data, {
        status: status,
      })
      .then((r) => {
        toast("Mantap kawan!", {
          icon: "👏",
          style: {
            background: "#02a231",
            color: "#fff",
          },
        });
        setChanged(true);
      });
  };

  const handlePageChange = (page, perPage) => {
    fetchData(perPage, page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    fetchData(newPerPage, page);
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={"md:w-1/3 w-full ml-auto my-4"}>
        <MainInput
          onKeyPress={(e) => {
            if (e.keyCode === 13) {
              fetchData(10, 1, e.target.value);
            }
          }}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
          placeholder={"Cari event"}
        />
      </div>
      <div>
        <TableEvent
          data={data}
          callback={callback}
          changePage={handlePageChange}
          changePerPage={handlePerRowsChange}
        />
      </div>
    </>
  );
};
export default Event;
