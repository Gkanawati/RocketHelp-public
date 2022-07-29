import { useState, useEffect } from 'react';
import Loading from '../Components/Loading';
import SignIn from '../Pages/SignIn';
import { AppRoutes } from './app.routes';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export function Routes() {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();

  useEffect(() => {

    // verifica se o usuario ta autenticado ou não
    const subscriber = auth()
    .onAuthStateChanged(response => {
      setUser(response);
      setLoading(false);
    })

    return subscriber;

  }, [])

  if(loading) {
    return <Loading />
  }

  return (
    <>
      { user ? <AppRoutes /> : <SignIn />}
    </>
  );
}