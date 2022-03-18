import TableRevenue from "../../components/TableRevenue";
import MainBox from "../../components/MainBox";
import CurrencyFormat from "react-currency-format";
import MainInput from "../../components/MainInput";
import { useEffect, useState } from "react";
import apiClient from "../../components/services/apiClient";
import isAdmin from "../../components/services/isAdmin";

const Revenue = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState({});
  const [dataTable, setDataTable] = useState([]);
  useEffect(() => {
    const fetchData = () => {
      apiClient()
        .get("/admin/revenues")
        .then((r) => {
          setData(r.data);
          setDataTable(r.data.data);
        })
        .catch((err) => {
          isAdmin(err.response.status);
        });
    };
    fetchData();
  }, []);

  const filteredRevenues = dataTable.filter((transaction) => {
    return transaction.transactionName
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MainBox className="bg-yellow-400 hover:bg-yellow-300 pt-8">
          <div className="font-semibold text-5xl pb-4">
            <CurrencyFormat
              value={data.revenue}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Rp"}
            />
          </div>
          <div className="font-light text-lg pt-4">Total pendapatan kotor</div>
        </MainBox>
        <MainBox className="bg-red-400 hover:bg-red-300 pt-8">
          <div className="font-semibold text-5xl pb-4">
            <CurrencyFormat
              value={data.profit}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Rp"}
            />
          </div>
          <div className="font-light text-lg pt-4">Total pendapatan bersih</div>
        </MainBox>
      </div>
      <div className={"md:w-1/3 w-full ml-auto mt-12 mb-4"}>
        <MainInput
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
          placeholder={"Cari pendapatan"}
        />
      </div>
      <div>
        <TableRevenue data={filteredRevenues} />
      </div>
    </div>
  );
};
export default Revenue;
