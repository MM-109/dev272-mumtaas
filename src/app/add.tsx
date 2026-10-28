import { createDhikr } from "@/api/dhikr";
import { dhikrSchema, type DhikrData, type DhikrFormValues } from "@/utils/dhikrSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from "react-native";

export default function AddDhikrScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DhikrFormValues, unknown, DhikrData>({
    resolver: zodResolver(dhikrSchema),
    defaultValues: {
      name: "",
      meaning: "",
      hadith: "",
      target: "100",
      isFavorite: false,
    },
    mode: "onTouched",
  });

  const mutation = useMutation({
    mutationFn: createDhikr,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["dhikr"] });
      router.back();
    },
  });

  const onSubmit = async (data: DhikrData) => {
    try {
      await mutation.mutateAsync(data);
    } catch {}
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Dhikr Name *</Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="e.g. Subhanallah"
                placeholderTextColor="#777568"
                accessibilityLabel="Dhikr Name"
              />
            )}
          />
          {errors.name && (
            <Text style={styles.errorText} accessibilityRole="alert">
              {errors.name.message}
            </Text>
          )}
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Meaning *</Text>
          <Controller
            control={control}
            name="meaning"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                style={[
                  styles.input,
                  styles.multilineInput,
                  errors.meaning && styles.inputError,
                ]}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="e.g. Glory be to Allah"
                placeholderTextColor="#777568"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                accessibilityLabel="Meaning"
              />
            )}
          />
          {errors.meaning && (
            <Text style={styles.errorText} accessibilityRole="alert">
              {errors.meaning.message}
            </Text>
          )}
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Hadith / Reference *</Text>
          <Controller
            control={control}
            name="hadith"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                style={[
                  styles.input,
                  styles.multilineInput,
                  errors.hadith && styles.inputError,
                ]}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="e.g. Two phrases are light on the tongue..."
                placeholderTextColor="#777568"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                accessibilityLabel="Hadith or Reference"
              />
            )}
          />
          {errors.hadith && (
            <Text style={styles.errorText} accessibilityRole="alert">
              {errors.hadith.message}
            </Text>
          )}
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Target Count (1 - 1000) *</Text>
          <Controller
            control={control}
            name="target"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                style={[styles.input, errors.target && styles.inputError]}
                value={String(value)}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="100"
                placeholderTextColor="#777568"
                keyboardType="number-pad"
                accessibilityLabel="Target Count"
              />
            )}
          />
          {errors.target && (
            <Text style={styles.errorText} accessibilityRole="alert">
              {errors.target.message}
            </Text>
          )}
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.label}>Mark as Favorite</Text>
          <Controller
            control={control}
            name="isFavorite"
            render={({ field: { value, onChange } }) => (
              <Switch
                value={value}
                onValueChange={onChange}
                trackColor={{
                  false: "#D6CCB7",
                  true: "#A8C5B5",
                }}
                thumbColor={value ? "#184D3B" : "#FFFFFF"}
              />
            )}
          />
        </View>

        {mutation.isError && (
          <Text style={styles.errorText} accessibilityRole="alert">
            Unable to save dhikr: {mutation.error.message}
          </Text>
        )}

        <Pressable
          style={[
            styles.submitButton,
            (isSubmitting || mutation.isPending) && styles.buttonDisabled,
          ]}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting || mutation.isPending}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting || mutation.isPending ? "Saving..." : "Save Dhikr"}
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F5EC",
  },
  scrollContent: {
    padding: 20,
    gap: 16,
    paddingBottom: 40,
  },
  fieldContainer: {
    gap: 6,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#184D3B",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D6CCB7",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    color: "#184D3B",
  },
  multilineInput: {
    minHeight: 90,
  },
  inputError: {
    borderColor: "#B45353",
  },
  errorText: {
    color: "#B45353",
    fontSize: 13,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  submitButton: {
    backgroundColor: "#184D3B",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
