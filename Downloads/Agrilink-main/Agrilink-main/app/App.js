import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import Home from './src/screens/Home';
import Tabs from './src/components/Tabs';
import CropRecommend1 from './src/components/CropRecommend1';
import EnterValues from './src/components/EnterValues';
import PostData from './src/components/PostData';
import Options from './src/components/Options';
import PostCattle from './src/components/PostCattle';
import PostFertilizers from './src/components/PostFertilizers';
import PostCrops from './src/components/PostCrops';
import MapViews from './src/components/MapView';
import LandDetail from './src/components/LandDetail';



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
        <Stack.Screen name="PostData" component={PostData} options={{ headerShown: false }} />
        <Stack.Screen name="Options" component={Options} options={{ headerShown: false }} />
        <Stack.Screen name="PostCrops" component={PostCrops} options={{ headerShown: false }} />
        <Stack.Screen name="PostFertilizers" component={PostFertilizers} options={{ headerShown: false }} />
        <Stack.Screen name="PostCattle" component={PostCattle} options={{ headerShown: false }} />
        <Stack.Screen name="MapViews" component={MapViews} options={{ headerShown: false }}/>
        <Stack.Screen name="LandDetail" component={LandDetail} options={{ headerShown: false }}/>
       
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

