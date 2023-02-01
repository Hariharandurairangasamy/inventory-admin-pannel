import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Grid } from '@mui/material'
import { map } from 'lodash'

function CustomPriceDataGrid(props: any) {
  const { children, ...rest } = props

  return (
    <div>
      <TableContainer component={Paper}>
        <Table size='small' aria-label='a dense table'>
          <Grid>
            <Grid xs={12}>
              <TableHead sx={{ backgroundColor: '#e7e9eb' }}>
                <TableRow>
                  {map(rest?.datas, (tableCellValues) => (
                    <TableCell sx={{ width: 200 }}>{tableCellValues}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
            </Grid>
            <Grid xs={12}>
              <TableBody>
                <TableRow>{children}</TableRow>
              </TableBody>
            </Grid>
          </Grid>
        </Table>
      </TableContainer>
    </div>
  )
}
export default CustomPriceDataGrid
