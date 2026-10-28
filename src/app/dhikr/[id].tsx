import { fetchDhikrById } from "@/api/dhikr";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function DhikrDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: selectedDhikr,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["dhikr", id],
    queryFn: () => fetchDhikrById(id),
    enabled: !!id,
  });

  if (isPending) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Loading Dhikr" }} />
        <Text style={styles.title}>Loading dhikr...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Dhikr Not Found" }} />
        <Text style={styles.title}>Unable to load dhikr</Text>
        <Text style={styles.subtitle}>{error.message}</Text>
        <Text style={styles.count} onPress={() => refetch()}>
          Try Again
        </Text>
      </View>
    );
  }

  if (!selectedDhikr) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Dhikr Not Found" }} />
        <Text style={styles.title}>Dhikr not found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: selectedDhikr.name }} />

      <Text style={styles.title}>{selectedDhikr.name}</Text>

      {selectedDhikr.meaning ? (
        <Text style={styles.subtitle}>{selectedDhikr.meaning}</Text>
      ) : null}

      <Text style={styles.count}>
        Target Count: {selectedDhikr.target} times
      </Text>

      {selectedDhikr.hadith ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Hadith / Reference</Text>
          <Text style={styles.cardText}>{selectedDhikr.hadith}</Text>
        </View>
      ) : null}

      <Text style={styles.favoriteBadge}>
        {selectedDhikr.isFavorite
          ? "★ Marked as Favorite"
          : "Not marked as Favorite"}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F8F5EC",
    padding: 24,
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
    fontSize: 18,
    color: "#92743C",
    textAlign: "center",
    fontStyle: "italic",
  },
  count: {
    fontSize: 18,
    fontWeight: "500",
    color: "#184D3B",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderColor: "#92743C",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    width: "100%",
    marginTop: 8,
    gap: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#184D3B",
  },
  cardText: {
    fontSize: 15,
    color: "#184D3B",
    lineHeight: 22,
  },
  favoriteBadge: {
    fontSize: 14,
    color: "#92743C",
    fontWeight: "600",
    marginTop: 4,
  },
});

