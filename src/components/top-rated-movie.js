import React from "react";
import {Dimensions, Text, View} from "react-native";
import Carousel from "react-native-snap-carousel";
import MovieCard from "./movie.card";

const {width,height} = Dimensions.get("window")

export default function TopRatedMovie({topRated, title}){
    return(
        <View className={'mb-6 mt-2'}>
            <Text className={"text-white text-xl mb-3 font-semibold"}>{title}</Text>

            <Carousel data={topRated} renderItem={({item}) => <MovieCard item={item}/>}
                      firstItem={1}
                      inactiveSlideOpacity={0.4}
                      sliderWidth={width}
                      itemWidth={width * 0.7}
                      slideStyle={{display:'flex', alignItems:'center'}}
            />
        </View>
    )
}