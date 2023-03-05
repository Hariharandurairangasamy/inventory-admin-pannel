import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Layout from '../../components/Layout'
import Home from '../Home'
import Suppliers from '../Suppliers'
import Customers from '../Customers'
import Units from '../Units'
import Categories from '../Categories'
import Products from '../Products'
import Purchase from '../Purchase'
import Approval from '../Approval'
import Print from '../Print'
import PurchaseForm from '../Purchase/PurchaseForm'
import Invoice from '../Invoice'
import InvoiceForm from '../Invoice/InvoiceForm'
import InvoiceApproval from '../InvoiceApproval'
import Stock from '../Stock'
import PurchaseReport from '../PurchaseReport'
import SalesReport from '../SalesReport'
import Employees from '../Employees'
import EmployeesAttendence from '../EmployeesAttendence'
import EmployeesDetails from '../EmployeesAttendence/CalendarDetails'
import Login from '../Login'
import PrivateRoute from '../PrivateRoute'
import Users from '../User'

export const handleRouter = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/Home',
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: '/Suppliers',
        element: (
          <PrivateRoute>
            <Suppliers />
          </PrivateRoute>
        ),
      },
      {
        path: '/Customers',
        element: (
          <PrivateRoute>
            <Customers />
          </PrivateRoute>
        ),
      },
      {
        path: '/Units',
        element: (
          <PrivateRoute>
            <Units />
          </PrivateRoute>
        ),
      },
      {
        path: '/Categories',
        element: (
          <PrivateRoute>
            <Categories />
          </PrivateRoute>
        ),
      },
      {
        path: '/Products',
        element: (
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        ),
      },
      {
        path: '/Purchase',
        element: (
          <PrivateRoute>
            <Purchase />
          </PrivateRoute>
        ),
      },
      {
        path: '/Approval',
        element: (
          <PrivateRoute>
            <Approval />
          </PrivateRoute>
        ),
      },
      {
        path: '/Print',
        element: (
          <PrivateRoute>
            <Print />
          </PrivateRoute>
        ),
      },
      {
        path: '/PurchaseForm/:name',
        element: (
          <PrivateRoute>
            <PurchaseForm />
          </PrivateRoute>
        ),
      },
      {
        path: '/Invoice',
        element: (
          <PrivateRoute>
            <Invoice />
          </PrivateRoute>
        ),
      },
      {
        path: '/Invoice',
        element: (
          <PrivateRoute>
            <Invoice />
          </PrivateRoute>
        ),
      },
      {
        path: '/InvoiceForm/:name',
        element: (
          <PrivateRoute>
            <InvoiceForm />
          </PrivateRoute>
        ),
      },
      {
        path: '/InvoiceApproval',
        element: (
          <PrivateRoute>
            <InvoiceApproval />
          </PrivateRoute>
        ),
      },
      {
        path: '/Stock',
        element: (
          <PrivateRoute>
            <Stock />
          </PrivateRoute>
        ),
      },
      {
        path: '/PurchaseReport',
        element: (
          <PrivateRoute>
            <PurchaseReport />
          </PrivateRoute>
        ),
      },
      {
        path: '/SalesReport',
        element: (
          <PrivateRoute>
            <SalesReport />
          </PrivateRoute>
        ),
      },
      {
        path: '/Employees',
        element: (
          <PrivateRoute>
            <Employees />
          </PrivateRoute>
        ),
      },
      {
        path: '/EmployeesAttendence',
        element: (
          <PrivateRoute>
            <EmployeesAttendence />
          </PrivateRoute>
        ),
      },
      {
        path: '/EmployeesDetails/:mode',
        element: (
          <PrivateRoute>
            <EmployeesDetails />
          </PrivateRoute>
        ),
      },
      {
        path: '/User',
        element: (
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        ),
      },
    ],
  },
])
