import React, { useState, useEffect } from 'react';
import { SummaryDashboard, DayWiseActivityTable, DetailedActivityModal } from './components';

import { AuthorWorklogData, DayWiseActivity, AuthorWorklogRow } from './types';

const App: React.FC = () => {
	const [worklogData, setWorklogData] = useState<AuthorWorklogData | null>(null);
	const [selectedDay, setSelectedDay] = useState<DayWiseActivity | null>(null);
	const [modalShow, setModalShow] = useState(false);
	const [selectedAuthorIndex, setSelectedAuthorIndex] = useState<number>(0);

	useEffect(() => {
		// Fetch JSON data from the public directory
		fetch('/sample-data.json')
			.then(response => response.json())
			.then((data: { AuthorWorklog: AuthorWorklogData }) => {
				const transformedData: AuthorWorklogData = {
					activityMeta: data.AuthorWorklog.activityMeta,
					rows: data.AuthorWorklog.rows.map((row: AuthorWorklogRow) => ({
						...row,
						totalActivity: row.totalActivity.map(activity => ({
							...activity,
							value: String(activity.value), // Transform to string
						})),
						dayWiseActivity: row.dayWiseActivity.map(day => ({
							...day,
							items: {
								...day.items,
								children: day.items.children.map(child => ({
									...child,
									count: String(child.count), // Transform to string
								})),
							},
						})),
					})),
				};
				setWorklogData(transformedData);
			})
			.catch(error => console.error('Error fetching data:', error));
	}, []);

	const handleDayClick = (day: DayWiseActivity) => {
		setSelectedDay(day);
		setModalShow(true);
	};


	if (!worklogData) return <div>Loading...</div>;

	const currentAuthor = worklogData.rows[selectedAuthorIndex];

	return (
		<div className="App container">

			<h1>Author worklog</h1>
			<div className="author-selector mb-4">
				{
					worklogData.rows.map((author, index) => {
						const authorName = author.name.split('@')[0]; // Extract name before the '@' symbol

						return (
							<div
								key={index}
								className={`author-card ${selectedAuthorIndex === index ? 'active' : ''}`}
								onClick={() => setSelectedAuthorIndex(index)}
							>
								<div className="author-card-body">
									<h5 className="author-card-title mb-0">
										{authorName.charAt(0).toUpperCase() + authorName.slice(1)} {/* Capitalize first letter */}
									</h5>
								</div>
							</div>
						);
					})
				}

			</div>

			<SummaryDashboard
				authorName={currentAuthor.name}
				activityMeta={worklogData.activityMeta}
				totalActivity={currentAuthor.totalActivity.map(act => ({
					name: act.name,
					value: String(act.value), // Ensure value is string
				}))}
			/>
			<DayWiseActivityTable
				dayWiseActivity={currentAuthor.dayWiseActivity}
				activityMeta={worklogData.activityMeta}
				onDayClick={handleDayClick}
			/>
			<DetailedActivityModal
				show={modalShow}
				onHide={() => setModalShow(false)}
				dayActivity={selectedDay}
			/>
		</div>
	);
};

export default App;
