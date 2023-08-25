import * as Yup from 'yup';

export const validationSchema = isLogin =>
  Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword:
      isLogin === true &&
      Yup.string()
        .min(8, 'Password must be at least 6 characters')
        .oneOf([Yup.ref('password'), 'null'], 'Passwords must match')
        .required('Confirm Password is required'),
  });

export const validationSchemaForLogin = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

export const updateProfileSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, 'User Name must be at least 6 characters')
    .required('User Name is required'),
  mobileNumber: Yup.string()
    .min(10, 'User Mobile Number must be at least 10 characters')
    .required('User Mobile Required is required'),
  address: Yup.string().required('Address Required is required'),
});
