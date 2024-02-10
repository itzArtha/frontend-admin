import TableEvent from "../../components/TableEvent";
import MainInput from "../../components/MainInput";
import { useCallback, useEffect, useState } from "react";
import apiClient from "../../components/services/apiClient";
import toast, { Toaster } from "react-hot-toast";
import isAdmin from "../../components/services/isAdmin";

const Event = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const callback = useCallback((data, status) => {
    handleSetStatus(data, status);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    apiClient()
      .get("/admin/events")
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
        fetchData();
      });
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={"md:w-1/3 w-full ml-auto my-4"}>
        <MainInput
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
          placeholder={"Cari event"}
        />
      </div>
      <div>
        <TableEvent data={data} callback={callback} />
      </div>
    </>
  );
};
export default Event;
