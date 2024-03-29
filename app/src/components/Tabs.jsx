import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import ChatBot from './ChatBot';
import Profile from './Profile';
import Recommendation from './Recommendation';
import Market from './Market';
import UserData from './UserData';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();

function Tabs({ weather }) {
    const {t, i18n} = useTranslation();
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'white',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 35,
                    color: 'white'
                }
            }}
        >
            <Tab.Screen
                name={t('profile')}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Feather
                            name={'user'}
                            size={25}
                            color={focused ? 'tomato' : 'white'}
                        />
                    ),
                    tabBarStyle: {
                        backgroundColor: '#6b8e2f',
                        paddingTop: 10,
                    },
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: '#6b8e2f',
                    }
                }}
            >
                {() => <Profile />}
            </Tab.Screen>
            <Tab.Screen
                name={t('chatbot')}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Feather
                            name={'message-circle'}
                            size={25}
                            color={focused ? 'tomato' : 'white'}
                        />
                    ),
                    tabBarStyle: {
                        backgroundColor: '#38261c',
                        paddingTop: 10,
                    },
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: '#f47328',
                    }
                }}
            >
                {() => <ChatBot />}
            </Tab.Screen>
            <Tab.Screen
                name={t('recommend')}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Feather
                            name={'star'}
                            size={25}
                            color={focused ? 'tomato' : 'white'}
                        />
                    ),
                    tabBarStyle: {
                        backgroundColor: '#095c85',
                        paddingTop: 10,
                    },
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: '#81d2e5',
                    },
                }}
            >
                {() => <Recommendation />}
            </Tab.Screen>
            <Tab.Screen
                name={t('market')}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Feather
                            name={'shopping-cart'}
                            size={25}
                            color={focused ? 'tomato' : 'white'}
                        />
                    ),
                    tabBarStyle: {
                        backgroundColor: '#095c85',
                        paddingTop: 10,
                    },
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: '#81d2e5',
                    },
                }}
            >
                {() => <Market />}
            </Tab.Screen>
            <Tab.Screen
                name={t('data')}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Feather
                            name={'database'}
                            size={25}
                            color={focused ? 'tomato' : 'white'}
                        />
                    ),
                    tabBarStyle: {
                        backgroundColor: '#095c85',
                        paddingTop: 10,
                    },
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: '#81d2e5',
                    },
                }}
            >
                {() => <UserData />}
            </Tab.Screen>
        </Tab.Navigator>
    )
};

export default Tabs;