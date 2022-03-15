import TableRevenue from "../../components/TableRevenue";
import MainBox from "../../components/MainBox";
import CurrencyFormat from "react-currency-format";
import MainButton from "../../components/MainButton";
import MainInput from "../../components/MainInput";

const Revenue = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MainBox className="bg-yellow-400 hover:bg-yellow-300 pt-8">
          <div className="font-semibold text-5xl pb-4">
            <CurrencyFormat
              value={0}
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
              value={0}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Rp"}
            />
          </div>
          <div className="font-light text-lg pt-4">Total pendapatan bersih</div>
        </MainBox>
      </div>
      <div className={"md:w-1/3 w-full ml-auto mt-12 mb-4"}>
        <MainInput placeholder={"Cari pendapatan"} />
      </div>
      <div>
        <TableRevenue data={[]} />
      </div>
    </div>
  );
};
export default Revenue;
