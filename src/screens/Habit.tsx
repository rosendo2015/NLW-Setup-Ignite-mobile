import { View, Text, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { BackButton } from "../components/BackButton";
import dayjs from "dayjs";
import { ProgressBar } from "../components/ProgessBar";
import { Checkbox } from "../components/Checkbox";

interface Params {
  date: string;
}

export function Habit() {
  const route = useRoute();
  const { date } = route.params as Params;

  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");

  console.log(date);

  return (
    <View className="flex-1  bg-background px-8 pt-16">
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>
        <Text className="mt-6 text-white font-extrabold text-base lowercase text-3xl">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={30} />

        <View className="mt-6">
          <Checkbox 
          title="Beber 3L de água"
          checked={false}
          />
          <Checkbox 
          title="Fazer 30min de exercícios"
          checked={true}
          />
        </View>
      </ScrollView>
    </View>
  );
}
