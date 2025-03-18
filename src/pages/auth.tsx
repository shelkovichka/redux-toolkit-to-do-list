import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {useAuth} from '@/hooks/use-auth';
import {Card} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {selectAuthLoading} from '@/redux/selectors/auth-selectors';
import {Spinner} from '@/components/ui/spinner';
import logo from '@/assets/img.png';

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
  const {signUp, login} = useAuth();
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

  const onSubmit = async ({email, password}: AuthFormData) => {
    if (isRegistering) {
      await signUp(email, password);
    } else {
      await login(email, password);
    }
    navigate('/');
    reset();
  };

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
            <div className="relative">
              <Controller
                name="email"
                control={control}
                render={({field}) => <Input {...field} placeholder="Email" />}
              />
              {errors.email && (
                <p className="absolute top-9 left-3.5 text-red-500 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="relative">
              <Controller
                name="password"
                control={control}
                render={({field}) => (
                  <Input {...field} type="password" placeholder="Password" />
                )}
              />
              {errors.password && (
                <p className="absolute top-9 left-3.5 text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

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
              onClick={() => setIsRegistering(!isRegistering)}
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
