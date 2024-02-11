import CurrencyFormat from "react-currency-format";
import moment from "moment";
import MainButton from "./MainButton";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";

const TableWithdraw = ({ data, callback, changePage, changePerPage }) => {
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  let withdraws = data.data ?? [];
  let total = data.meta?.total ?? 10;

  const items = withdraws.map((withdraw, key) => {
    return {
      id: withdraw.withdrawId,
      account: {
        name: withdraw.accountName,
        no: withdraw.accountId,
      },
      bank: withdraw.bankName,
      balanceBeforeWd: withdraw.balanceBeforeWd,
      balanceAfterWd: withdraw.balanceAfterWd,
      amount: withdraw.amount,
      status: withdraw.status,
      withdrawAt: withdraw.withdrawDate,
      action: withdraw.withdrawId,
    };
  });

  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
      sortable: true,
      width: "30px",
      right: true,
      compact: true,
    },
    {
      name: "Akun Bank",
      selector: (row) => row.account,
      width: "240px",
      format: (row) => (
        <div className="flex items-center">
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {row.account.name}
            </div>
            <div
              className="text-sm text-gray-500 cursor-pointer"
              onClick={() => {
                copyTextToClipboard(row.account.no);
              }}
            >
              {row.account.no} <i className={"far fa-clipboard"}></i>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "Nama Bank",
      selector: (row) => row.bank,
      format: (row) => (
        <div className="flex items-center">
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{row.bank}</div>
          </div>
        </div>
      ),
    },
    {
      name: "Jumlah Penarikan",
      selector: (row) => row.amount,
      sortable: true,
      format: (row) => (
        <CurrencyFormat
          value={row.amount}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"Rp"}
        />
      ),
    },
    {
      name: "Setelah Penarikan",
      selector: (row) => row.balanceAfterWd,
      sortable: true,
      format: (row) => (
        <CurrencyFormat
          value={row.balanceAfterWd}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"Rp"}
        />
      ),
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      format: (row) => (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${row.status.color}`}
        >
          {row.status.label}
        </span>
      ),
    },
    {
      name: "Tanggal Penarikan",
      selector: (row) => row.withdrawAt,
      sortable: true,
      format: (row) => moment(row.withdrawAt).format("lll"),
    },
    {
      name: "Konfirmasi",
      selector: (row) => row.action,
      sortable: true,
      format: (row) => (
        <>
          {row.status.key === "pending" ? (
            <MainButton
              onClick={() => {
                callback(row.id);
              }}
              label={"Confirm"}
            />
          ) : (
            ""
          )}
        </>
      ),
    },
  ];

  useEffect(() => {
    setTotalRows(total);
  }, [data]);

  const handlePageChange = async (page) => {
    await changePage(page, perPage);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    await changePerPage(newPerPage, page);
    setPerPage(newPerPage);
  };

  const copyTextToClipboard = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy);
    toast("No. Rekening Berhasil Disalin", {
      icon: "👏",
      style: {
        background: "#02a231",
        color: "#fff",
      },
    });
  };

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <DataTable
              columns={columns}
              data={items}
              pagination
              paginationServer
              paginationTotalRows={totalRows}
              onChangeRowsPerPage={handlePerRowsChange}
              onChangePage={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default TableWithdraw;
