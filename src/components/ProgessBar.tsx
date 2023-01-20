import { View } from "react-native";
interface Props{
    progress?: number
}
export function ProgressBar({ progress = 0}: Props ){
    return(
        <View className="w-full h-4 bg-slate-700 rounded-xl mt-4">
            <View 
            className="h-4 bg-violet-600 rounded-xl"
            style={{ width: `${progress}%` }}
            />
        </View>
    )
}