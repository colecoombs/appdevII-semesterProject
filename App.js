import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as SecureStore from 'expo-secure-store';

import HomeScreen from './screens/HomeScreen';
import Location from './screens/Location';
import Journal from './screens/Journal';

import getJournal from './components/GetJournal';

const curLocation = {zip: '65802'};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const App =() => {
    return (
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, color, size}) => {
                let iconName;
                if (route.name ==='Home') {
                  iconName = focused 
                    ? 'home'
                    : 'home-outline';
                } else if (route.name==='Location') {
                  iconName = focused ? 'list' : 'list-outline';
                }
                else if (route.name==='Journal') {
                  iconName = focused ? 'journal' : 'journal-outline';
                }
                return <Ionicons name={iconName} size={size} color={color} />
              },
              tabBarActiveTintColor: '#03DAC6',
              tabBarInactiveTintColor: '#018786',
              tabBarActiveBackgroundColor: '#6200EE',
              tabBarInactiveBackgroundColor: '#3700B3'
            })}
          >
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={ {
                title: 'MyWeather', 
                headerStyle: {
                  backgroundColor: '#6200EE',
                },
                headerTitleStyle: {
                  color: '#fff',
                },
              }}
            />
            <Tab.Screen 
              name ='Location'
              component={Location}
              initialParams={curLocation}
              options={ {
                title: 'Locations',
                headerStyle: {
                  backgroundColor: '#6200EE',
                },
                headerTitleStyle: {
                  color: '#fff',
                },
              }} 
            />
            <Tab.Screen 
              name ='Journal'
              component={Journal}
              options={ {
                title: 'Journal',
                headerStyle: {
                  backgroundColor: '#6200EE',
                },
                headerTitleStyle: {
                  color: '#fff',
                },
              }} 
            />
          </Tab.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;