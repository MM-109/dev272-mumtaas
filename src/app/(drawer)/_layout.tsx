import { Drawer } from "expo-router/drawer";
import { Image, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerPosition: "right",
          drawerActiveTintColor: "#184D3B",
          headerShown: false,
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            title: "Home",
            drawerIcon: ({ color }) => (
              <Image
                source={require("@/assets/icons/home.png")}
                style={[styles.icon, { tintColor: color }]}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="dhikr"
          options={{
            title: "Dhikr Phrases",
            drawerIcon: ({ color }) => (
              <Image
                source={require("@/assets/icons/dhikr.png")}
                style={[styles.icon, { tintColor: color }]}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="duas"
          options={{
            title: "Duas",
            drawerIcon: ({ color }) => (
              <Image
                source={require("@/assets/icons/hand.png")}
                style={[styles.icon, { tintColor: color }]}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="hadith"
          options={{
            title: "Hadith",
            drawerIcon: ({ color }) => (
              <Image
                source={require("@/assets/icons/hadith.png")}
                style={[styles.icon, { tintColor: color }]}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="quran"
          options={{
            title: "Qur'an",
            drawerIcon: ({ color }) => (
              <Image
                source={require("@/assets/icons/quran.png")}
                style={[styles.icon, { tintColor: color }]}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="deeds"
          options={{
            title: "Deeds of Dhikr",
            drawerIcon: ({ color }) => (
              <Image
                source={require("@/assets/icons/deeds.png")}
                style={[styles.icon, { tintColor: color }]}
              />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
});