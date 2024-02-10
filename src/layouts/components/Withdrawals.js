import TableWithdraw from "../../components/TableWithdraw";
import MainInput from "../../components/MainInput";
import { useCallback, useEffect, useState } from "react";
import apiClient from "../../components/services/apiClient";
import toast, { Toaster } from "react-hot-toast";
import isAdmin from "../../components/services/isAdmin";
const Withdrawals = () => {
  const [data, setData] = useState([]);
  const [changed, setChanged] = useState(false);
  useEffect(() => {
    fetchData(10, 1);
  }, [changed]);

  const fetchData = (perPage, page) => {
    apiClient()
      .get(`/admin/withdraws?perPage=${perPage}&page=${page}`)
      .then((r) => {
        setData(r.data);
      })
      .catch((err) => {
        isAdmin(err.response.status);
      });
  };

  const callback = useCallback((data) => {
    handleConfirmation(data);
  }, []);

  const handlePageChange = (page, perPage) => {
    fetchData(perPage, page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    fetchData(newPerPage, page);
  };

  const handleConfirmation = (data) => {
    apiClient()
      .put("/admin/withdraws?withdrawId=" + data, {
        status: "settlement",
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

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div>
        <TableWithdraw
          changePage={handlePageChange}
          changePerPage={handlePerRowsChange}
          data={data}
          callback={callback}
        />
      </div>
    </>
  );
};
export default Withdrawals;
