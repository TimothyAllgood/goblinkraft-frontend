import React, { useCallback, useEffect, useState } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridDeleteIcon,
  GridRowEditStopReasons,
  GridRowModes,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function EditToolbar(props) {
  const { rows, setRows, setRowModesModel } = props;

  const handleClick = () => {
    let sorted = [...rows]?.sort((a, b) => {
      return a.id - b.id;
    });

    let id = sorted?.at(-1)?.id + 1 || 0;

    if (
      (id > 0 &&
        Object.values(rows.at(-1)).every((val) => val !== undefined)) ||
      id === 1 ||
      id === 0
    ) {
      setRows((oldRows) => {
        return [...oldRows, { id }];
      });
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit },
      }));
    }
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

function Grid({
  initialRows,
  initialColumns,
  handleEdit,
  handleDelete,
  options,
}) {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [columns, setColumns] = useState(initialColumns);

  const getDeleteAction = useCallback(
    (id) => (
      <GridActionsCellItem
        icon={<GridDeleteIcon />}
        label="Delete"
        onClick={() => deleteRow(id)}
        color="inherit"
      />
    ),
    []
  );

  // const getEditAction = useCallback(
  //   (id) => (
  //     <GridActionsCellItem
  //       icon={<EditIcon />}
  //       label="Edit"
  //       className="textPrimary"
  //       // onClick={handleEditClick(id)}
  //       color="inherit"
  //     />
  //   ),
  //   []
  // );

  useEffect(() => {
    const newColumns = [
      ...initialColumns,
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        width: 100,
        cellClassName: "actions",
        getActions: ({ id }) => {
          // const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
          return [
            // options.allowEditing && getEditAction(id),
            options.allowDeleting && getDeleteAction(id),
          ];
        },
      },
    ];
    setColumns(newColumns);
    return () => {
      setColumns([]);
      setRows([]);
    };
  }, []);

  useEffect(() => {
    setRows(initialRows);
    return () => {
      setRows([]);
    };
  }, [initialRows]);

  const edit = (updated, old) => {
    if (
      (updated !== old && Object.values(updated).every((val) => val)) ||
      updated.id === 0
    ) {
      handleEdit(updated);
    }
  };

  const deleteRow = async (id) => {
    setRows((oldRows) => {
      return oldRows.filter((row) => row.id !== id);
    });
    await handleDelete(id);
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      // event.defaultMuiPrevented = true;
    }
  };

  return (
    <Box sx={{ height: "100vh" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 25,
            },
          },
          sorting: {
            sortModel: [{ field: "id", sort: "desc" }],
          },
        }}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { rows, setRows, setRowModesModel },
        }}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        checkboxSelection
        disableRowSelectionOnClick
        processRowUpdate={(updatedRow, originalRow) =>
          edit(updatedRow, originalRow)
        }
        onProcessRowUpdateError={(err) => {
          console.log(err);
        }}
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        getRowHeight={() => "auto"}
      />
    </Box>
  );
}

export default Grid;
