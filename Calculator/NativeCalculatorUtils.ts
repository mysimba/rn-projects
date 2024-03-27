import {NativeModules} from "react-native";

export const executeCalculator = async (
    action: 'plus' | 'minus' | 'divide' | 'multiply',
    numberA: number,
    numberB: number,
): Promise<number> => {
    return await NativeModules.CalculatorModule.executeCalc(action, numberA, numberB)
}