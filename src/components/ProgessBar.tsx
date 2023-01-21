import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  //withDelay
} from "react-native-reanimated";

interface Props {
  progress?: number;
}
export function ProgressBar({ progress = 0 }: Props) {
  const sharedProgress = useSharedValue(progress);
  const style = useAnimatedStyle(() => {
    return {
      width: `${sharedProgress.value}%`,
    };
  });

  useEffect(()=>{
   // sharedProgress.value = withDelay(200, withTiming(progress));
    sharedProgress.value = withTiming(progress);
  },[progress])

  return (
    <Animated.View className="w-full h-4 bg-slate-700 rounded-xl mt-4">
      <View className="h-4 bg-violet-600 rounded-xl" style={style} />
    </Animated.View>
  );
}
