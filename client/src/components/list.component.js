import React, { useState, useEffect, useMemo, useRef } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { useTable } from "react-table";

import BioDataService from "../services/biodata.service";

const BioDataList = (props) => {
  const [biodatas, setBioDatas] = useState([]);
  const [searchTargetName, setSearchTargetName] = useState("");
  const biodatasRef = useRef();

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const pageSizes = [5, 10, 15];

  biodatasRef.current = biodatas;

  useEffect(() => {
    retrieveBioDatas();
  }, []);

  const onChangeSearchTargetName = (e) => {
    const searchTargetName = e.target.value;
    setSearchTargetName(searchTargetName);
  };

  const getRequestParams = (searchTargetName, page, pageSize) => {
    let params = {};

    if (searchTargetName) {
      params["targetName"] = searchTargetName;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  const retrieveBioDatas = () => {
    const params = getRequestParams(searchTargetName, page, pageSize);

    BioDataService.getAll(params)
      .then((response) => {
        const { biodatas, totalPages } = response.data;
        setCount(totalPages);
        setBioDatas(biodatas);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(retrieveBioDatas, [page, pageSize]);

  const refreshList = () => {
    retrieveBioDatas();
  };

  const removeAllBioDatas = () => {
    BioDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByTargetName = () => {
    setPage(1);
    retrieveBioDatas();
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
        Header: "Target Name",
        accessor: "targetName",
      },
      {
        Header: "Accession",
        accessor: "accession",
      },
      {
        Header: "Query Name",
        accessor: "queryName",
      },
      {
        Header: "Accession",
        accessor: "acession",
      },
      {
        Header: "Mdl",
        accessor: "mdl",
      },
      {
        Header: "Mdl From",
        accessor: "mdlFrom",
      },
      {
        Header: "Mdl To",
        accessor: "mdlTo",
      },
      {
        Header: "Seq From",
        accessor: "seqFrom",
      },
      {
        Header: "Seq To",
        accessor: "seqTo",
      },
      {
        Header: "Strand",
        accessor: "strand",
      },
      {
        Header: "Trunc",
        accessor: "trunc",
      },
      {
        Header: "Pass",
        accessor: "pass",
      },
      {
        Header: "GC",
        accessor: "gc",
      },
      {
        Header: "Bias",
        accessor: "bias",
      },
      {
        Header: "Score",
        accessor: "score",
      },
      {
        Header: "eValue",
        accessor: "eValue",
      },
      {
        Header: "Inc",
        accessor: "inc",
      },
      {
        Header: "Description of Target",
        accessor: "descriptionOfTarget",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: biodatas,
    });

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <div className="list row">
            <div className="col-6">
              <div className="input-group mb-2">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Search by Target Name"
                  value={searchTargetName}
                  onChange={onChangeSearchTargetName}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-sm btn-outline"
                    id="btn-search"
                    type="button"
                    onClick={findByTargetName}
                  >
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="col-6">
              <button
                className="btn-sm btn btn-danger "
                onClick={removeAllBioDatas}
              >
                Remove All
              </button>
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

export default BioDataList;
