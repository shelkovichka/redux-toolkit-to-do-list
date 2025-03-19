import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {AppDispatch} from '@/redux/store';
import {Card} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {selectAuthLoading} from '@/redux/selectors/auth-selectors';
import {Spinner} from '@/components/ui/spinner';
import logo from '@/assets/img.png';
import {signUpUser, loginUser} from '@/redux/actions/auth-actions';
import FormField from '@/components/form-field';

interface AuthFormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup
      .string()
      .lowercase()
      .email('Invalid e-mail')
      .required('Email is required')
      .trim(),
  password: yup.string().required('Password is required').trim(),
});

const Auth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const loading = useSelector(selectAuthLoading);
  const [isRegistering, setIsRegistering] = useState(false);

  const {
    handleSubmit,
    control,
    formState: {errors},
    reset,
  } = useForm<AuthFormData>({
    resolver: yupResolver(schema),
    defaultValues: {email: '', password: ''},
  });

  const onSubmit = async (formData: AuthFormData) => {
    const action = isRegistering ? signUpUser(formData) : loginUser(formData);
    const resultAction = await dispatch(action);

    if (
      signUpUser.fulfilled.match(resultAction) ||
      loginUser.fulfilled.match(resultAction)
    ) {
      navigate('/');
      reset();
    }
  };

  const toggleAuthMode = () => setIsRegistering(!isRegistering);

  return (
    <div className="w-full h-[80dvh] flex items-center justify-center">
      <div className="hidden md:flex flex-1">
        <img src={logo} alt="Logo" className="max-h-[80vh] object-contain" />
      </div>
      <div className="flex flex-1 items-center justify-center md:justify-start">
        <Card className="p-6 m-0 w-full max-w-96">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-6"
          >
            <h2 className="text-lg font-semibold">
              {isRegistering ? 'Sign Up' : 'Log In'}
            </h2>

            <FormField
              name="email"
              control={control}
              errors={errors}
              placeholder="Email"
            />
            <FormField
              name="password"
              control={control}
              errors={errors}
              placeholder="Password"
              type="password"
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <Spinner className="text-blue-400" />
              ) : isRegistering ? (
                'Sign Up'
              ) : (
                'Log In'
              )}
            </Button>

            <p
              onClick={toggleAuthMode}
              className="text-sm text-blue-500 cursor-pointer"
            >
              {isRegistering ?
                'Have account? Log In' :
                'Don\'t have account? Sign Up'}
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
