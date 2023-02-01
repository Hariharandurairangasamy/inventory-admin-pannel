import React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import CloseIcon from '@mui/icons-material/Close'
import { Grid, Typography } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

function DialogModel(props: any) {
  const { children, isOpen, handleClose, title } = props
  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <div>
      <Modal
        open={isOpen}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Grid container spacing={2}>
            <Grid sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
              <CloseIcon
                sx={{ color: 'red', cursor: 'pointer' }}
                onClick={() => {
                  handleClose(), setSearchParams({})
                }}
              />
            </Grid>
          </Grid>

          {children}
        </Box>
      </Modal>
    </div>
  )
}
export default DialogModel
