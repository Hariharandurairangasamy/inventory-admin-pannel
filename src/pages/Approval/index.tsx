import React from 'react'
import { Grid, Typography, Autocomplete, TextField, Button } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import CustomDataGrid from '../../components/DataGridTable'
import { GridColDef } from '@mui/x-data-grid'
function Approval() {
  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 90 },
    {
      field: 'Customer Name',
      headerName: 'First name',
      width: 150,
    },
    {
      field: 'Supplier Phone',
      headerName: 'Last name',
      width: 150,
    },
    {
      field: ' PhoneNo',
      headerName: 'Supplier PhoneNo',
      type: 'number',
      width: 160,
    },
    {
      field: 'Address',
      headerName: 'Supplier Address',
      type: 'number',
      width: 180,
    },

    {
      field: 'Action',
      headerAlign: 'center',
      width: 200,
      renderCell: (cellValues) => {
        return (
          <Grid container spacing={2} sx={{ ml: 6 }}>
            <Grid xs={12}>
              <Button variant='contained'>Status</Button>
            </Grid>
          </Grid>
        )
      },
    },
  ]

  const rows = [
    { _id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
   
  ]
  const top100Films = [{ label: 'Pending' }, { label: 'Paid' }]
  return (
    <div>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid xs={10}>
          <Typography variant='h5'>Approvals</Typography>
        </Grid>
        <Grid xs={2}>
          <Autocomplete
            disablePortal
            id='combo-box-demo'
            size='small'
            options={top100Films}
            renderInput={(params) => <TextField {...params} label='Status' />}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid xs={12}>
          <CustomDataGrid rows={rows} columns={columns} height={340} />
        </Grid>
      </Grid>
    </div>
  )
}
export default Approval
