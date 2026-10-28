import { DhikrProvider } from "@/context/DhikrContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useState } from "react";

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
