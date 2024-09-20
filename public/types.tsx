export type Pill = {
    name: string;
    dosage: number;
    unit: string;
}

export type Dose = {
    pill: Pill;
    quantity: number;
}

export type SessionDate = {
    date: Date;
    session: Dose[];
    note: string;
    dateEmailed?: Date;
    userDate: Date;
}