import React from 'react'
import { Grid, Typography, Card } from '@mui/material'
import { Progress } from 'antd'

function ProgressCard(props: any) {
  const { count, title, color } = props
  return (
    <>
      <Card sx={{ maxWidth: 250, padding: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Progress type='circle' percent={count} width={70} strokeColor={{ color }} />
          </Grid>
          <Grid item xs={6}>
            <Typography variant='h6' sx={{ mt: 3 }}>
              {title}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </>
  )
}
export default ProgressCard
