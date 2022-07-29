import React from "react";
import { NativeBaseProvider, StatusBar } from "native-base";
import {THEME} from './src/styles/theme';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import Loading from "./src/Components/Loading";
import { NavigationContainer } from "@react-navigation/native";
import { Routes } from "./src/Routes";

export default function App() {

  const [fonstLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold});

  return (
    <NavigationContainer >
      <NativeBaseProvider theme={THEME}>
        <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />
        { fonstLoaded ? <Routes /> : <Loading />}
      </NativeBaseProvider>
    </NavigationContainer>
  );
}