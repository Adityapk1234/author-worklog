// types.ts

export interface ActivityMeta {
    label: string;
    fillColor: string;
}

export interface TotalActivity {
    name: string;
    value: string; // Ensure it's string if that's how your JSON is structured
}

export interface DayWiseActivityItem {
    count: string; // Ensure it's string if that's how your JSON is structured
    label: string;
    fillColor: string;
}

export interface DayWiseActivity {
    date: string;
    items: {
        children: DayWiseActivityItem[];
    };
}

export interface ActiveDays {
    days: number;
    isBurnOut: boolean;
    insight: string[];
}

export interface AuthorWorklogRow {
    name: string;
    totalActivity: TotalActivity[];
    dayWiseActivity: DayWiseActivity[];
    activeDays: ActiveDays;
}

export interface AuthorWorklogData {
    activityMeta: ActivityMeta[];
    rows: AuthorWorklogRow[];
}
