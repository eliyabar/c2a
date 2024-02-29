import {NextRequest, NextResponse} from "next/server";
export interface Root {
    queryCost: number
    latitude: number
    longitude: number
    resolvedAddress: string
    address: string
    timezone: string
    tzoffset: number
    description: string
    days: Day[]
    alerts: any[]
    stations: Stations
    currentConditions: CurrentConditions
}

export interface Day {
    datetime: string
    datetimeEpoch: number
    tempmax: number
    tempmin: number
    temp: number
    feelslikemax: number
    feelslikemin: number
    feelslike: number
    dew: number
    humidity: number
    precip: number
    precipprob: number
    precipcover: number
    preciptype: any
    snow: number
    snowdepth: number
    windgust: number
    windspeed: number
    winddir: number
    pressure: number
    cloudcover: number
    visibility: number
    solarradiation: number
    solarenergy: number
    uvindex: number
    severerisk: number
    sunrise: string
    sunriseEpoch: number
    sunset: string
    sunsetEpoch: number
    moonphase: number
    conditions: string
    description: string
    icon: string
    stations: string[]
    source: string
    hours: Hour[]
}

export interface Hour {
    datetime: string
    datetimeEpoch: number
    temp: number
    feelslike: number
    humidity: number
    dew: number
    precip: number
    precipprob: number
    snow: number
    snowdepth: number
    preciptype: any
    windgust: number
    windspeed: number
    winddir: number
    pressure: number
    visibility: number
    cloudcover: number
    solarradiation: number
    solarenergy: number
    uvindex: number
    severerisk: number
    conditions: string
    icon: string
    stations?: string[]
    source: string
}

export interface Stations {
    F1003: F1003
    LLHA: Llha
    LLBG: Llbg
}

export interface F1003 {
    distance: number
    latitude: number
    longitude: number
    useCount: number
    id: string
    name: string
    quality: number
    contribution: number
}

export interface Llha {
    distance: number
    latitude: number
    longitude: number
    useCount: number
    id: string
    name: string
    quality: number
    contribution: number
}

export interface Llbg {
    distance: number
    latitude: number
    longitude: number
    useCount: number
    id: string
    name: string
    quality: number
    contribution: number
}

export interface CurrentConditions {
    datetime: string
    datetimeEpoch: number
    temp: number
    feelslike: number
    humidity: number
    dew: number
    precip: number
    precipprob: number
    snow: number
    snowdepth: number
    preciptype: any
    windgust: number
    windspeed: number
    winddir: number
    pressure: number
    visibility: number
    cloudcover: number
    solarradiation: number
    solarenergy: number
    uvindex: number
    conditions: string
    icon: string
    stations: string[]
    source: string
    sunrise: string
    sunriseEpoch: number
    sunset: string
    sunsetEpoch: number
    moonphase: number
}

/*
{
    "datetime": "14:50:00",
    "datetimeEpoch": 1709211000,
    "temp": 71.6,
    "feelslike": 71.6,
    "humidity": 18.3,
    "dew": 26.2,
    "precip": 0.0,
    "precipprob": 0.0,
    "snow": 0.0,
    "snowdepth": 0.0,
    "preciptype": null,
    "windgust": 16.1,
    "windspeed": 14.8,
    "winddir": 110.0,
    "pressure": 1020.0,
    "visibility": 6.2,
    "cloudcover": 0.0,
    "solarradiation": 607.0,
    "solarenergy": 2.2,
    "uvindex": 6.0,
    "conditions": "Clear",
    "icon": "clear-day",
    "stations": [
      "LLBG",
      "F1003",
      "LLHA"
    ],
    "source": "obs",
    "sunrise": "06:08:42",
    "sunriseEpoch": 1709179722,
    "sunset": "17:36:43",
    "sunsetEpoch": 1709221003,
    "moonphase": 0.66
  }
 */
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const city = searchParams.get('city')
    // todo: add validation
    //

    const res = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${process.env.VISUALCROSSING_API_KEY}&unitGroup=metric`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if(res.ok) {
        try {
            const data = (await res.json()) as Root
            const {address, currentConditions: {temp, humidity, windspeed, conditions, icon }} = data
            return Response.json({address, temp, humidity, windspeed, conditions, icon})
        } catch (e) {
            return new NextResponse(JSON.stringify({message: `Error fetching city request`}), { status: 500 })
        }
    } else {
         return new NextResponse(JSON.stringify({message: `Error fetching city ${city}`}), { status: res.status })
    }





}