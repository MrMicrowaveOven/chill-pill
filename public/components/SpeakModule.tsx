import Tts from "react-native-tts"
import { Dose, Pill } from "../types"

export const sayPills = (pills: Pill[]) => {
    pills.forEach(pill => sayPill(pill))
}

export const sayDoses = (doses: Dose[]) => {
    doses.forEach(dose => {
        sayPill(dose.pill)
        sayQuantity(dose.quantity)
    })
}

export const sayPill = (pill: Pill) => {
    Tts.getInitStatus().then(() => {
        Tts.speak(`${pill.name} ${pill.dosage} ${pill.unit === 'mg' && 'milligrams'}`);
    });
}

export const sayQuantity = (quantity: number) => {
    Tts.getInitStatus().then(() => {
        Tts.speak(`${quantity} ${quantity === 1 ? 'pill' : 'pills'}`);
    });
}