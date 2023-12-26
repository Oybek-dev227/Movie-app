import React from "react";
import {Dimensions, Image, ScrollView, Text, TouchableWithoutFeedback, View} from "react-native";
import {image185} from "../api";
import {useNavigation} from "@react-navigation/native";

const {width,height} = Dimensions.get("window")

export default function UpcomingMovie({upcoming, title}){
    const navigation = useNavigation()
    return(
        <View className={'mb-5 space-y-8'}>
            <Text className={"text-white text-xl font-semibold"}>{title}</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:15}}>
                {upcoming.map(item =>(
                    //Buttonda efecti bulsa bunda unaqa nersala yuq
                    <TouchableWithoutFeedback key={item.id} onPress={()=> navigation.navigate('Movie', item.id)}>
                        <View className={"space-y-1 mr-3"} >
                            <Image source={{uri:image185(item.poster_path)}} className={'rounded-3xl'} style={{width:width * 0.4, height:height *0.3}}/>
                            {/*slice() === substr() malumot qirqib olish*/}
                            <Text className={'text-white text-center font-semibold'}>{item.title.length > 12 ? item.title.slice(0,10) + "..." : item.title}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                ))}
            </ScrollView>
        </View>
    )
}