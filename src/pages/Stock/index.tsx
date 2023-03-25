import React from 'react'
import { Grid, Typography, Autocomplete, TextField, Button } from '@mui/material'
import CustomDataGrid from '../../components/DataGridTable'
import { GridColDef } from '@mui/x-data-grid'
function Stock() {
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
  ]

  const rows = [
    { _id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { _id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  
  ]
  const top100Films = [{ label: 'Pending' }, { label: 'Paid' }]
  return (
    <div>
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid xs={4}>
          <Typography variant='h5'>Stock</Typography>
        </Grid>
        <Grid xs={4}>
          <Autocomplete
            disablePortal
            id='combo-box-demo'
            size='small'
            sx={{ maxWidth: 330 }}
            options={top100Films}
            renderInput={(params) => <TextField {...params} label='CategoryName' />}
          />
        </Grid>
        <Grid xs={4}>
          <Autocomplete
            disablePortal
            id='combo-box-demo'
            size='small'
            sx={{ maxWidth: 340 }}
            options={top100Films}
            renderInput={(params) => <TextField {...params} label='ProductName' />}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid xs={12}>
          <CustomDataGrid rows={rows} columns={columns} height={330} />
        </Grid>
        <Grid xs={12} sx={{ mt: 2 }}>
          <Button size='small' fullWidth variant='contained'>
            Save
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}
export default Stock
