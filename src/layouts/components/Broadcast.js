import { useEffect, useState } from "react";
import apiClient from "../../components/services/apiClient";
import isAdmin from "../../components/services/isAdmin";
import SelectInput from "./SelectInput";
import Label from "./Label";
import MainInput from "../../components/MainInput";
import MainButton from "../../components/MainButton";
import toast from "react-hot-toast";
const Dashboard = () => {
  const [announcement, setAnnouncement] = useState({
    to: "users",
    subject: "",
    template: "",
  });
  const [loading, setLoading] = useState(false);

  const sendBroadcast = () => {
    setLoading(true);
    apiClient()
      .post("/admin/broadcast", {
        to: announcement.to,
        subject: announcement.subject,
        template: announcement.template,
      })
      .then((r) => {
        toast("Mantap kawan!", {
          icon: "👏",
          style: {
            background: "#02a231",
            color: "#fff",
          },
        });

        setLoading(false);
      })
      .catch((err) => {
        isAdmin(err.response.status);
      });
  };

  return (
    <>
      <div className={"md:mx-48"}>
        <div className="my-2">
          <Label label="Kepada" />
          <SelectInput
            onChange={(e) => {
              setAnnouncement({ ...announcement, to: e.target.value });
            }}
            value={announcement.to}
          >
            <option value="1">Pengguna</option>
            <option value="0">Organisasi</option>
            <option value="all">Pengguna & Organisasi</option>
          </SelectInput>
        </div>
        <div className="my-2">
          <Label label="Subyek" />
          <MainInput
            onChange={(e) => {
              setAnnouncement({ ...announcement, subject: e.target.value });
            }}
            value={announcement.subject}
            type="text"
          />
        </div>
        <div className="my-2">
          <Label label="Nama Template" />
          <MainInput
            onChange={(e) => {
              setAnnouncement({ ...announcement, template: e.target.value });
            }}
            value={announcement.template}
            type="text"
          />
        </div>
        <div className={"my-8 text-center"}>
          <MainButton
            onClick={() => {
              sendBroadcast();
            }}
            className={"md:w-72 w-full"}
            label={loading ? "Loading..." : "Kirim"}
          />
        </div>
      </div>
    </>
  );
};
export default Dashboard;
