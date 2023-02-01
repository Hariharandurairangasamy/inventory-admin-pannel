import React from 'react'
import { Grid } from '@mui/material'
import ProgressCard from '../../components/ProgressCard'

function CardDataCount() {
  return (
    <div>
      <Grid container spacing={1} sx={{ mt: 3 }}>
        <Grid xs={3}>
          <ProgressCard count={23} color='red' title='Purchase' />
        </Grid>
        <Grid xs={3}>
          <ProgressCard count={38} color='blue' title='Sales' />
        </Grid>
        <Grid xs={3}>
          <ProgressCard count={78} color='green' title='Customers' />
        </Grid>
        <Grid xs={3}>
          <ProgressCard count={48} color='red' title='Payments' />
        </Grid>
      </Grid>
    </div>
  )
}
export default CardDataCount
