import TableEvent from "../../components/TableEvent";
import MainInput from "../../components/MainInput";

const Event = () => {
  return (
    <div>
      <div className={"md:w-1/3 w-full ml-auto my-4"}>
        <MainInput placeholder={"Cari event"} />
      </div>
      <div>
        <TableEvent data={[]} />
      </div>
    </div>
  );
};
export default Event;
