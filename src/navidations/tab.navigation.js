import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home from "../screens/home";
import Details from "../screens/movie";
import Search from "../screens/person";
import Ionicons from 'react-native-vector-icons/Ionicons'

const Tab = createBottomTabNavigator();
export default function TabNavigation(){
    return(
        <NavigationContainer>
            <Tab.Navigator screenOptions={({route}) =>({
                tabBarIcon: ({focused, color, size}) =>{
                    let iconName;
                    if (route.name === "Home"){
                        iconName = focused ? 'home' : 'home-outline';
                    }else if (route.name === "Details"){
                        iconName = focused ? 'settings' : 'settings-outline';
                    }else if (route.name === 'Search'){
                        iconName = focused ? 'search' : 'search-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color}/>
                },
                tabBarActiveTintColor: 'crimson',
                tabBarInactiveTintColor: 'black'
            })}>
                <Tab.Screen name={"Home"} component={Home} options={{headerShown:false}}/>
                <Tab.Screen name={"Details"} component={Details} options={{headerShown:false}}/>
                <Tab.Screen name={"Search"} component={Search} options={{headerShown:false, tabBarBadge: 10}}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}