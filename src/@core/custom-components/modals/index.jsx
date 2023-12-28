import React, { useState } from 'react'
import { Modal, Card, CardContent, Button, Typography } from '@mui/material'
import StudentLoginForm from '../forms/auth-student/login'
import TeacherLoginForm from '../forms/auth-teacher/login'
import AdminLoginForm from '../forms/auth-admin/login'
import TeacherRegisterForm from '../forms/auth-teacher/register'
import StudentRegisterForm from '../forms/auth-student/register'

const UserSelectionModal = ({ isOpen, onClose }) => {
  const [selectedCard, setSelectedCard] = useState(null)
  const [isTeacherRegistration, setIsTeacherRegistration] = useState(false)
  const [isRegisterMode, setIsRegisterMode] = useState(false)

  const handleTeacherRegistration = () => setIsTeacherRegistration(!isTeacherRegistration)

  const handleCardSelect = cardType => {
    setSelectedCard(cardType)
  }

  const roles = [
    {
      role: 'Student',
      image: 'https://cdn2.iconfinder.com/data/icons/learning-6/64/Student-Graduate-256.png'
    },
    {
      role: 'Teacher',
      image: 'https://cdn1.iconfinder.com/data/icons/education-outline-16/60/023_-_Teaching-256.png'
    },
    {
      role: 'Admin',
      image: 'https://cdn2.iconfinder.com/data/icons/essential-web-2/50/user-add-plus-create-admin-256.png'
    }
  ]

  const renderCardContent = () => {
    switch (selectedCard) {
      case 'Student':
        // Render Student form or component
        return (
          <div>
            {/* <Typography variant='h5' sx={{ fontWeight: 600, textAlign: 'center' }}>
              Student
            </Typography> */}
            {isRegisterMode ? (
              <StudentRegisterForm
                onSubmit={values => handleRegister(values)}
                RegisterSubtitle=''
                RegisterTitle='Student Registration'
                toggleRegisterMode={() => setIsRegisterMode(!isRegisterMode)}
                isRegisterMode={isRegisterMode}
              />
            ) : (
              <StudentLoginForm
                onSubmit={values => handleLogin(values)}
                loginSubtitle=''
                loginTitle='Student Login'
                toggleRegisterMode={() => setIsRegisterMode(!isRegisterMode)}
                isRegisterMode={isRegisterMode}
              />
            )}
          </div>
        )
      case 'Teacher':
        // Render Teacher form or component
        return (
          <div>
            {/* <Typography variant='h5' sx={{ fontWeight: 600, textAlign: 'center' }}>
              Teacher
            </Typography> */}
            {isTeacherRegistration ? (
              <TeacherRegisterForm
                onSubmit={values => console.log(values)}
                loginSubtitle=''
                loginTitle='Teacher Registration'
                handleTeacherRegistration={handleTeacherRegistration}
              />
            ) : (
              <TeacherLoginForm
                handleTeacherRegistration={handleTeacherRegistration}
                onSubmit={values => console.log(values)}
                loginSubtitle=''
                loginTitle='Teacher Login'
              />
            )}
          </div>
        )
      case 'Admin':
        // Render Admin form or component
        return (
          <div>
            {/* <Typography variant='h5' sx={{ fontWeight: 600, textAlign: 'center' }}>
              Administrator
            </Typography> */}
            <AdminLoginForm onSubmit={values => console.log(values)} loginSubtitle='' loginTitle='Admin Login' />
          </div>
        )
      default:
        return <Typography style={{ textAlign: 'center' }}>Please select a user type</Typography>
    }
  }

  return (
    <Modal className={'selectionModal'} open={isOpen} onClose={onClose}>
      <div
        className='innerWrap'
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '700px',
          width: '100%'
        }}
      >
        <Card>
          <CardContent>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant='h6' style={{ textAlign: 'center' }} gutterBottom>
                Select User Type
              </Typography>
              <Button className='crossBtn' onClick={onClose} variant='contained' color='error'>
                x
              </Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0px' }}>
              {roles.map((instance, index) => (
                <Card
                  key={index}
                  className={selectedCard == instance.role ? 'active' : 'inactive'}
                  onClick={() => handleCardSelect(instance.role)}
                  style={{ cursor: 'pointer', width: '150px' }}
                >
                  <CardContent style={{ textAlign: 'center', height: '100%' }}>
                    <Typography style={{ marginBottom: '0px', fontSize: '14px' }} variant='h6'>
                      {instance.role}
                    </Typography>
                    <img
                      src={instance.image}
                      alt={instance.role}
                      style={{ maxWidth: '100%', height: 'auto', objectFit: 'cover' }}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
            {renderCardContent()}
          </CardContent>
        </Card>
      </div>
    </Modal>
  )
}

export default UserSelectionModal
