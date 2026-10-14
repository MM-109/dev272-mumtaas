import { dhikr, type Dhikr } from "@/data/dhikr";
import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DhikrPhrasesScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <FlatList<Dhikr>
        data={dhikr}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.row}
            onPress={() =>
              router.push({
                pathname: "/dhikr/[id]",
                params: { id: item.id },
              })
            }
          >
            <Text style={styles.rowTitle}>{item.name}</Text>
            <Text style={styles.count}>{item.count}</Text>
          </Pressable>
        )}
        ListFooterComponent={
          <View style={styles.footer}>
            <Pressable
              style={styles.button}
              onPress={() => router.navigate("/")}
            >
              <Text style={styles.buttonText}>Go to Home</Text>
            </Pressable>
          </View>
        }
        contentContainerStyle={styles.container}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8F5EC",
  },
  container: {
    padding: 16,
    gap: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    gap: 12,
  },
  rowTitle: {
    flex: 1,
    fontWeight: "600",
    color: "#184D3B",
  },
  count: {
    color: "#92743C",
  },
  footer: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 16,
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
