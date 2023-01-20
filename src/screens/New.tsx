import { useState } from "react";
import { ScrollView, Text, TextInput, View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import colors from "tailwindcss/colors";

const avaliableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export function New() {
  const [weekDays, setWeekDays] = useState<number[]>([]);

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex));
    } else {
      setWeekDays((prevState) => [...prevState, weekDayIndex]);
    }
  }

  return (
    <View className="flex-1  bg-background px-8 pt-16">
      <ScrollView 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 50 }}
      >
        <BackButton />
        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar hábito
        </Text>
        <Text className="mt-6 text-white font-semibold text-base">
          Qual seu comprometimento?
        </Text>

        <TextInput 
        className="h-12 pl-4 text-white mt-3 bg-zinc-900 rounded-lg border-zinc-800 border-2 focus:border-green-600 " 
        placeholder="ex.: Exercícios, Dormir bem, etc..."
        placeholderTextColor={colors.zinc[400]}
        />
        
        <Text className="mt-4 mb-4 text-white font-semibold text-base">
          Qual a recorrência?
        </Text>

        {avaliableWeekDays.map((weekDay, index) => (
          <Checkbox 
          key={weekDay} 
          title={weekDay}
          checked={weekDays.includes(index)}
          onPress={() => handleToggleWeekDay(index)}
          />
        ))}
        <TouchableOpacity
        className="flex-row h-14 rounded-lg items-center justify-center w-full bg-green-600 mt-6"
        >
          <Feather 
          name="check"
          size={20}
          color={colors.white}
          />
          <Text className="font-semibold text-base text-white ml-2">
Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
