import TableUsers from "../../components/TableUsers";
import MainInput from "../../components/MainInput";

const Users = () => {
  return (
    <div>
      <div className={"md:w-1/3 w-full ml-auto my-4"}>
        <MainInput placeholder={"Cari users"} />
      </div>
      <TableUsers data={[]} />
    </div>
  );
};
export default Users;
