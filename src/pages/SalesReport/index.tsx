import React from 'react'
import { Grid, Typography } from '@mui/material'
import CustomDataGrid from '../../components/DataGridTable'
import { GridColDef } from '@mui/x-data-grid'
import { DatePicker } from 'antd'

function SalesReport() {
  const { RangePicker } = DatePicker
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
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
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ]

  return (
    <div>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid xs={6}>
          <Typography variant='h5'>Sales</Typography>
        </Grid>
        <Grid xs={6}>
          <RangePicker style={{ marginLeft: '210px' }} />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid xs={12}>
          <CustomDataGrid rows={rows} columns={columns} height={340} />
        </Grid>
      </Grid>
    </div>
  )
}
export default SalesReport
