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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 my-8">
          <div className="flex justify-center">
            <div className="w-full mb-8">
              <Doughnut
                data={usersOrg}
                options={{
                  responsive: true,
                  plugins: {
                    title: {
                      display: true,
                      text: "Data Users",
                    },
                    legend: {
                      display: false,
                      position: "bottom",
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-full mb-8">
              <Pie
                data={TransacData}
                options={{
                  responsive: true,
                  plugins: {
                    title: {
                      display: true,
                      text: "Data Transaksi",
                    },
                    legend: {
                      display: false,
                      position: "bottom",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-full mb-8">
            <Bar
              data={datas}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: "Data Pendapatan Harian",
                  },
                  legend: {
                    display: false,
                    position: "bottom",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
