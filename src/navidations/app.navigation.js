import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from "../screens/home";
import Details from "../screens/movie";
import Movie from "../screens/movie";
import Person from "../screens/person";
import Search from "../screens/search";
import SearchedMovies from "../screens/searchedMovies";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={"Home"} component={Home} options={{headerShown: false}}/>
                <Stack.Screen name={"Movie"} component={Movie} options={{headerShown: false}}/>
                <Stack.Screen name={"Person"} component={Person} options={{headerShown: false}}/>
                <Stack.Screen name={"Search"} component={Search} options={{headerShown: false}}/>
                <Stack.Screen name={"SearchedMovies"} component={SearchedMovies} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}