// DayWiseActivityTable.tsx

import React from 'react';
import { DayWiseActivity, ActivityMeta } from '../types';

interface DayWiseActivityTableProps {
    dayWiseActivity: DayWiseActivity[];
    activityMeta: ActivityMeta[];
    onDayClick: (day: DayWiseActivity) => void;
}

const DayWiseActivityTable: React.FC<DayWiseActivityTableProps> = ({ dayWiseActivity, activityMeta, onDayClick }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Date</th>
                    {activityMeta.map(meta => (
                        <th key={meta.label}>{meta.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {dayWiseActivity.map(day => (
                    <tr key={day.date} style={{ cursor: "pointer" }}>
                        <td>{day.date}</td>
                        {activityMeta.map(meta => {
                            const activity = day.items.children.find(child => child.label === meta.label);
                            return (
                                <td
                                    key={meta.label}
                                    style={{ backgroundColor: activity ? meta.fillColor : 'transparent' }}
                                    onClick={() => activity && onDayClick(day)}
                                >
                                    {activity ? activity.count : '0'}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DayWiseActivityTable;
