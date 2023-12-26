import React, {useEffect, useState} from "react";
import {Button, Dimensions, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {fetchPersonalDetails, fetchPersonalMovies, image185, image342} from "../api";
import Loader from "../components/loader";
import {HeartIcon} from "react-native-heroicons/solid";
import {ChevronLeftIcon} from "react-native-heroicons/outline";
import {SafeAreaView} from "react-native-safe-area-context";
import UpcomingMovie from "../components/upcoming-movie";


const {width,height} = Dimensions.get("window")

export default function Person(){

// id-ni ushlab olish artistni
    const {params: id} = useRoute();

    const [isLoading, setIsLoading] = useState(true);
    const [person, setPerson ] = useState({});
    const [personMovies, setPersonMovies] = useState([]);
    const [isFavourite, setIsFavourite] = useState(false);
    const navigation = useNavigation();



    useEffect(() => {
        getPersonDetail()
        getPersonMovies()
    }, [id]);
    const getPersonDetail = async () =>{
        const data = await fetchPersonalDetails(id);
        setPerson(data);
        setIsLoading(false);
    }

    const getPersonMovies = async () =>{
        const data = await fetchPersonalMovies(id);
        setPersonMovies(data.cast);
    }

    return(
        <ScrollView className={"flex-1 bg-slate-900"} contentContainerStyle={{paddingBottom: 20}}>
            <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-3 mt-3"}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeftIcon color={"#fff"} strokeWidth={2.5} size={30}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setIsFavourite(prevState => !prevState)}>
                    <HeartIcon color={isFavourite ? "red" : "#fff"} strokeWidth={2.5} size={32}/>
                </TouchableOpacity>
            </SafeAreaView>
            {isLoading ? <Loader/> :(
                <View >
                    <View className={"flex-row justify-center"} style={{
                        shadowColor: 'gray',
                        shadowRadius: 40,
                        shadowOffset: {width: 0, height: 5},
                        shadowOpacity: 1,
                    }}>

                        {/*? - belgisi agarda bor bulsa   */}
                        <View className={"items-center rounded-full overflow-hidden h-72 w-72 border-neutral-500 border-2 mt-5"}>
                            <Image source={{uri: image342(person?.profile_path)}}
                                   style={{height: height*0.43, width: width*0.74}}
                            />
                        </View>
                    </View>
                    <View className={"mt-6"}>
                        <Text className={"text-3xl text-white font-bold text-center"}>{person?.name}</Text>
                        <Text className={"text-3xl text-neutral-400 text-base text-center"}>{person?.place_of_birth}</Text>
                    </View>
                    <View className={"mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full"}>
                        <View className={"border-r-2 border-r-neutral-400 px-2 items-center "}>
                            <Text className={"text-white font-semibold"}>Gender</Text>
                            <Text className={"text-neutral-400 text-1xl"}>{person?.gender === 1 ? "Female":"Male"}</Text>
                        </View>
                        <View className={"border-r-2 border-r-neutral-400 px-2 items-center"}>
                            <Text className={"text-white font-semibold"}>Birth day</Text>
                            <Text className={"text-neutral-400 text-1xl"}>{person?.birthday}</Text>
                        </View>

                        <View className={"border-r-2 border-r-neutral-400 px-2 items-center "}>
                            <Text className={"text-white font-semibold"}>Known for</Text>
                            <Text className={"text-neutral-400 text-1xl"}>{person?.known_for_department}</Text>
                        </View>

                        <View className={"px-2 items-center "}>
                            <Text className={"text-white font-semibold"}>Popularity</Text>
                            <Text className={"text-neutral-400 text-1xl"}>{person?.popularity?.toFixed(2)} %</Text>
                        </View>
                    </View>
                    <View className={"my-6 mx-4 space-y-2"}>
                        <Text className={"text-white text-lg"}>Biography</Text>
                        <Text className={"text-neutral-400 tracking-wide "}>{person.biography}</Text>
                    </View>
                    {person?.id && personMovies.length > 0 && <UpcomingMovie title={"Movies"} upcoming={personMovies}/>}
                </View>
                )}
        </ScrollView>
        )

}