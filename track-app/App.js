import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import AccountScreen from "./src/screens/AccountScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import ResolveScreen from "./src/screens/ResolveScreen";
import { AuthProvider } from "./src/contexts/authContext";
import { Provider as TrackProvider } from "./src/contexts/TrackContext";

import { useAuthContext } from "./src/contexts/authContext";
import { LocationProvider } from "./src/contexts/locationContext";

const AuthStack = createNativeStackNavigator(); //The contain my auth flow
const TrackStack = createNativeStackNavigator(); //Part of the main flow
const Tab = createBottomTabNavigator(); //This contains my main screen as tabs after the user is authenticated
const RootStack = createNativeStackNavigator(); //The root stack that renders my stack both authenticated and unauthenticated

//Stack navigators
const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator initialRouteName="SignIn">
      <AuthStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ title: "Sign In", header: () => null }} //hide the header options like back button and others
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ title: "Sign Up", headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};

const TrackStackNavigator = () => {
  return (
    <TrackStack.Navigator>
      <TrackStack.Screen
        name="TrackList"
        component={TrackListScreen}
        options={{ title: "Tracks", headerShown: false }}
      />
      <TrackStack.Screen name="TrackDetail" component={TrackDetailScreen} />
    </TrackStack.Navigator>
  );
};

const TabNavigator = () => {
  //This navigators will be rendered as tabs in the bottom of the screen
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 14, // Font size for the labels
          fontWeight: "bold", // Make it bold if needed
        },
        tabBarActiveTintColor: "tomato", // Active label color
        tabBarInactiveTintColor: "gray", // Inactive label color
        tabBarIcon: () => null, // Remove default icons
      }}
    >
      <Tab.Screen
        name="Tracks"
        component={TrackStackNavigator}
        options={{ tabBarBadge: 7 }}
      />
      <Tab.Screen
        name="Create"
        component={TrackCreateScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

//Root stack navigation
const RootStackNavigator = () => {
  // const { state, setToken } = useAuthContext();

  // // to avoid using auth Screen as flash screen while async storage is still fetching data
  // const [loading, setLoading] = React.useState(true); // State to manage loading
  // //An empty screen that render null can be returned instead of the loading screen

  // React.useEffect(() => {
  //   //load the token from storage if available and store in the state
  //   const loadTokenFromStorage = async () => {
  //     try {
  //       const token = await getTokenFromStorage();
  //       if (token) {
  //         setToken(token);
  //       }
  //     } catch (err) {
  //       Alert.alert("Error", err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   loadTokenFromStorage();
  // }, []);
  // if (loading) {
  //   return (
  //     <ActivityIndicator
  //       size="large"
  //       color="#0000ff"
  //       style={{ margin: "auto" }}
  //     />
  //   );
  // }

  const { state } = useAuthContext(); // to know the flow to render
  const [isResolved, setIsResolved] = useState(false); //This will let us know if the async storage fetching status

  if (!isResolved) {
    //if the async storage fetching is not yet resolved(completed) which ids the default status
    return (
      <ResolveScreen
        onResolve={() => setIsResolved(true)} //once set to true this Screen go off(because of the returned NULL)
      />
    );
  }
  console.log({ state });

  return (
    <RootStack.Navigator>
      {!state.token ? ( //if not token is available then auth flow will be rendered
        <RootStack.Screen
          name="Auth"
          component={AuthStackNavigator}
          options={{ headerShown: false }} /**hide header */
        />
      ) : (
        <RootStack.Screen //main tabs screen will be rendered if token is available
          name="Tabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      )}
    </RootStack.Navigator>
  );
};

export default function App() {
  return (
    <TrackProvider>
      <AuthProvider>
        <LocationProvider>
          <NavigationContainer>
            <RootStackNavigator />
          </NavigationContainer>
        </LocationProvider>
      </AuthProvider>
    </TrackProvider>
  );
}

// export default function App() {
//   return (
//     <NavigationContainer>
//       <RootStack />
//     </NavigationContainer>
//   );
// }
