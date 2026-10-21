import { DhikrProvider } from "@/context/DhikrContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <DhikrProvider>
      <Stack>
        <Stack.Screen
          name="(drawer)"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="dhikr/[id]"
          options={{
            headerShown: true,
            headerBackTitle: "Back",
            headerBackButtonDisplayMode: "minimal",
          }}
        />

        <Stack.Screen
          name="search"
          options={{
            title: "Search",
            headerBackButtonDisplayMode: "minimal",
          }}
        />

        <Stack.Screen
          name="add"
          options={{
            headerTitle: "Add New Dhikr",
            headerBackButtonDisplayMode: "minimal",
            headerStyle: {
              backgroundColor: "#F8F5EC",
            },
            headerTintColor: "#184D3B",
            headerTitleStyle: {
              color: "#184D3B",
              fontWeight: "700",
            },
          }}
        />
      </Stack>
    </DhikrProvider>
  );
}
