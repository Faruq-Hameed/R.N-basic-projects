
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import AccountScreen from './src/screens/AccountScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';


const AuthStack = createNativeStackNavigator();
const TrackStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

//Stack navigators  
const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator initialRouteName="SignUp">
      <AuthStack.Screen name="SignIn" component={SignInScreen} options={{title: 'Sign In', header: () => null}}/>
      <AuthStack.Screen name="SignUp" component={SignUpScreen} options={{title: 'Sign Up', headerShown: false}} />
    </AuthStack.Navigator>
  );
}

const TrackStackNavigator = () => {
  return (
    <TrackStack.Navigator>
      <TrackStack.Screen name="TrackList" component={TrackListScreen} options={{title: "Tracks", headerShown: false}} />
      <TrackStack.Screen name="TrackDetail" component={TrackDetailScreen} />
    </TrackStack.Navigator>
  );
}

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Tracks" component={TrackStackNavigator} />
      <Tab.Screen name="Create" component={TrackCreateScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  )
}

//Root stack navigation
const RootStackNavigator = () => {
  return (
      <RootStack.Navigator>
        <RootStack.Screen name="Auth" component={AuthStackNavigator} options={{headerShown: false}} /**hide header */ />
        <RootStack.Screen name="Tabs" component={TabNavigator} options={{headerShown: false}}/>
      </RootStack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
}

// export default function App() {
//   return (
//     <NavigationContainer>
//       <RootStack />
//     </NavigationContainer>
//   );
// }