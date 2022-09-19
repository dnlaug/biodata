import React, { useState, useEffect, useMemo, useRef } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { useTable } from "react-table";

import UserService from "../services/user.service";

const BoardAdmin = (props) => {
  const [users, setUsers] = useState([]);
  const [searchUsername, setSearchUsername] = useState("");
  const usersRef = useRef();

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(3);

  const pageSizes = [3, 6, 9];

  usersRef.current = users;

  useEffect(() => {
    retrieveUsers();
  }, []);

  const onChangeSearchUsername = (e) => {
    const searchUsername = e.target.value;
    setSearchUsername(searchUsername);
  };

  const getRequestParams = (searchUsername, page, pageSize) => {
    let params = {};

    if (searchUsername) {
      params["username"] = searchUsername;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  const retrieveUsers = () => {
    const params = getRequestParams(searchUsername, page, pageSize);

    UserService.getAdminBoard(params)
      .then((response) => {
        const { users, totalPages } = response.data;
        setCount(totalPages);
        setUsers(users);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(retrieveUsers, [page, pageSize]);

  const refreshList = () => {
    retrieveUsers();
  };

  const findByUserName = () => {
    setPage(1);
    retrieveUsers();
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "id",
      },
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Created At (UTC)",
        accessor: "createdAt",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: users,
    });

  return (
    <div>
      <div className="card">
        <h5 className="card-header">List of Users</h5>
        <div className="card-body">
          <div className="list row">
            <div className="col-6">
              <div className="input-group mb-2">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Search by Target Name"
                  value={searchUsername}
                  onChange={onChangeSearchUsername}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-sm btn-outline"
                    id="btn-search"
                    type="button"
                    onClick={findByUserName}
                  >
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="input-group mt-2">
              <div className="input-group-sm input-group-append">
                <label className="input-group-text">Items per Page</label>
              </div>
              <select
                className="custom-select "
                onChange={handlePageSizeChange}
                value={pageSize}
              >
                {pageSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg list">
        <div className="table-responsive mt-2">
          <table
            className="table table-hover table-sm table-bordered "
            {...getTableProps()}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                  className="table-dark"
                  {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        className="my-2"
        count={count}
        page={page}
        siblingCount={1}
        boundaryCount={1}
        variant="outlined"
        shape="rounded"
        onChange={handlePageChange}
      />
    </div>
  );
};

export default BoardAdmin;
