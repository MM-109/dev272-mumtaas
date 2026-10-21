import { useDhikr } from "@/context/DhikrContext";
import type { Dhikr } from "@/data/dhikr";
import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DhikrPhrasesScreen() {
  const { dhikrList } = useDhikr();

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <FlatList<Dhikr>
        data={dhikrList}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <Pressable
            style={styles.addButton}
            onPress={() => router.push("/add")}
          >
            <Text style={styles.addButtonText}>+ Add New Dhikr</Text>
          </Pressable>
        }
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
            <Text style={styles.count}>{item.target} times</Text>
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
  addButton: {
    backgroundColor: "#184D3B",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 8,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
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