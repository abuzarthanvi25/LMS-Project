import Modal from '@mui/material/Modal'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { CardHeader } from '@mui/material'

const PaymentModal = ({ open = () => {}, onClose = () => {}, heading, children }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Card
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: 'auto',
          borderRadius: '10px',
          overflow: 'visible'
        }}
      >
        <CardHeader>{heading}</CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </Modal>
  )
}

export default PaymentModal
