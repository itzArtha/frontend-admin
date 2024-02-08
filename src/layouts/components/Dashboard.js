import MainBox from "../../components/MainBox";
import CurrencyFormat from "react-currency-format";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useEffect, useState } from "react";
import apiClient from "../../components/services/apiClient";
import isAdmin from "../../components/services/isAdmin";
const Dashboard = () => {
  Chart.register(...registerables);

  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = () => {
      apiClient()
        .get("/admin/dashboard")
        .then((r) => {
          setData(r.data);
        })
        .catch((err) => {
          isAdmin(err.response.status);
        });
    };
    fetchData();
  }, []);

  const datas = {
    labels: data.dailyRevenueChart ? data.dailyRevenueChart.label : [],
    datasets: [
      {
        backgroundColor: ["rgba(255, 99, 132, 0.7)"],
        data: data.dailyRevenueChart ? data.dailyRevenueChart.data : [],
        borderWidth: 2,
        borderRadius: 100,
        borderSkipped: false,
      },
    ],
  };
  const usersOrg = {
    labels: data.userDataChart ? data.userDataChart.label : [],
    datasets: [
      {
        backgroundColor: ["rgba(255,34,134,0.5)", "rgba(54, 162, 235, 0.5)"],
        data: data.userDataChart ? data.userDataChart.data : [],
        borderSkipped: false,
      },
    ],
  };
  const TransacData = {
    labels: data.userTransactionChart ? data.userTransactionChart.label : [],
    datasets: [
      {
        backgroundColor: ["rgba(162,8,255,0.5)", "rgba(14,59,250,0.5)"],
        data: data.userTransactionChart ? data.userTransactionChart.data : [],
        borderSkipped: false,
      },
    ],
  };

  return (
    <>
      <div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <MainBox className="bg-yellow-400 hover:bg-yellow-300">
            <div className="font-semibold text-3xl pb-2">{data.totalUser}</div>
            <div className="font-light text-lg text-right pt-2">Users</div>
          </MainBox>
          <MainBox className="bg-yellow-400 hover:bg-yellow-300">
            <div className="font-semibold text-3xl pb-2">
              {
                <CurrencyFormat
                  value={data.totalRevenue}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Rp"}
                />
              }
            </div>
            <div className="font-light text-lg text-right pt-2">Revenue</div>
          </MainBox>
          <MainBox className="bg-yellow-400 hover:bg-yellow-300">
            <div className="font-semibold text-3xl pb-2">
              {data.totalTransaction}
            </div>
            <div className="font-light text-lg text-right pt-2">Transaksi</div>
          </MainBox>
          <MainBox className="bg-yellow-400 hover:bg-yellow-300">
            <div className="font-semibold text-3xl pb-2">
              {data.totalActiveEvent}
            </div>
            <div className="font-light text-lg text-right pt-2">
              Event Aktif
            </div>
          </MainBox>
        </div>
        <div className={"text-center mt-48"}>
          Gak isi chart - chart ga jelas web lemot
        </div>
      </div>
    </>
  );
};
export default Dashboard;
