'use client'
import {Button, Center, Flex, Input, InputGroup, InputRightElement} from "@chakra-ui/react";
import {useState} from "react";
import {WeatherResults} from "@/app/(components)/weather-results/WeatherResults";

export default function Home() {
    const [cities, setCities] = useState<Array<string> | undefined>()
    const [input, setInput] = useState("")
    const handleClick = () => {
        setCities(input.split(','))
    }
    return (<Flex w={'full'} h={'full'} justifyContent={'center'} mt={150} px={20}>
            <Flex direction={'column'} w={'full'}>
                <InputGroup size='md'>
                    <Input
                        value={input}
                        onChange={(e)=>{
                            setCities(undefined)
                            setInput(e.target.value)
                        }
                    }
                        pr='4.5rem'
                        placeholder='Enter cities'
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='xs' onClick={()=>{
                            setInput('')
                            setCities(undefined)
                        }}>
                            X
                        </Button>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            Search
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <WeatherResults cities={cities}/>
            </Flex>
        </Flex>
    );
}
