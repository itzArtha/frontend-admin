import moment from "moment";
import MainBox from "./MainBox";
import CurrencyFormat from "react-currency-format";
import MainButton from "./MainButton";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import SecondaryButton from "./SecondaryButton";

const TableEvent = ({ callback, data, changePage, changePerPage }) => {
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  let events = data.data ?? [];
  let total = data.meta?.total ?? 10;

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
      name: "Nama Event",
      selector: (row) => row.title,
      format: (item) => (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => {
            return window.open(item.event_url);
          }}
        >
          <div className="flex-shrink-0 h-10 w-10">
            <img
              className="h-10 w-10 rounded-full"
              src={item.title.banner_url}
              alt=""
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {item.title.label}
            </div>
            <div className="text-sm text-gray-500">{item.owner}</div>
          </div>
        </div>
      ),
    },
    {
      name: "Lokasi",
      selector: (row) => row.location,
      format: (item) => (
        <div>
          <div className="text-sm text-gray-900">{item.location.label}</div>
          <div className="text-sm text-gray-500">
            {item.location.is_online ? "Online" : "Offline"}
          </div>
        </div>
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
      name: "Kelengkapan",
      selector: (row) => row.doc_complete,
      sortable: true,
    },
    {
      name: "Tanggal Dibuat",
      selector: (row) => row.created_at,
      sortable: true,
      format: (row) => moment(row.created_at).format("lll"),
    },
  ];

  const items = events.map((event, key) => {
    return {
      id: event.eventId,
      event_url: event.event_url,
      owner: event.owner,
      title: {
        label: event.title,
        banner_url: event.banner_url,
      },
      doc_complete: event.doc_complete,
      location: {
        label: event.location,
        is_online: event.is_online,
      },
      status: {
        color: event.status.color,
        label: event.status.label,
      },
      ktp: event.ktp,
      izin: event.izin,
      booking: event.booking,
      created_at: event.created_at,
      total_participants: event.total_participants,
      total_sales: event.total_sales,
    };
  });

  const ExpandedComponent = ({ data }) => (
    <div className={"p-4"}>
      <div className={"text-center mt-2"}>
        <SecondaryButton
          label={"Lihat KTP"}
          className={"m-1"}
          onClick={() => {
            return window.open(data.ktp);
          }}
        />
        <SecondaryButton
          label={"Lihat Surat Izin"}
          className={"m-1"}
          onClick={() => {
            return window.open(data.izin);
          }}
        />
        <SecondaryButton
          label={"Lihat Bukti Booking GS"}
          className={"m-1"}
          onClick={() => {
            return window.open(data.booking);
          }}
        />
      </div>
      <div className={"text-center mt-2"}>
        <MainButton
          label={"Konfirmasi"}
          className={"m-1"}
          onClick={() => {
            return window.open(`/explore/event/${data.slug}`);
          }}
        />
        <MainButton
          label={"Tolak"}
          className={"m-1"}
          onClick={() => {
            return window.open(`/admin/event/${data.slug}?tab=peserta`);
          }}
        />
        <MainButton
          label={"Suspend"}
          className={"m-1"}
          onClick={() => {
            return window.open(`/admin/event/${data.slug}?tab=penjualan`);
          }}
        />
      </div>
    </div>
  );

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
              expandableRows
              expandableRowsComponent={ExpandedComponent}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default TableEvent;
