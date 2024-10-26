import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

const App = () => {
  const components = [
    {
      id: 1,
      name: "HexagonCarousel",
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={components}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Link  href={{
            pathname: '/componentView',
            params: { name: item.name }
          }} asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
          </Link>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 16,
  },
  button: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0095FF",
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "400",
  },
});

export default App;
