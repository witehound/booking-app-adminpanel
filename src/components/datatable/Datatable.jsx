import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import { useEffect } from "react";

const API_BASE_URL = process.env.REACT_APP_VITE_API_BASE_URL;

const Datatable = () => {
  const [list, setList] = useState([]);
  const { data, error, loading } = useFetch(`${API_BASE_URL}/user`);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/user/${id}`, {
        withCredentials: true,
      });
    } catch (error) {}
    setList(list.filter((item) => item._id !== id));
  };

  useEffect(() => {
    setList(data);
  }, [data]);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
