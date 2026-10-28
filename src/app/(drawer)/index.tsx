import { fetchDhikr } from "@/api/dhikr";
import { useDhikr } from "@/context/DhikrContext";
import { getDuaOfTheDay } from "@/data/dailyDua";
import { useQuery } from "@tanstack/react-query";
import { router, useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  AppState,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const navigation = useNavigation();
  const [showCompletion, setShowCompletion] = useState(false);
  const [today, setToday] = useState(new Date());
  const [flipped, setFlipped] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flipAnimation = useRef(new Animated.Value(0)).current;

  const { count, selectedDhikrId, incrementCount } = useDhikr();

  const { data: dhikrList = [] } = useQuery({
    queryKey: ["dhikr"],
    queryFn: fetchDhikr,
  });

  const selectedDhikr = dhikrList.find(
    (item) => item.id === selectedDhikrId
  );

  const dailyDua = getDuaOfTheDay(today);

  const frontRotation = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const backRotation = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "360deg"],
  });

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        setToday(new Date());
      }
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    setFlipped(false);
    flipAnimation.setValue(0);
  }, [dailyDua?.id, flipAnimation]);

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

  function flipCard() {
    const nextValue = flipped ? 0 : 1;

    setFlipped(!flipped);

    Animated.timing(flipAnimation, {
      toValue: nextValue,
      duration: 450,
      useNativeDriver: true,
    }).start();
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

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.subtitle}>Remembrance of Allah</Text>

          {selectedDhikr ? (
            <Text style={styles.activePhrase}>
              {selectedDhikr.name}
            </Text>
          ) : null}

          <Pressable style={styles.counter} onPress={handleCount}>
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

        {dailyDua ? (
          <View style={styles.flipContainer}>
            <Animated.View
              pointerEvents={flipped ? "none" : "auto"}
              style={[
                styles.dailyCard,
                styles.flipFace,
                {
                  transform: [
                    { perspective: 1000 },
                    { rotateY: frontRotation },
                  ],
                },
              ]}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.dailyHeading}>Dua of the Day</Text>
                <Pressable onPress={flipCard} hitSlop={12}>
                  <Text style={styles.flipButton}>Flip ↻</Text>
                </Pressable>
              </View>

              <Text style={styles.dailyTitle} numberOfLines={2}>
                {dailyDua.title}
              </Text>

              <ScrollView
                style={styles.cardScroll}
                nestedScrollEnabled
                showsVerticalScrollIndicator={false}
              >
                <Text style={styles.dailyArabic}>
                  {dailyDua.arabic}
                </Text>
              </ScrollView>

              <Pressable onPress={flipCard} style={styles.flipHint}>
                <Text style={styles.flipHintText}>
                  Tap to see meaning and pronunciation ↻
                </Text>
              </Pressable>
            </Animated.View>

            <Animated.View
              pointerEvents={flipped ? "auto" : "none"}
              style={[
                styles.dailyCard,
                styles.flipFace,
                styles.backFace,
                {
                  transform: [
                    { perspective: 1000 },
                    { rotateY: backRotation },
                  ],
                },
              ]}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.dailyHeading}>Meaning & Pronunciation</Text>
                <Pressable onPress={flipCard} hitSlop={12}>
                  <Text style={styles.flipButton}>Flip ↻</Text>
                </Pressable>
              </View>

              <ScrollView
                style={styles.cardScroll}
                nestedScrollEnabled
                showsVerticalScrollIndicator={false}
              >
                <Text style={styles.sectionLabel}>Transliteration</Text>
                <Text style={styles.dailyTransliteration}>
                  {dailyDua.transliteration}
                </Text>

                <Text style={styles.sectionLabel}>Translation</Text>
                <Text style={styles.dailyTranslation}>
                  {dailyDua.translation}
                </Text>

                <Text style={styles.dailyReference}>
                  {dailyDua.reference}
                </Text>
              </ScrollView>

              <Pressable onPress={flipCard} style={styles.flipHint}>
                <Text style={styles.flipHintText}>
                  Tap to return to Arabic ↻
                </Text>
              </Pressable>
            </Animated.View>
          </View>
        ) : null}
      </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  content: {
  alignItems: "center",
  justifyContent: "center",
  gap: 22,
  paddingTop: 65,
  paddingBottom: 55,
  minHeight: 400,
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
    width: "100%",
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
  flipContainer: {
    height: 240,
    marginTop: 12,
    marginBottom: 12,
  },
  dailyCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D6CCB7",
    borderRadius: 12,
    padding: 16,
    gap: 10,
  },
  flipFace: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
  },
  backFace: {
    backgroundColor: "#FFFFFF",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  dailyHeading: {
    fontSize: 19,
    fontWeight: "600",
    color: "#184D3B",
    flexShrink: 1,
  },
  flipButton: {
    fontSize: 14,
    fontWeight: "600",
    color: "#92743C",
  },
  dailyTitle: {
    fontSize: 14,
    color: "#92743C",
  },
  cardScroll: {
    flex: 1,
  },
  dailyArabic: {
    fontSize: 24,
    lineHeight: 42,
    textAlign: "right",
    writingDirection: "rtl",
    color: "#184D3B",
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#92743C",
    marginTop: 4,
    marginBottom: 6,
  },
  dailyTransliteration: {
    fontSize: 15,
    lineHeight: 23,
    color: "#184D3B",
    marginBottom: 12,
  },
  dailyTranslation: {
    fontSize: 15,
    lineHeight: 23,
    color: "#184D3B",
    marginBottom: 12,
  },
  dailyReference: {
    fontSize: 13,
    color: "#92743C",
    marginBottom: 8,
  },
  flipHint: {
    alignItems: "center",
    paddingTop: 4,
  },
  flipHintText: {
    fontSize: 12,
    color: "#92743C",
    textAlign: "center",
  },
});
