import React, { useEffect, useRef, useState } from "react";
import "./DataGrid.css";
import Pagination from "./Pagination/Pagination";
import Snackbar from "../Snackbar/Snackbar";

function DataGridComponent({ type, heightRef }) {
  // Service must have getAll and getOne methods

  // Data state
  const [data, setData] = useState();
  const [rows, setRows] = useState();
  const [columns, setColumns] = useState();

  // Duplicate detection state
  const [hasDuplicates, setHasDuplicates] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Sorting and search state
  const [sortOrder, setSortOrder] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const controlsRef = useRef(null);

  // Editing state
  const [isEditing, setIsEditing] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  // State to hold the edited item
  const [editedItem, setEditedItem] = useState(null);

  const [snackbar, setSnackbar] = useState({ message: "", show: false });
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (heightRef.current) {
      setHeight(
        (prevHeight) => prevHeight + heightRef.current.clientHeight - 32
      );
    }
  }, [heightRef]);

  useEffect(() => {
    if (controlsRef.current) {
      setHeight(
        (prevHeight) => prevHeight + controlsRef.current.clientHeight - 16
      );
    }
    window.addEventListener("load", setGridDimensions);
  }, [controlsRef]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery !== "") {
      const filteredData = data.filter((item) =>
        Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setRows(filteredData.slice(0, 10));
      setTotalPages(Math.ceil(filteredData.length / 10));
      setCurrentPage(1);
    }
  }, [searchQuery]);

  const fetchData = async () => {
    const res = await type.getAll();
    setData(res);
    setRows(res.slice(0, 10));
    setColumns(
      Object.keys(res[0]).map((key) => ({
        field: key,
        headerName: key,
        editType: "text",
      }))
    );
    setTotalPages(Math.ceil(res.length / 10));
  };

  const setGridDimensions = () => {
    const headers = document.querySelectorAll(".data-grid-header-cell");
    headers.forEach((header) => {
      const id = header.id;
      const el = document.querySelector(`.${id}`);
      header.style.width = `${el.clientWidth + 1}px`;
    });
  };

  const findDuplicates = () => {
    const duplicatesArray = [];

    for (let i = 0; i < data.length; i++) {
      for (let j = i + 1; j < data.length; j++) {
        const item1 = data[i];
        const item2 = data[j];

        const isDuplicate = Object.keys(item1).some(
          (key) => key !== "id" && key !== "type" && item1[key] === item2[key]
        );

        if (isDuplicate) {
          if (!duplicatesArray.some((item) => item.id === data[i].id)) {
            duplicatesArray.push(data[i]);
          }
          if (!duplicatesArray.some((item) => item.id === data[j].id)) {
            duplicatesArray.push(data[j]);
          }
        }
      }
    }
    setData(duplicatesArray);
    setRows(duplicatesArray.slice(0, 10));
    setTotalPages(Math.ceil(duplicatesArray.length / 10));
    setHasDuplicates(duplicatesArray.length > 0);
    setCurrentPage(1);
  };

  const clearDuplicates = () => {
    setHasDuplicates(false);
    fetchData();
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setRows(data.slice((page - 1) * 10, page * 10));
  };

  const handleSort = (field) => {
    const sortedData = [...data];
    if (sortOrder === "asc") {
      sortedData.sort((a, b) => {
        if (a[field] < b[field]) return -1;
        if (a[field] > b[field]) return 1;
        return 0;
      });
    }
    if (sortOrder === "desc") {
      sortedData.sort((a, b) => {
        if (a[field] < b[field]) return 1;
        if (a[field] > b[field]) return -1;
        return 0;
      });
    }
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setData(sortedData);
    setRows(sortedData.slice(0, 10));
  };

  const handleEdit = (row) => {
    setIsEditing(true);
    setEditedItem(row);
    setEditingRow(row);
  };

  const submitEdit = async (row) => {
    try {
      if (editedItem.id === "") {
        const newItem = await type.create(editedItem);
        const updatedData = data.filter((item) => item.id !== "");
        setData([newItem, ...updatedData]);
        setRows([newItem, ...updatedData].slice(0, 10));
        setSnackbar({ message: "Row created successfully", show: true });
      } else {
        type.update(editedItem);
        const updatedData = data.map((item) =>
          item.id === row.id ? editedItem : item
        );
        setData(updatedData);
        setRows(updatedData.slice((currentPage - 1) * 10, currentPage * 10));
        setSnackbar({ message: "Row updated successfully", show: true });
      }
    } catch (error) {
      setSnackbar({ message: "Error updating row", show: true });
    }
    setIsEditing(false);
    setEditingRow(null);
    setEditedItem(null);
  };

  const handleAdd = () => {
    const newItem = {
      id: "new",
      ...columns.reduce((acc, column) => ({ ...acc, [column.field]: "" }), {}),
    };
    newItem.id = "";
    setData([newItem, ...data]);
    setRows([newItem, ...data].slice(0, 10));
    setTotalPages(Math.ceil((data.length + 1) / 10));
    setCurrentPage(1);
    setIsEditing(true);
    setEditingRow(newItem);
    setEditedItem(newItem);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingRow(null);
    setEditedItem(null);
    if (Object.values(editedItem).every((value) => value === "")) {
      handleDelete(editedItem.id, false);
    }
  };

  const handleInputChange = (e, field) => {
    console.log(field);
    setEditedItem({ ...editedItem, [field]: e.target.value });
  };

  const handleDelete = (id, showSnackbar = true) => {
    type.delete(id);
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    setRows(updatedData.slice(0, 10));
    setTotalPages(Math.ceil(updatedData.length / 10));
    setCurrentPage(1);
    if (showSnackbar) {
      setSnackbar({ message: "Row deleted successfully", show: true });
    }
  };

  return (
    <div>
      <div className="data-grid-controls" ref={controlsRef}>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={findDuplicates}>Find Duplicates</button>
        {hasDuplicates && (
          <button onClick={clearDuplicates}>Clear Duplicates</button>
        )}
        <button onClick={() => handleAdd()}>Add Item</button>
      </div>
      {rows && columns && (
        <div
          className="data-grid"
          style={{ height: `calc(100vh - ${height}px - 3rem)` }}
        >
          <div className="data-grid-header">
            {columns.map((column) => (
              <div
                key={column.field}
                className="data-grid-header-cell"
                id={column.field}
                onClick={() => handleSort(column.field)}
              >
                {column.headerName}
                <span className="sort-icon">⇅</span>
              </div>
            ))}
            <div className="data-grid-header-cell" id="actions">
              Actions
            </div>
          </div>
          <div className="data-grid-body">
            {rows.map((row) => (
              <div
                key={row.id}
                className="data-grid-row"
                // style={{ gridTemplateRows: "repeat(10, 1fr)" }}
              >
                {columns.map((column) => (
                  <div
                    key={column.field}
                    className={`data-grid-cell ${column.field}`}
                  >
                    {isEditing &&
                    column.field !== "id" &&
                    editingRow.id === row.id &&
                    column.editType === "text" ? (
                      <input
                        type="text"
                        defaultValue={row[column.field]}
                        onChange={(e) => handleInputChange(e, column.field)}
                      />
                    ) : (
                      row[column.field]
                    )}
                  </div>
                ))}
                {isEditing && editingRow.id === row.id ? (
                  <div className={`data-grid-cell actions`}>
                    <button onClick={() => submitEdit(editingRow)}>
                      Confirm
                    </button>
                    <button onClick={() => cancelEdit()}>Cancel</button>
                  </div>
                ) : (
                  <div className={`data-grid-cell actions`}>
                    <button onClick={() => handleEdit(row)}>Edit</button>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this item?"
                          )
                        ) {
                          handleDelete(row.id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          {snackbar.show && (
            <Snackbar
              message={snackbar.message}
              show={snackbar.show}
              onClose={() => setSnackbar({ message: "", show: false })}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default DataGridComponent;
