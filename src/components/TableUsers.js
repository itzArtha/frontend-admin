import moment from "moment";
import DataTable from "react-data-table-component";
import {useEffect, useState} from "react";

const TableUsers = ({ data, changePerPage, changePage }) => {
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  let users = data.data ?? [];
  let total = data.meta?.total ?? 10;

  const items = users.map((user, key) => {
    return {
      id: user.userId,
      identity: {
        name: user.name,
        username: user.username,
        image: user.photoUrl
      },
      contact: {
        email: user.email,
        phone: user.phone,
      },
      role: user.role,
      join_at: user.joinAt
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
      name: "Identitas",
      selector: (row) => row.identity,
      format: (row) => (
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              <img
                  className="h-10 w-10 rounded-full"
                  src={row.identity.image}
                  alt=""
              />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {row.identity.name}
              </div>
              <div className="text-sm text-gray-500">{row.identity.username}</div>
            </div>
          </div>
      ),
    },
    {
      name: "Kontak",
      selector: (row) => row.contact,
      format: (row) => (
          <div className="flex items-center">
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {row.contact.email}
              </div>
              <div className="text-sm text-gray-500">{row.contact.phone}</div>
            </div>
          </div>
      ),
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true
    },
    {
      name: "Tanggal Registrasi",
      selector: (row) => row.join_at,
      sortable: true,
      format: (row) => moment(row.join_at).format("lll"),
    },
  ];

  useEffect(() => {
    setTotalRows(total);
  }, [data])

  const handlePageChange = async (page) => {
    await changePage(page, perPage);
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    await changePerPage(newPerPage, page);
    setPerPage(newPerPage);
  }

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
export default TableUsers;
