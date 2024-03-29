import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { WEATHER_API_KEY } from '@env';

export const useGetWeather = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [weather, setWeather] = useState([]);
    const [lat, setLat] = useState([]);
    const [lon, setLon] = useState([]);

    const fetchWeatherData = async() => {
        try {
            const res = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
            const data = await res.json();
            setWeather(data);
            setLoading(false);
        }
        catch(error) {
            setError("Couldn't fetch weather data!");
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        (async() => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setError("Permission to access location was denied!!");
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLat(location.coords.latitude);
            setLon(location.coords.longitude);
            await fetchWeatherData();
        })()
    }, [lat, lon]);
    return [loading, error, weather];
}


// https://api.openweathermap.org/data/3.0/onecall/day_summary?lat={lat}&lon={lon}&date={date}&appid={API key}
// https://history.openweathermap.org/data/2.5/aggregated/month?month=2&lat=35&lon=139&appid={API key}
// https://history.openweathermap.org/data/2.5/aggregated/month?month=2&lat=35&lon=139&appid={API key}