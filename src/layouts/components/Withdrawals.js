import TableWithdraw from "../../components/TableWithdraw";
import MainInput from "../../components/MainInput";
import { useCallback, useEffect, useState } from "react";
import apiClient from "../../components/services/apiClient";
import toast, { Toaster } from "react-hot-toast";
import isAdmin from "../../components/services/isAdmin";
const Withdrawals = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    apiClient()
      .get("/admin/withdraws")
      .then((r) => {
        setData(r.data);
      })
      .catch((err) => {
        isAdmin(err.response.status);
      });
  };
  const filteredWithdraws = data.filter((account) => {
    return account.accountName.toLowerCase().includes(search.toLowerCase());
  });

  const callback = useCallback((data) => {
    handleConfirmation(data);
  }, []);

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
          placeholder={"Cari penarikan"}
        />
      </div>
      <div>
        <TableWithdraw data={filteredWithdraws} callback={callback} />
      </div>
    </>
  );
};
export default Withdrawals;
