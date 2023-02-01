import React from 'react'
import { Grid, Typography, Autocomplete, TextField, Button } from '@mui/material'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop'
import CustomDataGrid from '../../components/DataGridTable'
import { GridColDef } from '@mui/x-data-grid'
function InvoiceApproval() {
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

    {
      field: 'Action',
      headerAlign: 'center',
      width: 200,
      renderCell: (cellValues) => {
        return (
          <Grid container spacing={2} sx={{ ml: 1, mt: 1 }}>
            <Grid xs={6}>
              <Button variant='contained'>Status</Button>
            </Grid>
            <Grid xs={6}>
              <LocalPrintshopIcon sx={{ ml: 2, color: '#F28C28', cursor: 'pointer' }} />
            </Grid>
          </Grid>
        )
      },
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
  const top100Films = [{ label: 'Pending' }, { label: 'Paid' }]
  return (
    <div>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid xs={10}>
          <Typography variant='h5'>Invoice Approvals</Typography>
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
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid xs={12}>
          <CustomDataGrid rows={rows} columns={columns} height={340} />
        </Grid>
      </Grid>
    </div>
  )
}
export default InvoiceApproval
