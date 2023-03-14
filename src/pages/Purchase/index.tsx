import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid, Button, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CustomDataGrid from '../../components/DataGridTable'
import { GridColDef } from '@mui/x-data-grid'

function Purchase() {
  const navigate = useNavigate()
  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 90 },
    {
      field: 'units',
      headerName: 'Units',
      width: 670,
    },

    {
      field: 'Action',
      headerAlign: 'center',
      width: 200,
      renderCell: (cellValues) => {
        return (
          <Grid container spacing={2} sx={{ ml: 3 }}>
            <Grid xs={4}>
              <VisibilityIcon sx={{ color: 'blue', cursor: 'pointer' }} />
            </Grid>
            <Grid xs={4}>
              <EditIcon sx={{ color: 'green', cursor: 'pointer' }} />
            </Grid>
            <Grid xs={4}>
              <DeleteIcon sx={{ color: 'red', cursor: 'pointer' }} />
            </Grid>
          </Grid>
        )
      },
    },
  ]

  const rows = [
    { _id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
 
  ]

  const handleRoute = () => {
    navigate(`/PurchaseForm/${'Add'}`)
  }
  return (
    <div>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid xs={10}>
          <Typography variant='h5'>Purchase</Typography>
        </Grid>
        <Grid xs={2}>
          <Button
            startIcon={<AddIcon />}
            sx={{
              color: 'white',
              backgroundColor: '#0CBABA',
              marginLeft: '5x',
              '&:hover': {
                background: '#0CBABA',
              },
            }}
            onClick={() => {
              handleRoute()
            }}
          >
            Add Purchase
          </Button>
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
export default Purchase
