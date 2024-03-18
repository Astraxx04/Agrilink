import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import Home from './src/screens/Home';
import Tabs from './src/components/Tabs';
import CropRecommend1 from './src/components/CropRecommend1';
import EnterValues from './src/components/EnterValues';
import ImageCapture from './src/components/ImageCapture';
import ResultsPage from './src/components/ResultsPage';





const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="CropRecommend1" component={CropRecommend1} options={{ headerShown: false }} />
        <Stack.Screen name="EnterValues" component={EnterValues} options={{ headerShown: false }} />
        <Stack.Screen name="ImageCapture" component={ImageCapture} options={{ headerShown: false }} />
        <Stack.Screen name="ResultsPage" component={ResultsPage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

