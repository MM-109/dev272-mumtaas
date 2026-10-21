import { duaCategories, duas, type Dua } from "@/data/duas";
import { Stack, useLocalSearchParams } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DuaCategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const category = duaCategories.find(
    (item) => item.id === id
  );

  const categoryDuas = duas.filter(
    (item) => item.categoryId === id
  );

  function renderDua({ item }: { item: Dua }) {
    return (
      <View style={styles.duaCard}>
        <Text style={styles.duaTitle}>{item.title}</Text>

        <Text style={styles.arabic}>{item.arabic}</Text>

        <Text style={styles.transliteration}>
          {item.transliteration}
        </Text>

        <Text style={styles.meaning}>{item.meaning}</Text>

        <Text style={styles.reference}>
          Reference: {item.reference}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
      edges={["bottom"]}
    >
      <Stack.Screen
        options={{
          title: category?.title ?? "Duas",
          headerBackButtonDisplayMode: "minimal",
          headerStyle: {
            backgroundColor: "#F8F5EC",
          },
          headerTintColor: "#184D3B",
          headerTitleStyle: {
            color: "#184D3B",
            fontWeight: "600",
          },
        }}
      />

      <FlatList
        data={categoryDuas}
        keyExtractor={(item) => item.id}
        renderItem={renderDua}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
              No duas added yet
            </Text>
            <Text style={styles.emptyText}>
              Duas for this category will appear here.
            </Text>
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
    paddingHorizontal: 16,
  },
  list: {
    gap: 12,
    paddingTop: 20,
    paddingBottom: 24,
    flexGrow: 1,
  },
  duaCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D6CCB7",
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  duaTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#184D3B",
  },
  arabic: {
    fontSize: 26,
    lineHeight: 44,
    textAlign: "right",
    color: "#184D3B",
  },
  transliteration: {
    fontSize: 16,
    color: "#92743C",
    lineHeight: 24,
  },
  meaning: {
    fontSize: 16,
    color: "#184D3B",
    lineHeight: 24,
  },
  reference: {
    fontSize: 14,
    color: "#92743C",
  },
  emptyContainer: {
    alignItems: "center",
    paddingTop: 60,
    gap: 10,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#184D3B",
  },
  emptyText: {
    fontSize: 15,
    color: "#92743C",
    textAlign: "center",
  },
});
