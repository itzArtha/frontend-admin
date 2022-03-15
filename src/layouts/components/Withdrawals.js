import TableWithdraw from "../../components/TableWithdraw";
import MainInput from "../../components/MainInput";
const Withdrawals = () => {
  return (
    <div>
      <div className={"md:w-1/3 w-full ml-auto my-4"}>
        <MainInput placeholder={"Cari penarikan"} />
      </div>
      <div>
        <TableWithdraw data={[]} />
      </div>
    </div>
  );
};
export default Withdrawals;
