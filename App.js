import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from "./pages/login-page/loginPage";
import RegistrationScreen from "./pages/registration-page/RegistrationScreen";
import NewItemScreen from "./pages/add-new-item-page/NewItemScreen";
import ProfileScreen from "./pages/profile-page/ProfileScreen";
import RecomendtationScreen from "./pages/recomendation-page/RecomendtationScreen";
import {useFonts} from "expo-font";
import {UserProvider} from "./contexts/UserContext";

const Stack = createStackNavigator();

export default function App() {
    let [fontsLoaded] = useFonts({
        'Source Sans Pro': require('./assets/fonts/SourceSansPro-Regular.ttf'),  // Укажите путь к файлу шрифта
        'SourceSansPro-Bold': require('./assets/fonts/SourceSansPro-Bold.ttf')  // Пример для жирного шрифта
    });

    return (
        // <ProfileScreen></ProfileScreen>
        <UserProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Login" component={LoginPage} />
                    <Stack.Screen name="Register" component={RegistrationScreen} />
                    <Stack.Screen name="NewItem" component={NewItemScreen} />
                    <Stack.Screen name="Profile" component={ProfileScreen} />
                    <Stack.Screen name="Recommendations" component={RecomendtationScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </UserProvider>
    );
}
