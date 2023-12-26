    import React from "react";
    import { StyleSheet,Text } from 'react-native';
    import AnimatedLoader from "react-native-animated-loader";
    export default function Loader(){
        return (
            <AnimatedLoader
                visible={true}
                overlayColor="rgb(2,6,23)"
                source={require("C:\\Users\\OybekDev\\Movie-app\\assets\\loader.json")}
                animationStyle={styles.lottie}
                speed={1}
            >
                <Text>Loading...</Text>
            </AnimatedLoader>
        );
    }

    const styles = StyleSheet.create({
        lottie: {
            width: 100,
            height: 100,
        }
    });
