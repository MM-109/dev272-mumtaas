import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function DuasScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Duas</Text>
      <Text style={styles.subtitle}>Content coming soon...</Text>
      <Pressable style={styles.button} onPress={() => router.push("/")}>
        <Text style={styles.buttonText}>Go to Home</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F5EC",
    padding: 16,
    gap: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#184D3B",
  },
  subtitle: {
    fontSize: 16,
    color: "#92743C",
  },
  button: {
    backgroundColor: "#184D3B",
    padding: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});