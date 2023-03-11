import  React,{useState} from 'react'
import { styled, Theme, CSSObject } from '@mui/material/styles'
import { Link,useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import { Grid } from '@material-ui/core'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LocalMallIcon from '@mui/icons-material/LocalMall'
import PaidIcon from '@mui/icons-material/Paid'
import BarChartIcon from '@mui/icons-material/BarChart'
import Collapse from '@mui/material/Collapse'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Diversity3Icon from '@mui/icons-material/Diversity3'
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize'
import {   Popconfirm } from 'antd';
import { useAppSelector, useAppDispatch } from '../../hooks'
import { SET_CLOSE_SIDEBAR, SET_OPEN_SIDEBAR } from '../../redux/features/sidebar'
import { RootState } from '../../redux/store'
import { map } from 'lodash'
import { logout } from '../../redux/authSlice'


const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
)

export default function SideBar() {
  const [open, setOpen] = useState<any>({})

  const collectAllPageRoute = [
    {
      id: 1,
      label: 'Inventory',
      logo: <DashboardCustomizeIcon />,
      subDropDown: [
        { id: 1, subLable: 'Suppliers', path: '/Suppliers' },
        { id: 2, subLable: 'Customers', path: '/Customers' },
        { id: 3, subLable: 'Units', path: '/Units' },
        { id: 4, subLable: 'Categories', path: '/Categories' },
        { id: 5, subLable: 'Products', path: '/Products' },
      ],
      permission:null
    },
    {
      id: 2,
      label: 'Purchase',
      logo: <ShoppingCartIcon />,
      subDropDown: [
        { id: 1, subLable: 'Purchase', path: '/Purchase' },
        { id: 2, subLable: 'Approval', path: '/Approval' },
      ],
      permission:null
    },
    {
      id: 3,
      label: 'Invoice',
      logo: <FileCopyIcon />,
      subDropDown: [
        { id: 1, subLable: 'All Invoice', path: '/Invoice' },
        { id: 2, subLable: 'Approval', path: '/InvoiceApproval' },
      ],
      permission:null
    },

    {
      id: 4,
      label: 'Stock',
      logo: <LocalMallIcon />,
      subDropDown: [{ id: 1, subLable: 'Add Stock', path: '/Stock' }],
      permission:null
    },
    {
      id: 5,
      label: 'Reports',
      logo: <BarChartIcon />,
      subDropDown: [
        { id: 1, subLable: 'Purchase Report', path: '/PurchaseReport' },
        { id: 2, subLable: 'Sales Report', path: '/SalesReport' },
        { id: 3, subLable: 'Purchase Return ', path: '/' },
        { id: 4, subLable: 'Sales Return ', path: '/' },
      ],
      permission:null
    },
    {
      id: 6,
      label: 'Attendance',
      logo: <Diversity3Icon />,
      subDropDown: [
        { id: 1, subLable: 'Employees', path: '/Employees' },
        { id: 1, subLable: 'Attendance', path: '/EmployeesAttendence' },
      ],
      permission:null
    },
    {
      id: 7,
      label: 'Payments',
      logo: <PaidIcon />,
      subDropDown: [{ id: 1, subLable: 'Add Payments', path: '/' }],
      permission:null
    },
    {
      id:8,
      label:"Register",
      logo:<Diversity3Icon/>,
      subDropDown: [{ id: 1, subLable: 'Users', path: '/User' }],
      permission:null
    }
  ]




  // REDUX STATES
  const dispatch = useAppDispatch()

  const { setSideBarPosition } = useAppSelector((state: RootState) => state.sidebar)

    // Logout DropDown Prop
    const text = 'Logout'
    const navigate = useNavigate()

    const confirm = () => {
     dispatch(logout())
     navigate("/")
    };

    

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='fixed' open={setSideBarPosition} sx={{ backgroundColor: 'black' }}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={() => {
              dispatch(SET_OPEN_SIDEBAR())
            }}
            edge='start'
            sx={{
              marginRight: 5,
              ...(setSideBarPosition && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Grid container spacing={2} >
            <Grid md={8} lg={8} xl={8} >
            <Link to='/Home' style={{ textDecoration: 'none', color: 'white' }}>
            <Typography variant='h6' noWrap component='div'>
              Inventory Admin Pannel
            </Typography>
          </Link>
            </Grid>
            <Grid md={4} lg={4} xl={4} style={{paddingLeft:"300px"}}>
              <Grid container spacing={2}>
                <Grid md={4} lg={4} xl={4} >
             
              <Popconfirm
                  placement="bottom"
                  title={text}
                  onConfirm={confirm}
                  okText="Yes"
                  cancelText="No"
                  
                >
               <AdminPanelSettingsIcon sx={{fontSize:"30px",marginTop:"10px"}}/>
      </Popconfirm>
              </Grid>
              <Grid md={2} lg={2} xl={2} >
                <p >Admin</p>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        open={setSideBarPosition}
        PaperProps={{
          sx: {
            backgroundColor: 'black',
            overflow: 'hidden',
          },
        }}
      >
        <DrawerHeader>
          <IconButton
            onClick={() => {
              dispatch(SET_CLOSE_SIDEBAR())
            }}
          >
            {setSideBarPosition ? (
              <ChevronRightIcon sx={{ color: 'white' }} />
            ) : (
              <ChevronLeftIcon sx={{ color: 'white' }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        {map(collectAllPageRoute, (dropDownDatas) => (
          <List key={dropDownDatas?.id}>
            <ListItemButton
              onClick={() => {
                setOpen({ ...open, [dropDownDatas?.id]: !open[dropDownDatas?.id] })
             
              }}
            >
              <ListItemIcon sx={{ color: 'white' }}>{dropDownDatas?.logo}</ListItemIcon>
              <ListItemText primary={dropDownDatas?.label} sx={{ color: 'white' }} />
              {open[dropDownDatas?.id] ? (
                <ExpandLess sx={{ color: 'white' }} />
              ) : (
                <ExpandMore sx={{ color: 'white' }} />
              )}
            </ListItemButton>
            <Collapse in={open[dropDownDatas?.id]} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                {map(dropDownDatas?.subDropDown, (subDropdownList) => (
                  <Link
                    to={subDropdownList?.path}
                    style={{ textDecoration: 'none' }}
                    key={subDropdownList?.id}
                  >
                    <ListItemButton sx={{ pl: 4, color: 'white', paddingLeft: 8 }}>
                      <ListItemText primary={subDropdownList?.subLable} />
                    </ListItemButton>
                  </Link>
                ))}
              </List>
            </Collapse>
          </List>
        ))}
            
      </Drawer>
    </Box>
  )
}
