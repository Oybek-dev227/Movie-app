import React, {useEffect, useState} from "react";
import {Dimensions, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {ChevronLeftIcon} from "react-native-heroicons/outline";
import {HeartIcon} from "react-native-heroicons/solid";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation, useRoute} from "@react-navigation/native";
import Loader from "../components/loader";
import {fetchCreditsMovie, fetchDetailMovie, fetchSimilarMovie, image500} from "../api";
import {LinearGradient} from "expo-linear-gradient";
import Cast from "../components/cast";
import UpcomingMovie from "../components/upcoming-movie";

const {width,height} = Dimensions.get("window")

export default function SearchedMovies(){
    const [isFavourite, setIsFavourite] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const [searchedMovie, setSearchedMovie] = useState({});
    const [cast, setCast] = useState([]);
    const [similarMovie, setSimilarMovie] = useState([]);

    const navigation = useNavigation()
    const {params: id} = useRoute()

    useEffect(() => {
        getMovieDetail();
        getMovieCredits();
        getMovieSimilar();
    }, [id]);
    const getMovieDetail = async () => {
        const data = await fetchDetailMovie(id);
        setSearchedMovie(data);
        console.log("api",data)
        setIsLoading(false)
    }

    const getMovieCredits = async () => {
        const data = await fetchCreditsMovie(id);
        setCast(data.cast);
    }

    const getMovieSimilar = async () => {
        const data = await fetchSimilarMovie(id);
        setSimilarMovie(data.results);
    }

    return(
        <ScrollView contentContainerStyle={{paddingBottom: 20}} className={'flex-1 bg-slate-900'}>
        <View className={"w-full"}>
            <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-3 mt-3"}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeftIcon color={"#fff"} strokeWidth={2.5} size={30}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setIsFavourite(prevState => !prevState)}>
                    <HeartIcon color={isFavourite ? "red" : "#fff"} strokeWidth={2.5} size={32}/>
                </TouchableOpacity>
            </SafeAreaView>
            {isLoading ? <Loader/> : <View>
                <Image source={{uri: image500(searchedMovie.poster_path)}} style={{width,height:height*0.9}}/>
                <LinearGradient colors={[
                    'transparent',
                    'rgba(23, 23, 23, 0.8)',
                    'rgba(23, 23, 23, 1)'
                ]}
                                style={{width, height: height * 0.4}}
                                start={{ x: 0.5, y: 0}}
                                end={{x:.5,y:1}}
                                className={"absolute bottom-0"}
                />
            </View>}
        </View>
            <View>
                {/*? quyilishining sababi title kelmasa kutib tur degani */}
                <Text className={"text-white text-center text-3xl font-bold tracking-widest"}>{searchedMovie?.title}</Text>
                {searchedMovie?.id ? (
                    // .split("-")[0] massiv formatiga kelitirib olib qirqib oldik yilni
                    <Text className={'text-neutral-400 font-semibold text-base text-center'}>{searchedMovie?.status} - {searchedMovie?.release_date?.split("-")[0]} - {searchedMovie.runtime} min</Text>
                ): null}

                <View className={"flex-row justify-between mx-4 space-x-2"}>
                    {searchedMovie?.genres?.map((genres,idx) => (
                        <Text key={idx} className={"text-white font-semibold text-base text-center"}>
                            {idx !== searchedMovie.genres.length ? "*" : null} {''} {genres?.name}
                        </Text>
                    ))}
                </View>
                <Text className={"text-neutral-400 mx-4 tracking-wide"}>{searchedMovie?.overview}</Text>
            </View>
            {searchedMovie?.id && cast.length > 0 && <Cast cast={cast}/> }

            {searchedMovie?.id && cast.length > 0 && <UpcomingMovie upcoming={similarMovie} title={"Similar movies"}/>}

        </ScrollView>
    )
}