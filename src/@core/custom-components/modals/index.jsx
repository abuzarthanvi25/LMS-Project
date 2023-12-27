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

  const handleLogin = payload => {
    console.log(payload)
  }

  const handleRegister = payload => {
    console.log(payload)
  }

  const renderCardContent = () => {
    switch (selectedCard) {
      case 'Student':
        // Render Student form or component
        return (
          <div>
            <Typography style={{ textAlign: 'center' }}>Student Form Here</Typography>
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
            <Typography style={{ textAlign: 'center' }}>Teacher Form Here</Typography>
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
            <Typography style={{ textAlign: 'center' }}>Admin Form Here</Typography>
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant='h5' gutterBottom>
                Select User Type
              </Typography>
              <Button className='crossBtn' onClick={onClose} variant='contained' color='primary'>
                x
              </Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0px' }}>
              <Card
                className={selectedCard == 'Student' ? 'active' : 'inactive'}
                onClick={() => handleCardSelect('Student')}
                style={{ cursor: 'pointer', width: '150px' }}
              >
                <CardContent style={{ textAlign: 'center' }}>
                  <Typography style={{ marginBottom: '15px' }} variant='h6'>
                    Student
                  </Typography>
                  <img
                    src='https://cdn2.iconfinder.com/data/icons/learning-6/64/Student-Graduate-256.png'
                    alt='Student'
                    style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }}
                  />
                </CardContent>
              </Card>
              <Card
                className={selectedCard == 'Teacher' ? 'active' : 'inactive'}
                onClick={() => handleCardSelect('Teacher')}
                style={{ cursor: 'pointer', width: '150px' }}
              >
                <CardContent style={{ textAlign: 'center' }}>
                  <Typography style={{ marginBottom: '15px' }} variant='h6'>
                    Teacher
                  </Typography>
                  <img
                    src='https://cdn1.iconfinder.com/data/icons/education-outline-16/60/023_-_Teaching-256.png'
                    alt='Teacher'
                    style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }}
                  />
                </CardContent>
              </Card>
              <Card
                className={selectedCard == 'Admin' ? 'active' : 'inactive'}
                onClick={() => handleCardSelect('Admin')}
                style={{ cursor: 'pointer', width: '150px' }}
              >
                <CardContent style={{ textAlign: 'center' }}>
                  <Typography style={{ marginBottom: '15px' }} variant='h6'>
                    Admin
                  </Typography>
                  <img
                    src='https://cdn2.iconfinder.com/data/icons/essential-web-2/50/user-add-plus-create-admin-256.png'
                    alt='Admin'
                    style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }}
                  />
                </CardContent>
              </Card>
            </div>
            {renderCardContent()}
          </CardContent>
        </Card>
      </div>
    </Modal>
  )
}

export default UserSelectionModal
