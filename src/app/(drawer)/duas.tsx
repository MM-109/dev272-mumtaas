import { duaCategories, type DuaCategory } from "@/data/duas";
import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DuasScreen() {
  function renderCategory({ item }: { item: DuaCategory }) {
    return (
      <Pressable
        style={styles.categoryCard}
        onPress={() =>
          router.push({
            pathname: "/dua/category/[id]",
            params: { id: item.id },
          })
        }
      >
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryTitle}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>

        <Text style={styles.arrow}>›</Text>
      </Pressable>
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "bottom"]}
    >
      <Text style={styles.title}>Duas</Text>

      <Text style={styles.subtitle}>
        Supplications for everyday life
      </Text>

      <FlatList
        data={duaCategories}
        keyExtractor={(item) => item.id}
        renderItem={renderCategory}
        contentContainerStyle={styles.list}
        ListFooterComponent={
          <View style={styles.footer}>
            <Pressable
              style={styles.homeButton}
              onPress={() => router.navigate("/")}
            >
              <Text style={styles.homeButtonText}>
                Go to Home
              </Text>
            </Pressable>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F5EC",
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#184D3B",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#92743C",
    marginBottom: 20,
  },
  list: {
    gap: 12,
    paddingBottom: 24,
  },
  categoryCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D6CCB7",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoryInfo: {
    flex: 1,
    gap: 6,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#184D3B",
  },
  description: {
    fontSize: 14,
    color: "#92743C",
  },
  arrow: {
    fontSize: 28,
    color: "#184D3B",
    marginLeft: 12,
  },
  footer: {
    gap: 12,
    marginTop: 12,
  },
  homeButton: {
    backgroundColor: "#184D3B",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 8,
  },
  homeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
