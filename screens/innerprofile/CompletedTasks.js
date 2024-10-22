import React, { useEffect, useState, useContext } from "react";
import { View, Text, ScrollView, useWindowDimensions } from 'react-native';
import { DataTable } from "react-native-paper";

//stylesheet imports
import ProfileStyles from "../../styles/ProfileStyles.js";

import UserContext from "../../contexts/UserContext.js";

//dark mode imports
import themeContext from "../../styles/darkmodefiles/themeContext.js";
import theme from "../../styles/darkmodefiles/theme.js";

export default function CompletedTasks() {
    const { width: screenWidth } = useWindowDimensions();
    const [page, setPage] = React.useState(0);
    const itemsPerPage = 5;

    const [items, setItems] = useState([]);
    const { userData } = useContext(UserContext);

    

    //fetch data
    useEffect(() => {
        userTasks();
    }, []);

    const userTasks = () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

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
                //console.log('Completed Tasks: ', data);
                const allAssignments = data.assignment.filter(task => task.complete === 1);
                const allEvents = data.event.filter(task => task.complete === 1);

                const mergedTasks = [
                    ...allAssignments.map(task => ({
                        name: task.name,
                        tdate: task.duedate
                    })),
                    ...allEvents.map(task => ({
                        name: task.name,
                        tdate: task.eventDate
                    }))
                ];
                const fetchedTasks = mergedTasks.filter(task => {
                    const taskDate = new Date(task.tdate);
                    return(
                        taskDate.getFullYear() === currentYear &&
                        taskDate.getMonth() + 1 === currentMonth
                    );
                });
                setItems(fetchedTasks);
            })
            .catch(error => {
                console.error('Error getting completed tasks', error);
            });
    };

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    //for dark mode
    const {isDarkMode} = useContext(themeContext);
    const pickTheme = isDarkMode ? theme.dark : theme.light;
    

    return (
        <ScrollView>
            <View style={ProfileStyles.completedList} width={screenWidth - 25}>
                <Text style={ProfileStyles.completedListHeader}>List of Completed Tasks of the Month:</Text>
            </View>
            <View>
                <DataTable style={{color: pickTheme.color}}>
                    <DataTable.Header style={ProfileStyles.tHeader} width={screenWidth - 25}>
                        <DataTable.Title>
                            <Text style={ProfileStyles.tTitle}>Task:</Text>
                        </DataTable.Title>
                        <DataTable.Title>
                            <Text style={ProfileStyles.tTitle}>Date:</Text>
                        </DataTable.Title>
                    </DataTable.Header>

                    {items.slice(from, to).map((item, index) => (
                        <DataTable.Row key={index} style={ProfileStyles.tRow} width={screenWidth - 25}>
                            <DataTable.Cell>
                                <Text style={{color: pickTheme.color}}>{item.name}</Text>
                            </DataTable.Cell>
                            <DataTable.Cell>
                                <Text style={{color: pickTheme.color}}>{item.tdate}</Text>
                            </DataTable.Cell>
                        </DataTable.Row>
                    ))}

                  <DataTable.Pagination
                    style={{color: pickTheme.color}}                                    
                    page={page}
                    numberOfPages={Math.ceil(items.length / itemsPerPage)}
                    onPageChange={page => setPage(page)}                        
                    label={`Total number of tasks: ${items.length}`}
                    //label={`Tasks ${from + 1}-${to} of ${items.length}`}
                                  
                  />
                  <Text style={{color: pickTheme.color}}>{items.name}</Text>     
                </DataTable>
            </View>

        </ScrollView>
    );
}

/* Notes:
need to get data of tasks completed in week/month/year to display in table
*/