import React, { useEffect, useState, useContext } from "react";
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

//stylesheet imports
import ProfileStyles from "../../styles/ProfileStyles.js";

import UserContext from "../../contexts/UserContext.js";

export default function TaskNum() {
    //for squares
    const [showWeekCompleted, setShowWeekCompleted] = useState(true);
    const [showWeekInProgress, setShowWeekInProgress] = useState(true);

    //for fetch
    const [weekCompleted, setWeekCompleted] = useState(0);
    const [monthCompleted, setMonthCompleted] = useState(0);
    const [weekInProgress, setWeekInProgress] = useState(0);
    const [monthInProgress, setMonthInProgress] = useState(0);    

    //to get week num
    const getWeekNumber = (date) => {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        const yearStart = new Date(d.getFullYear(), 0, 1);
        const weekNumber = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        return weekNumber;
    };

    const { userData } = useContext(UserContext);

    useEffect(() => {
        fetchTasksCount();
    }, []);

    const fetchTasksCount = () => {
        fetch('https://artemis.cs.csub.edu/~procrastiplanner/Procrastiplanner/sql/endpoint.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "lookup": "true",
                "userId" : userData.userId,
            }),
        })
            .then(response => {
                //console.log('Response: ', response)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                //console.log('Tasks: ', data);

                const allAssignments = data.assignment;
                const allEvents = data.event;
                const allTasks = [...allAssignments, ...allEvents];

                const currentDate = new Date();
                const currentYear = currentDate.getFullYear();
                const currentMonth = currentDate.getMonth() + 1;
                const currentWeek = getWeekNumber(currentDate);

                const weekCompletedCount = allTasks.filter(task => {
                    const taskDate = new Date(task.duedate || task.eventDate);
                    const taskYear = taskDate.getFullYear();
                    const taskMonth = taskDate.getMonth() + 1;
                    const taskWeek = getWeekNumber(taskDate);
                    return task.complete === 1 && taskYear === currentYear && taskMonth === currentMonth && taskWeek === currentWeek;
                }).length;
                const monthCompletedCount = allTasks.filter(task => {
                    const taskDate = new Date(task.duedate || task.eventDate);
                    const taskYear = taskDate.getFullYear();
                    const taskMonth = taskDate.getMonth() + 1;
                    return task.complete === 1 && taskYear === currentYear && taskMonth === currentMonth;
                }).length;
                const weekInProgressCount = allTasks.filter(task => {
                    const taskDate = new Date(task.duedate || task.eventDate);
                    const taskYear = taskDate.getFullYear();
                    const taskMonth = taskDate.getMonth() + 1;
                    const taskWeek = getWeekNumber(taskDate);
                    return task.complete === 0 && taskYear === currentYear && taskMonth === currentMonth && taskWeek === currentWeek;
                }).length;
                const monthInProgressCount = allTasks.filter(task => {
                    const taskDate = new Date(task.duedate || task.eventDate);
                    const taskYear = taskDate.getFullYear();
                    const taskMonth = taskDate.getMonth() + 1;
                    return task.complete === 0 && taskYear === currentYear && taskMonth === currentMonth;
                }).length;

                setWeekCompleted(weekCompletedCount);
                setMonthCompleted(monthCompletedCount);
                setWeekInProgress(weekInProgressCount);
                setMonthInProgress(monthInProgressCount);
            })
            .catch(error => {
                console.error('Error getting task count', error);
            });
    };

    const toggleCompleted = () => {
        setShowWeekCompleted(!showWeekCompleted);
    };
    const toggleInProgress = () => {
        setShowWeekInProgress(!showWeekInProgress);
    };

    //i don't want count exceeding 100, so if more than 100 tasks, show "100+"
    const maxCount = (count) => {
        return count > 100 ? "100+" : count.toString();
    }

    return (
        <ScrollView>
            <View style={ProfileStyles.tasks}>
                <View style={ProfileStyles.taskDetail, ProfileStyles.completedTaskDetail}>
                <TouchableOpacity onPress={toggleCompleted}>
                    <Text style={ProfileStyles.completedValue}>{showWeekCompleted ? maxCount(weekCompleted) : maxCount(monthCompleted)}</Text>
                    <Text style={ProfileStyles.completedText}>TASKS COMPLETED {showWeekCompleted ? 'THIS WEEK' : 'THIS MONTH'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={ProfileStyles.taskDetail, ProfileStyles.inProgressTaskDetail}>
                <TouchableOpacity onPress={toggleInProgress}>
                    <Text style={ProfileStyles.inProgressValue}>{showWeekInProgress ? maxCount(weekInProgress) : maxCount(monthInProgress)}</Text>
                    <Text style={ProfileStyles.inProgressText}> TASKS IN PROGRESS {showWeekInProgress ? 'THIS WEEK' : 'THIS MONTH'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

/* Notes: 
the maximum values the completed/inprog values can go to is 100000000000 to keep number in circle 
need to get number of completed and in progress tasks per week/month
*/