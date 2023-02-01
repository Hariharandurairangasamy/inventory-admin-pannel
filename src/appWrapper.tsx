/* eslint-disable no-console */
import React from 'react'
// import PropTypes from 'prop-types'
import { BrowserRouter } from 'react-router-dom'
import { store } from '../src/redux/store'
import { Provider } from 'react-redux'

function AppWrapper({ children }: any) {
  return <Provider store={store}>{children}</Provider>
}

export default AppWrapper
