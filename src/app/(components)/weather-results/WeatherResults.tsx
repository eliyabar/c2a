import {Flex, Skeleton, useToast} from "@chakra-ui/react";
import {Suspense, useEffect, useState} from "react";


export const WeatherResults: React.FC<{ cities?: Array<string> }> = ({cities}) => {
    const promises = cities?.map(c => ({
        name: c,
        promise: fetch(`http://localhost:3000/api/weather?city=${c.trim()}`).then(async r => {
            if(r.ok) {
                return r.json()
            } else {
                const err = await r.json()
                throw err
            }
        })
    }))
    return <div>
        <Suspense fallback={'loading'}>
            <Flex gap={3} direction={'column'}>
                {promises?.map(({promise, name}) => (<WeatherResult key={name} name={name} cityPromise={promise}/>))}

            </Flex>
        </Suspense>
    </div>
}
type WeatherRes = {
    address: string,
    temp: number,
    humidity: number,
    windspeed: number,
    conditions: string,
    icon: string
}
const WeatherResult: React.FC<{ cityPromise: Promise<WeatherRes> ,name: string }> = ({cityPromise, name}) => {
    const [result, setResult] = useState<undefined | WeatherRes>()
    const [error, setError] = useState<string>()
    const t = useToast()
    useEffect(() => {
        cityPromise.then(x => {
            setResult(x)
        }).catch(e => {
            t({title:'Error', variant:'warning', description: e.message})
            setError(e.message)
        })
    }, []);
    return <Flex w={'full'} bg={error ? 'red' : '#003eaa'} borderRadius={'sm'} gap={3}>
        {error && (<Flex>
            {`${error}`}
        </Flex>)}
        {result ? <Flex direction={'column'}>
            <div>
                {`City Name: ${result?.address}`}
            </div>
            <div>
                {`Temp: ${result?.temp} cel `}
            </div>
            <div>
                {`Wind speed: ${result?.windspeed}`}
            </div>
            <div>
                {`Conditions: ${result?.conditions}`}
            </div>
            <div>
                {`Humidity: ${result?.humidity}`}
            </div>
        </Flex> : <Skeleton w={'full'}/>}

    </Flex>
}
