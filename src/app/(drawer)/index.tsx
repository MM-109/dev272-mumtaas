import { useDhikr } from "@/context/DhikrContext";
import { dhikr } from "@/data/dhikr";
import { router, useNavigation } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const navigation = useNavigation();

  const {
    count,
    selectedDhikrId,
    incrementCount,
  } = useDhikr();

  const selectedDhikr = dhikr.find(
    (item) => item.id === selectedDhikrId
  );

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <View style={styles.topRow}>
        <Pressable
          style={styles.searchBar}
          onPress={() => router.push("/search")}
        >
          <Text style={styles.searchText}>Search dhikr...</Text>
        </Pressable>

        <Pressable
          style={styles.menuButton}
          onPress={() => navigation.dispatch({ type: "OPEN_DRAWER" })}
          hitSlop={8}
        >
          <Text style={styles.menuText}>☰</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>Remembrance of Allah</Text>

        {selectedDhikr ? (
          <Text style={styles.activePhrase}>
            {selectedDhikr.name}
          </Text>
        ) : null}

        <Pressable
          style={styles.counter}
          onPress={incrementCount}
        >
          <Text style={styles.count}>{count}</Text>
          <Text style={styles.tapText}>TAP TO COUNT</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8F5EC",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  searchBar: {
    flex: 1,
    padding: 14,
    borderWidth: 1,
    borderColor: "#D6CCB7",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
  },
  searchText: {
    color: "#777568",
  },
  menuButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
  },
  menuText: {
    fontSize: 24,
    color: "#184D3B",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 22,
  },
  subtitle: {
    fontSize: 16,
    color: "#92743C",
  },
  activePhrase: {
    fontSize: 22,
    fontWeight: "600",
    color: "#184D3B",
    textAlign: "center",
  },
  counter: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "#184D3B",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  count: {
    fontSize: 52,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  tapText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
