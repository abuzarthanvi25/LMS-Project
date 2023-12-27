import * as Yup from 'yup'

export const studentLoginInitialValues = {
  email: '',
  password: ''
}

export const studentLoginValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required')
})

export const studentRegisterInitialValues = {
  fullName: '',
  email: '',
  password: ''
}

export const studentRegisterValidationSchema = Yup.object({
  fullName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required')
})
