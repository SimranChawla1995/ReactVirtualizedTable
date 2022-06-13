import React from "react";
import MuiTableCell from "@mui/material/TableCell";
import {
  AutoSizer,
  Column,
  Table,
} from "react-virtualized";
import { TableContainer, TextField } from "@mui/material";
import { Edit } from "@mui/icons-material";
import dataArray from "./data.json";
const TableCell = ({ children }) => {
  return (
    <MuiTableCell
      component="div"
      sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box",
        cursor: "initial",
        height: ROW_HEIGHT,
        border: "1px solid black"
      }}
      variant="body"
    >
      {children}
    </MuiTableCell>
  );
};

const ROW_HEIGHT = 120;

const App = () => {
  const [rows, setRows] = React.useState(dataArray);

  const startEdit = (rowId) => {
    const newRows = rows.map((row) =>
      row.id === rowId ? { ...row, isEdit: true } : { ...row }
    );
    setRows(newRows);
  };

  const handleEditCell = (e, rowId, dataKey) => {
    const newRows = rows.map((row) =>
      row.id === rowId ? { ...row, [dataKey]: e.target.value } : { ...row }
    );
    setRows(newRows);
  };

  const simpleCellRenderer = ({ dataKey, cellData, rowData }) => {
    return (
      <TableCell>
        {dataKey === "actions" ? (
          <Edit
            sx={{ cursor: "pointer" }}
            onClick={() => startEdit(rowData.id)}
          />
        ) : (
          cellData
        )}
      </TableCell>
    );
  };

  const editableCellRenderer = ({ dataKey, cellData, rowData }) => {
    return (
      <TableCell>
        {rowData.isEdit ? (
          <TextField
            size="small"
            variant="standard"
            InputProps={{
              disableUnderline: true,
              style: { fontSize: "inherit" }
            }}
            value={cellData}
            onChange={(e) => handleEditCell(e, rowData.id, dataKey)}
          />
        ) : (
          cellData
        )}
      </TableCell>
    );
  };

  let columns = [
    {
      dataKey: "id",
      label: "ID",
      width: 55,
      cellRenderer: simpleCellRenderer
    },
    {
      dataKey: "title",
      label: "Title",
      width: 200,
      cellRenderer: editableCellRenderer
    },
    {
      dataKey: "price",
      label: "Price",
      width: 80,
      cellRenderer: editableCellRenderer
    },
    {
      dataKey: "description",
      label: "Description",
      width: 200,
      cellRenderer: editableCellRenderer
    },
    {
      dataKey: "category",
      label: "Category",
      width: 150,
      cellRenderer: editableCellRenderer
    },
    {
      dataKey: "image",
      label: "Image",
      width: 200,
      cellRenderer: editableCellRenderer
    },

    {
      dataKey: "actions",
      label: "Actions",
      width: 100,
      cellRenderer: simpleCellRenderer
    }
    // ...columnsToAdd
  ];

  const headerRenderer = ({ label }) => <TableCell>{label}</TableCell>;

  const getRowStyles = ({ index }) => {
    const isEdit = Boolean(rows[index]?.isEdit);

    return {
      display: "flex",
      alignItems: "center",
      boxSizing: "border-box",
      boxShadow: isEdit
        ? "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)"
        : "none"
    };
  };

  return (
    <TableContainer sx={{ height: "90vh" }}>
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={ROW_HEIGHT}
            headerHeight={50}
            rowClassName="row"
            rowStyle={getRowStyles}
            rowCount={rows.length}
            rowGetter={({ index }) => rows[index]}
          >
            {columns.map(({ dataKey, cellRenderer, ...other }) => {
              return (
                <Column
                  style={{
                    display: "flex",
                    alignItems: "center",
                    boxSizing: "border-box"
                  }}
                  key={dataKey}
                  headerRenderer={headerRenderer}
                  cellRenderer={cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    </TableContainer>
  );
};

export default App;
