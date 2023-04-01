import React, { useState,useCallback,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Grid, Typography, TextField, Autocomplete, Button } from '@mui/material'
import CustomPriceDataGrid from '../../../components/CustomPriceDataGrid'
import TableCell from '@mui/material/TableCell'
import AddIcon from '@mui/icons-material/Add'
import ClearIcon from '@mui/icons-material/Clear'
import { useFormik } from 'formik'
import { ToastContainer,toast } from 'react-toastify'
import { API_SERVICE } from '../../../Service'
import API_END_POINT from "../../../Constant/index"
import { AxiosError, AxiosResponse } from 'axios'
import * as Yup from 'yup'
import { find, get, map } from 'lodash'

function PurchaseForm() {
   const[getCustomerDatas,setGetCustomersData]=useState<any>()
   const [getCategoryData,setGetCategoryData]=useState<any>()
   const[getProductName,setGetProductName]=useState<any>()
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

  const getParamsValues = useParams()
const getCustomerData = useCallback(()=>{
  // get customers data
  API_SERVICE.fetchApiData(`${API_END_POINT.API_END_POINT.GET_CUSTOMERS_DATA}`,(res:AxiosResponse)=>{
    setGetCustomersData(get(res,"data.data",[]))
  },(err:AxiosError)=>{
    console.log(err)
  })
  // get category data
  API_SERVICE.fetchApiData(`${API_END_POINT.API_END_POINT.GET_CATEGORIES_DATA}`,(res:AxiosResponse)=>{
    setGetCategoryData(get(res,"data.data",[]))
  },(err:AxiosError)=>{
    console.log(err)
  })
  // get productname data
  API_SERVICE.fetchApiData(`${API_END_POINT.API_END_POINT.GET_PRODUCTS_DATA}`,(res:AxiosResponse)=>{
    setGetProductName(get(res,"data.data",[]))
  },(err:AxiosError)=>{
    console.log(err)
  })
},[])


  const paidStatusValues:any=[{
    label:"Paid"
  },{label:"nonPaid"}]

  const formik = useFormik({
    initialValues: {
      date: '',
      invoiceNumber: '',
      paidStatus: '',
      customerName: '',
      isPurchaseProducts: {},
    },
    validationSchema: Yup.object({}),
    onSubmit: (values,{resetForm}) => {
      values.isPurchaseProducts = inputFeilds

      getParamsValues.name === "Add" || null ? API_SERVICE.postApiData(`${API_END_POINT.API_END_POINT.ADD_PURCHASE}`,(res:AxiosResponse)=>{
        toast.success(" Data added SuccessFully")
        resetForm()
      },(err:AxiosError)=>{
        console.log(err)
        toast.error("Purchase Not Added")
      },values)
      : API_SERVICE.updateApiData(`${API_END_POINT.API_END_POINT.UPDATE_PURCHASE}/${getParamsValues?.id}`,(res:AxiosResponse)=>{
        toast.success("Purchase Data Updated")
        resetForm()
      },(err:AxiosError)=>{
        console.log(err)
        toast.error("Purchase Data Not Updated")
      },values)
    },
  })
  useEffect(()=>{
    if(getParamsValues?.id){
      API_SERVICE.fetchApiData(`${API_END_POINT.API_END_POINT.GET_UNIQUE_PURCHASE}/${getParamsValues?.id}`,(res:AxiosResponse)=>{ 
     
        formik.setFieldValue("invoiceNumber",get(res,"data.data.invoiceNumber",""))
        formik.setFieldValue("date",get(res,"data.data.date","")) 
        formik.setFieldValue("customerName",get(res,"data.data.customerName","")) 
        formik.setFieldValue("paidStatus",get(res,"data.data.paidStatus","")) 
      },(err:AxiosError)=>{
        console.log(err)
      })
    }
    getCustomerData()
  },[getCustomerData,getParamsValues?.id])


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
              name='date'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.date}
              error={formik.touched.date && Boolean(formik.errors.date)}
              helperText={formik.touched.date && formik.errors.date}
            />
          </Grid>
          <Grid xs={4}>
            <TextField
              id='outlined-basic'
              label='invoiceNumber'
              variant='outlined'
              size='small'
              sx={{ width: 300 }}
              name='invoiceNumber'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.invoiceNumber}
              error={formik.touched.invoiceNumber && Boolean(formik.errors.invoiceNumber)}
              helperText={formik.touched.invoiceNumber && formik.errors.invoiceNumber}
            />
          </Grid>

          <Grid xs={4}>
            <Autocomplete
              disablePortal
              id='combo-box-demo'
              options={paidStatusValues}
              defaultValue={paidStatusValues}
              getOptionLabel={(paidStatusValues:any)=> paidStatusValues.label ?? "" }
              size='small'
              sx={{ width: 300 }}
              value={find(paidStatusValues, (o: any) => o.label === formik.values.paidStatus) ?? ""}
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
                formik.setFieldValue('paidStatus', get(value, 'paidStatus'))
              }}
            />
          </Grid>
          <Grid xs={4} sx={{ mt: 3 }}>
            
                <Autocomplete
                disablePortal
                id='category'
                size='small'
                style={{ width: '100%' }}
                options={getCustomerDatas }
                defaultValue={getCustomerDatas}
                getOptionLabel={(option: any) => option?.customerName ?? "" }
                value={find(getCustomerDatas, (o: any) => o?.customerName === formik.values.customerName ) ?? ""}
                freeSolo
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='CustomerName'
                    name='customerName'
                    error={formik.touched.customerName && Boolean(formik.errors.customerName)}
                    helperText={formik.touched.customerName && formik.errors.customerName}
                    onBlur={formik.handleBlur}
                  />
                )}
                onChange={(e, value) => {
             
                  formik.setFieldValue('customerName', get(value, 'customerName',""))
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
                        options={getCategoryData}
                        size='small'
                        getOptionLabel={(option: any) => option.categoriesName}
                        value={find(getCategoryData, (o: any) => o.categoriesName === element.categoriesName)}
                        onChange={(e, value) => {
                          handleInputChange(e, index), (element.Category = value?.categoriesName)
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
                        options={getProductName}
                        size='small'
                        getOptionLabel={(option: any) => option.productName}
                        value={find(getProductName, (o: any) => o.productName === element.productName)}
                        onChange={(e, value) => {
                          handleInputChange(e, index), (element.productName = value?.productName)
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
      <ToastContainer />
    </div>
  )
}
export default PurchaseForm
