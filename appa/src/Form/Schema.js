import * as yup from 'yup'

const Schema = yup.object().shape({
  email: yup
    .string()
    .email('Email must be valid')
    .required('Email is required'),
  name: yup
    .string()
    .min(3, 'Name must be at least 3 characters')
    .required('Name is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  tos: yup
    .boolean()
    .oneOf([true],'Must accept terms and conditions')
})
export default Schema