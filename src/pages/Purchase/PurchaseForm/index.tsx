import React, { useState } from 'react'
import { Grid, Typography, TextField, Autocomplete, Button } from '@mui/material'
import CustomPriceDataGrid from '../../../components/CustomPriceDataGrid'
import TableCell from '@mui/material/TableCell'
import AddIcon from '@mui/icons-material/Add'
import ClearIcon from '@mui/icons-material/Clear'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { find, get, map } from 'lodash'

function PurchaseForm() {
  const [inputFeilds, setInputFeilds] = useState<any>([
    { Category: '', productName: '', Price: '', QTY: '', GST: '', Total: '' },
  ])
  // handle input change
  const handleInputChange = (e: any, index: number) => {
    const { name, value } = e.target
    const list = [...inputFeilds]
    list[index][name] = value
    setInputFeilds(list)
  }
  // handle click event of the Remove button
  const handleRemoveClick = (index: number) => {
    const list = [...inputFeilds]
    list.splice(index, 1)
    setInputFeilds(list)
  }

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputFeilds([
      ...inputFeilds,
      { Category: '', productName: '', Price: '', QTY: '', GST: '', Total: '' },
    ])
  }

  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
  ]

  const formik = useFormik({
    initialValues: {
      Date: '',
      invoceNumber: '',
      paidStatus: '',
      customerName: '',
      metaData: {},
    },
    validationSchema: Yup.object({}),
    onSubmit: (values) => {
      values.metaData = inputFeilds
    },
  })

  return (
    <div style={{ marginTop: 10 }}>
      <Typography variant='h6'>Add Purchase</Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid xs={4}>
            <TextField
              id='outlined-basic'
              placeholder='Date'
              type='date'
              variant='outlined'
              size='small'
              sx={{ width: 300 }}
              name='Date'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Date}
              error={formik.touched.Date && Boolean(formik.errors.Date)}
              helperText={formik.touched.Date && formik.errors.Date}
            />
          </Grid>
          <Grid xs={4}>
            <TextField
              id='outlined-basic'
              label='InvoceNumber'
              variant='outlined'
              size='small'
              sx={{ width: 300 }}
              name='invoceNumber'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.invoceNumber}
              error={formik.touched.invoceNumber && Boolean(formik.errors.invoceNumber)}
              helperText={formik.touched.invoceNumber && formik.errors.invoceNumber}
            />
          </Grid>

          <Grid xs={4}>
            <Autocomplete
              disablePortal
              id='combo-box-demo'
              options={top100Films}
              size='small'
              sx={{ width: 300 }}
              value={find(top100Films, (o: any) => o.label === formik.values.paidStatus)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Paid Status'
                  name='paidStatus'
                  error={formik.touched.paidStatus && Boolean(formik.errors.paidStatus)}
                  helperText={formik.touched.paidStatus && formik.errors.paidStatus}
                  onBlur={formik.handleBlur}
                />
              )}
              onChange={(e, value) => {
                formik.setFieldValue('paidStatus', get(value, 'label'))
              }}
            />
          </Grid>
          <Grid xs={4} sx={{ mt: 3 }}>
            <Autocomplete
              disablePortal
              id='combo-box-demo'
              options={top100Films}
              value={find(top100Films, (o: any) => o.label === formik.values.customerName)}
              size='small'
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Customer Name'
                  name='customerName'
                  error={formik.touched.customerName && Boolean(formik.errors.customerName)}
                  helperText={formik.touched.customerName && formik.errors.customerName}
                  onBlur={formik.handleBlur}
                />
              )}
              onChange={(e, value) => {
                formik.setFieldValue('customerName', get(value, 'label'))
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid xs={12}>
            <CustomPriceDataGrid
              datas={['Category', 'ProductName', 'Price', 'QTY', 'GST', 'Total', 'Action']}
            >
              {inputFeilds?.map((element: any, index: number) => (
                <Grid container spacing={2} key={index} sx={{ mt: 1 }}>
                  <Grid xs={1.7} sx={{ ml: 1 }}>
                    <TableCell>
                      <Autocomplete
                        disablePortal
                        id='combo-box-demo'
                        options={top100Films}
                        size='small'
                        getOptionLabel={(option: any) => option.label}
                        value={find(top100Films, (o: any) => o.label === element.Category)}
                        onChange={(e, value) => {
                          handleInputChange(e, index), (element.Category = value?.label)
                        }}
                        renderInput={(params) => <TextField {...params} name='Category' />}
                      />
                    </TableCell>
                  </Grid>
                  <Grid xs={1.7}>
                    <TableCell>
                      <Autocomplete
                        disablePortal
                        id='combo-box-demo'
                        options={top100Films}
                        size='small'
                        getOptionLabel={(option: any) => option.label}
                        value={find(top100Films, (o: any) => o.label === element.productName)}
                        onChange={(e, value) => {
                          handleInputChange(e, index), (element.productName = value?.label)
                        }}
                        renderInput={(params) => <TextField {...params} name='productName' />}
                      />
                    </TableCell>
                  </Grid>
                  <Grid xs={1.7}>
                    <TableCell>
                      <TextField
                        size='small'
                        name='Price'
                        value={element.Price}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </TableCell>
                  </Grid>
                  <Grid xs={1.7}>
                    <TableCell>
                      <TextField
                        size='small'
                        name='QTY'
                        value={element.QTY}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </TableCell>
                  </Grid>
                  <Grid xs={1.7}>
                    <TableCell>
                      <TextField
                        name='GST'
                        size='small'
                        value={element.GST}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </TableCell>
                  </Grid>
                  <Grid xs={1.7}>
                    <TableCell>
                      <TextField
                        name='Total'
                        size='small'
                        value={element.Total}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </TableCell>
                  </Grid>
                  <Grid xs={1.7}>
                    <TableCell>
                      <Grid container spacing={2} sx={{ mt: 1.4, ml: 1 }}>
                        <Grid xs={6}>
                          <AddIcon
                            sx={{ color: 'green', cursor: 'pointer' }}
                            onClick={handleAddClick}
                          />
                        </Grid>
                        {inputFeilds.length !== 1 && (
                          <Grid xs={6}>
                            <ClearIcon
                              sx={{ color: 'red', cursor: 'pointer' }}
                              onClick={() => {
                                handleRemoveClick(index)
                              }}
                            />
                          </Grid>
                        )}
                      </Grid>
                    </TableCell>
                  </Grid>
                </Grid>
              ))}
            </CustomPriceDataGrid>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid xs={12}>
            <Button variant='contained' type='submit'>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}
export default PurchaseForm
