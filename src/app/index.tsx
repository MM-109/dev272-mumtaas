
import { dhikr, type Dhikr } from "@/data/dhikr";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
  const [query, setQuery] = useState("");

  const filteredDhikr = dhikr.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <FlatList<Dhikr>
      data={filteredDhikr}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <DhikrRow dhikr={item} />}
      ListHeaderComponent={<Header query={query} setQuery={setQuery} />}
      contentContainerStyle={styles.container}
      style={styles.screen}
    />
  );
}

function Header({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (q: string) => void;
}) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Dhikr Counter</Text>
      <Text style={styles.subtitle}>Remembrance of Allah</Text>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Search dhikr..."
          placeholderTextColor="#777568"
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
          returnKeyType="search"
        />
        <Pressable style={styles.button} onPress={() => setQuery("")}>
          <Text style={styles.buttonText}>Clear</Text>
        </Pressable>
      </View>
    </View>
  );
}

function DhikrRow({ dhikr }: { dhikr: Dhikr }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowTitle}>{dhikr.name}</Text>
      <Text style={styles.count}>{dhikr.count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#F8F5EC",
  },
  container: {
    padding: 16,
    gap: 12,
  },
  header: {
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
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
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 8,
  },
  input: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: "#B8A77A",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    color: "#184D3B",
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
});
