import { DataGrid, GridColDef, GridFilterModel } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Book } from "../types";

const paginationModel = { page: 0, pageSize: 10 };

export const DataTable = ({
  rows,
  columns,
  filterModel,
  setFilterModel,
}: {
  rows: Array<Book & { isFavorite: boolean }>;
  columns: GridColDef[];
  filterModel: GridFilterModel;
  setFilterModel: { (model: GridFilterModel): void };
}) => {
  // const [sortModel, setSortModel] = useState<GridSortModel>({
  // });
  return (
    <Paper sx={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10, 20]}
        filterMode="client"
        rowHeight={60}
        filterModel={filterModel}
        onFilterModelChange={setFilterModel}
        disableRowSelectionOnClick
        sx={{
          border: 0,
          // Target the MUI CSS class for column headers
          "& .MuiDataGrid-columnHeaders": {
            color: "#1b1b1b", // White text
            fontWeight: "bold",
            // Crucial: Set minHeight to ensure header area is drawn
            minHeight: "56px !important",
          },
          // You may also need to target the individual header element if padding/height is an issue
          "& .MuiDataGrid-columnHeaderTitleContainer": {
            padding: "0 12px",
          },
        }}
      />
    </Paper>
  );
};
