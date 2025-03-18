import {FC, type PropsWithChildren} from 'react';
import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';

import {selectAuthUser} from '@/redux/selectors/auth-selectors';

const ProtectedRoute: FC<PropsWithChildren> = ({children}) => {
  const user = useSelector(selectAuthUser);

  if (!user) return <Navigate to="/auth" />;

  return children;
};

export default ProtectedRoute;
