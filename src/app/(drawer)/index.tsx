import { useDhikr } from "@/context/DhikrContext";
import { router, useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const navigation = useNavigation();
  const [showCompletion, setShowCompletion] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    dhikrList,
    count,
    selectedDhikrId,
    incrementCount,
  } = useDhikr();

  const selectedDhikr = dhikrList.find(
    (item) => item.id === selectedDhikrId
  );

  useEffect(() => {
    setShowCompletion(false);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [selectedDhikrId]);

  function handleCount() {
    incrementCount();

    if (selectedDhikr && count + 1 === selectedDhikr.target) {
      setShowCompletion(true);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setShowCompletion(false);
        timerRef.current = null;
      }, 10000);
    }
  }

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
          onPress={handleCount}
        >
          <Text style={styles.count}>{count}</Text>
          <Text style={styles.tapText}>TAP TO COUNT</Text>
        </Pressable>

        {showCompletion && selectedDhikr ? (
          <View style={styles.completionMessage}>
            <Text style={styles.completionTitle}>
              Goal Completed!
            </Text>
            <Text style={styles.completionText}>
              You've completed your goal of {selectedDhikr.target} repetitions.
            </Text>
            <Text style={styles.completionText}>
              May Allah accept your dhikr.
            </Text>
          </View>
        ) : null}
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
  completionMessage: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    width: "90%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#B8A77A",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    gap: 8,
  },
  completionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#184D3B",
  },
  completionText: {
    fontSize: 14,
    color: "#92743C",
    textAlign: "center",
  },
});
