import React from 'react'
import SideBar from '../Sidebar'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import CardDataCount from '../../pages/CardDatasCount'

function Layout() {
  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <SideBar />
        <Box component='main' sx={{ flexGrow: 1, p: 6 }}>
          <Box sx={{ width: '100%' }}>
            <CardDataCount />
          </Box>
          <Outlet />
        </Box>
      </Box>
    </div>
  )
}
export default Layout
