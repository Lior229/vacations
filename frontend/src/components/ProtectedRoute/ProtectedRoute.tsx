import React, { FC, ReactElement, ReactNode, useEffect } from 'react';
import  { useNavigate  } from 'react-router-dom'
import { useAppSelector } from '../../hooks';
import styles from './ProtectedRoute.module.scss';

interface ProtectedRouteProps {
  // children: ReactNode;
  children: ReactElement
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({children}) => {
  const { user } = useAppSelector((state) => state.authState);
  const navigate = useNavigate();

  useEffect(() => {
      if (!user){
          navigate('/login')
      }
  }, [user])
  
  const renderContent = () => {
      if (user) {
        return children
      }
  }

  return (
    <div className={styles.ProtectedRoute}>
        {renderContent()}
    </div>
)
};

export default ProtectedRoute;
