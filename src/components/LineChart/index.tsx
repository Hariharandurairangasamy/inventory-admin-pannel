import React, { useRef } from 'react'
import 'chart.js/auto'
import { Line } from 'react-chartjs-2'

const labels = ['January', 'February', 'March', 'April', 'May', 'June']

const data = {
  labels: labels,
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
}

const LineChart = () => {
  const ref = useRef()
  return (
    <div>
      <Line data={data} ref={ref} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}

export default LineChart
