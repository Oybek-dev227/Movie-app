import React, {useCallback, useState} from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {XMarkIcon} from "react-native-heroicons/outline";
import {useNavigation} from "@react-navigation/native";
import {debounce} from "lodash";
import {fetchSearchMovie, image185} from "../api";
import Loader from "../components/loader";

const {width,height} = Dimensions.get("window")

export default function Search() {


    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    const navigation = useNavigation();

   const handleSearch = searchText =>{
       if (searchText && searchText.length > 3){
            setIsLoading(true)
            fetchSearchMovie({
                query: searchText,
                include_adult: false,
                page: '1',
            }).then(data=>{
                setIsLoading(false)
                console.log("APi - req")
                setResults(data.results);
            });
       }else {
           setResults([]);
           setIsLoading(false);
       }
   }

    const handleTextDebounce = useCallback(debounce(handleSearch, 600), [])
    return (
        <SafeAreaView className="flex-1 bg-slate-900">
            <View className={"m-4 flex-row justify-between items-center border border-neutral-400 rounded-full"}>
                <TextInput onChangeText={handleTextDebounce} placeholder={"Search movie"} placeholderTextColor={"lightgray"} className={"pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wide"}/>
                <TouchableOpacity onPress={()=>navigation.goBack()} className={"rounded-full p-2 m-1 bg-neutral-400"}>
                    <XMarkIcon color={"white"} size={25}/>
                </TouchableOpacity>
            </View>

            {isLoading ? <Loader/> : results.length > 0 ? (
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:15}} className={'space-y-3'}>
                    <Text className={"text-white font-semibold ml-1"}>Results ({results.length})</Text>
                    {/*flex-wrap pastga tushib ketaveradi content*/}
                    <View className={"flex-row justify-between flex-wrap"}>
                        {results?.map((item,index)=>(
                            <TouchableWithoutFeedback onPress={()=>navigation.navigate('SearchedMovies')} key={index}>
                                <View className={"space-y-2 mb-4"}>
                                    <Image source={{uri: image185(item.poster_path)}} className={"rounded-3xl"} style={{width:width * 0.44, height: height *0.3 }}/>
                                    <Text className={"text-gray-300 ml-1"}>{item.title.length > 22 ? item.title.slice(0, 22) + '...' : item.title}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        ))}
                    </View>
                </ScrollView>
            ): (
                <View>
                    <View className={'flex-row justify-center m-6'}>
                        <Image className={"mt-5"} style={{width: width * .9, height: height *0.4}}
                               source={require("C:\\Users\\OybekDev\\Movie-app\\assets\\watchMovie.png")}/>

                    </View>
                    <Text className={"text-white text-center mt-5 text-3xl"}>Movies not found...</Text>
                </View>
            )}
        </SafeAreaView>
    )
}