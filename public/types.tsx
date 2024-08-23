export type Pill = {
    name: string;
    dosage: number;
    unit: string;
}

export type PillSwallow = {
    pill: Pill,
    date: Date;
}

export type SessionDate = {
    date: Date;
    session: Dose[];
}

export type Dose = {
    pill: Pill;
    quantity: number;
}