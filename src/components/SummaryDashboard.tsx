// src/components/SummaryDashboard.tsx

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { TotalActivity } from '../types';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface SummaryDashboardProps {
    authorName: string;
    activityMeta: { label: string; fillColor: string }[];
    totalActivity: TotalActivity[];
}

const SummaryDashboard: React.FC<SummaryDashboardProps> = ({ authorName, activityMeta, totalActivity }) => {
    // Prepare data for the chart
    const data = {
        labels: totalActivity.map(act => act.name),
        datasets: [
            {
                label: 'Total Activity',
                data: totalActivity.map(act => act.value),
                backgroundColor: activityMeta.map(meta => meta.fillColor),
            },
        ],
    };

    // Chart options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'top' as const, // Correct type
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        const label = context.dataset.label || '';
                        if (label) {
                            return `${label}: ${context.raw}`;
                        }
                        return context.raw;
                    },
                },
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                barThickness: 10, // Reduce bar width
            },
            y: {
                beginAtZero: true,
            },
        },
    };


    return (
        <div className="summary-dashboard">
            <h2 className="dashboard-title">
                Summary Dashboard for <span>{authorName.charAt(0).toUpperCase() + authorName.slice(1)}</span>
            </h2>
            <div className="row">
                <div className="col-6">
                    <Bar data={data} options={options} />
                </div>
            </div>
        </div>
    );
};

export default SummaryDashboard;
