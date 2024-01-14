import * as Yup from 'yup'

export const teacherLoginInitialValues = {
  email: '',
  password: ''
}

export const teacherLoginValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required')
})

export const teacherRegisterInitialValues = {
  fullName: '',
  email: '',
  password: '',
  education: '',
  subject: '',
  uploadCV: null,
  bankAccount: ''
}

export const teacherRegisterValidationSchema = Yup.object({
  fullName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
  education: Yup.string().required('Education is required'),
  subject: Yup.string().required('Subject is required'),
  uploadCV: Yup.mixed()
    .required('Upload CV is required')
    .test('fileSize', 'File size is too large (max 5 MB)', value => value && value.size <= 5 * 1024 * 1024)
})

export const adminLoginInitialValues = {
  email: '',
  password: ''
}

export const adminLoginValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required')
})

export const addCourseInitialValues = {
  courseTitle: '',
  courseDescription: '',
  price: '',
  courseThumbnail: null,
  material_1: null
}

export const addCourseValidationSchema = Yup.object({
  courseTitle: Yup.string().required('Course title is required'),
  courseDescription: Yup.string().required('Course description is required'),
  price: Yup.number('Price must be a number')
    .required('Course price is required')
    .min(0, "Price must be atleast 0"),
  courseThumbnail: Yup.mixed().required('Thumbnail image is required'),
  material_1: Yup.mixed().required('At least one video per course is required')
})
