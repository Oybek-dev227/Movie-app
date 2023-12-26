import React, {useEffect, useState} from "react";
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import {fetchPopularMovie, fetchTopRatedMovie, fetchTrendingMovie, fetchUpcomingMovie} from "../api";
import TrendingMovie from "../components/trending-movie";
import UpcomingMovie from "../components/upcoming-movie";
import TopRatedMovie from "../components/top-rated-movie";
import Loader from "../components/loader";
import {useNavigation} from "@react-navigation/native";

export default function Home() {
    const [trending, setTrending] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const [topRated, setTopRated] = useState([])
    const [popular, setPopular] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    const navigation = useNavigation();

    useEffect(() => {
            getTRendingMovies();
            getUpcomingMovie();
            getTopRateMovie();
            getPopularMovie();
    }, []);
    const getTRendingMovies = async () => {
        const data = await fetchTrendingMovie()
        data.results && setTrending(data.results);
        setIsLoading(false)
    }

    const getUpcomingMovie = async () => {
        const data = await fetchUpcomingMovie()
        data.results && setUpcoming(data.results);
    }

    const getTopRateMovie = async () => {
        const data = await fetchTopRatedMovie()
        data.results && setTopRated(data.results);
    }

    const getPopularMovie = async () => {
        const data = await fetchPopularMovie()
        data.results && setPopular(data.results);
    }

    return (
        <View className="flex-1 bg-slate-900">
            {/*//safeAreaView hech qachon hech qayerga qimirlamaydi*/}

            <SafeAreaView>
                <StatusBar style={"light"}/>
                <View className={'flex-row justify-between items-center mx-4'}>
                    <Image className={"rounded-2xl"} style={{width: 70, height: 70}}
                           source={require("C:\\Users\\OybekDev\\Movie-app\\assets\\movie.logocha.jpg")}/>
                    <Text className={"text-white text-3xl font-semibold"} style={{marginLeft:-130}}>Movies</Text>
                    <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
                        <MagnifyingGlassIcon size={30} strokeWidth={2} color={'white'}/>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {isLoading ? (
                <Loader/>
            ) : (
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{padding: 20}}>
                    {trending.length > 0 && <TrendingMovie trending={trending}/>}
                    {upcoming.length > 0 && <UpcomingMovie upcoming={upcoming} title={"Upcoming Movies"}/>}
                    {popular.length > 0 && <UpcomingMovie upcoming={popular} title={"Popular Movies"}/>}
                    {upcoming.length > 0 && <UpcomingMovie upcoming={trending.reverse()} title={"Trending Movies"}/>}
                    {topRated.length > 0 && <TopRatedMovie topRated={topRated} title={"Top Rated Movies"}/>}
                </ScrollView>
            )}
        </View>
    )
}