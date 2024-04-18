import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import Tabs from './src/components/Tabs';
import CropRecommend1 from './src/components/CropRecommend1';
import EnterValues from './src/components/EnterValues';
import PostData from './src/components/PostEquipments';
import Options from './src/components/Options';
import PostCattle from './src/components/PostCattle';
import PostFertilizers from './src/components/PostFertilizers';
import PostCrops from './src/components/PostCrops';
import MapViews from './src/components/MapViews';
import LandDetail from './src/components/LandDetail';
import ImageCapture from './src/components/ImageCapture';
import Recommendation from './src/components/Recommendation';
import UserData from './src/components/UserData';
import ResultsPage from './src/components/ResultsPage';
import SubmitDocument from './src/components/SubmitDocument';
import ViewDetails from './src/components/ViewDetails';
import FarmersList from './src/components/FarmersList';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="CropRecommend1" component={CropRecommend1} options={{ headerShown: false }} />
        <Stack.Screen name="Recommendation" component={Recommendation} options={{ headerShown: false }} />
        <Stack.Screen name="EnterValues" component={EnterValues} options={{ headerShown: false }} />
        <Stack.Screen name="ImageCapture" component={ImageCapture} options={{ headerShown: false }}/>
        <Stack.Screen name="PostData" component={PostData} options={{ headerShown: false }} />
        <Stack.Screen name="Options" component={Options} options={{ headerShown: false }} />
        <Stack.Screen name="PostCrops" component={PostCrops} options={{ headerShown: false }} />
        <Stack.Screen name="PostFertilizers" component={PostFertilizers} options={{ headerShown: false }} />
        <Stack.Screen name="PostCattle" component={PostCattle} options={{ headerShown: false }} />
        <Stack.Screen name="MapViews" component={MapViews} options={{ headerShown: false }}/>
        <Stack.Screen name="LandDetail" component={LandDetail} options={{ headerShown: false }}/>
        <Stack.Screen name="UserData" component={UserData} options={{ headerShown: false }}/>
        <Stack.Screen name="ResultsPage" component={ResultsPage} options={{ headerShown: false }}/>
        <Stack.Screen name="SubmitDocument" component={SubmitDocument} options={{headerShown:false}}/>
        <Stack.Screen name="ViewDetails" component={ViewDetails} options={{headerShown:false}}/>
        <Stack.Screen name="FarmersList" component={FarmersList} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

