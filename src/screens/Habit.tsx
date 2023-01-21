import { useEffect, useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { BackButton } from "../components/BackButton";
import dayjs from "dayjs";
import { ProgressBar } from "../components/ProgessBar";
import { Checkbox } from "../components/Checkbox";
import { Loading } from "../components/Loading";
import { HabitsEmpty } from "../components/HabitsEmpty";
import { api } from "../lib/axios";
import { generateProgressPercentage } from "../utils/generate-progress-percentage"
import clsx from "clsx";

interface Params {
  date: string;
}

interface DayInfoProps {
  completedHabits: string;
  possibleHabits: {
    id: string;
    title: string;
  }[];
}

export function Habit() {
  const [loading, setLoading] = useState(true);
  const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null);
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);

  const route = useRoute();
  const { date } = route.params as Params;

  const parsedDate = dayjs(date);
  const isDateInPast = parsedDate.endOf('day').isBefore(new Date())
  const dayOfWeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");

  const habitsProgrss = dayInfo?.possibleHabits.length ? generateProgressPercentage(dayInfo.possibleHabits.length, completedHabits.length) : 0;

  async function fatchHabits() {
    try {
      setLoading(true);

      const response = await api.get("/day", { params: { date } });
      setDayInfo(response.data);
      setCompletedHabits(response.data.setCompletedHabits)
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Ops!",
        "Não foi possivel carregar as informações dos hábitos."
      );
    } finally {
      setLoading(false);
    }
  }
  async function handletoggleHabits(habitId: string){
    await api.patch(`/habits/${habitId}/toggle`)
    try{
      if(completedHabits.includes(habitId)){
        setCompletedHabits(prevState => prevState.filter(habit => habit !== habitId))
      }else{
        setCompletedHabits(prevState => [...prevState, habitId])
      }
    }catch(error){
      console.log(error)
      Alert.alert('Ops!','Não foi possivel atualizar o status do hábito.')
    }
  }

  useEffect(() => {
    fatchHabits();
  }, []);

  if (loading) {
    return <Loading />;
  }

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

        <ProgressBar progress={habitsProgrss} />

        <View className={clsx("mt-6", {
          ["opacity-50"]: isDateInPast
        })}>
          {dayInfo?.possibleHabits ?
            dayInfo?.possibleHabits.map((habit) => (
              <Checkbox key={habit.id}
              title={habit.title}
              checked={completedHabits.includes(habit.id)} 
              disabled={isDateInPast}
              onPress={() => handletoggleHabits(habit.id)}
              />
            ))
          : <HabitsEmpty />
          }
        </View>
        {
          isDateInPast && (
            <Text
            className="text-white mt-10 text-center"
            >
              Você não pode editar habitos em datas anteriores a hoje. 
            </Text>
          )
        }
      </ScrollView>
    </View>
  );
}
