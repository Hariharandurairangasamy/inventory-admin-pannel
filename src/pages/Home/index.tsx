import React from 'react'
import { Grid, Typography } from '@mui/material'
import LineChart from '../../components/LineChart'
import BarChart from '../../components/Barchart'
import CustomDataGrid from '../../components/DataGridTable'
import { GridColDef } from '@mui/x-data-grid'

function Home() {
  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
  ]

  const rows = [
    { _id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { _id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { _id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { _id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { _id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { _id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { _id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { _id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { _id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ]
  return (
    <div>
      <Grid container spacing={2} sx={{ mt: 5 }}>
        <Grid xs={6} sx={{ width: '100%', height: '50px' }}>
          <Typography variant='h6'>Purchase </Typography>
          <LineChart />
        </Grid>
        <Grid xs={6} sx={{ width: '100%', height: '50px' }}>
          <Typography variant='h6'>Sales </Typography>
          <BarChart />
        </Grid>
      </Grid>
      <Typography variant='h5' sx={{ mt: 35 }}>
        Weekly Sales Report
      </Typography>
      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid xs={12}>
          <CustomDataGrid rows={rows} columns={columns} height={400} />
        </Grid>
      </Grid>
    </div>
  )
}
export default Home
