import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import HexagonCarousel from "../components//01-Hexagon-Carousel/HexagonCarousel";

const ComponentView = () => {
  const { name } = useLocalSearchParams();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {name === "HexagonCarousel" && <HexagonCarousel />}
    </SafeAreaView>
  );
};

export default ComponentView;
