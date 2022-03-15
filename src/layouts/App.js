import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Dashboard from "./components/Dashboard";
import Users from "./components/Users";
import Withdrawals from "./components/Withdrawals";
import Revenue from "./components/Revenue";
import Event from "./components/Event";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const history = useHistory();
  const { slug } = useParams();

  const handleContent = () => {
    switch (slug) {
      case "dashboard":
        return {
          view: <Dashboard />,
          text: "Dashboard",
        };
      case "users":
        return {
          view: <Users />,
          text: "Users",
        };
      case "withdrawals":
        return {
          view: <Withdrawals />,
          text: "Penarikan",
        };
      case "revenue":
        return {
          view: <Revenue />,
          text: "Pendapatan",
        };
      case "event":
        return {
          view: <Event />,
          text: "Event",
        };
      default:
        window.location.href = `/dashboard`;
        break;
    }
  };
  return (
    <>
      <div className="flex">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          route={slug}
          data={data}
          loading={loading}
        />
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="p-4 md:ml-72">
            <h2 className="capitalize font-semibold text-2xl">
              {handleContent().text}
            </h2>
            <div className="mt-4">{handleContent().view}</div>
          </main>
        </div>
      </div>
    </>
  );
};
export default App;
