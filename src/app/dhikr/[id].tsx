import { dhikr } from "@/data/dhikr";
import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function DhikrDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const selectedDhikr = dhikr.find((item) => item.id === id);

  if (!selectedDhikr) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Dhikr Not Found" }} />
        <Text style={styles.title}>Dhikr not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: selectedDhikr.name }} />

      <Text style={styles.title}>{selectedDhikr.name}</Text>
      <Text style={styles.subtitle}>Remembrance of Allah</Text>
      <Text style={styles.count}>
        Suggested count: {selectedDhikr.count}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F5EC",
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#184D3B",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#92743C",
  },
  count: {
    fontSize: 18,
    color: "#184D3B",
  },
});
