import React from 'react'
import { Box, Grid } from '@mui/material'
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid'

function CustomToolbar() {
  return (
    <Grid sx={{ display: 'flex', justifyContent: 'end' }}>
      <GridToolbarContainer>
        <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
      </GridToolbarContainer>
    </Grid>
  )
}
function CustomDataGrid(props: any) {
  const { rows, columns, height,processRowUpdates } = props

  return (
    <div>
      <Box sx={{ height: height, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          getRowId={(row: any) =>  row?._id}
          loading={rows === 0 ? true : false}
      processRowUpdate={processRowUpdates}
          editMode='row'
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </Box>
    </div>
  )
}
export default CustomDataGrid
