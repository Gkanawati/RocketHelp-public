import { Home } from '../Pages/Home';
import { Register } from '../Pages/Register';
import { Details } from '../Pages/Details';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const {Navigator, Screen} = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
        
        <Screen
            name='Home'
            component={Home}
        />

        <Screen
            name='Register'
            component={Register}
        />

        <Screen
            name='Details'
            component={Details}
        />

    </Navigator>
  );
}