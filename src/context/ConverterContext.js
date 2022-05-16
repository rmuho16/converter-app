import {createContext, useEffect, useState} from "react";

export const ConverterContext = createContext()

export const ConverterProvider = ({children}) => {
    const [currencies, setCurrencies] = useState([])
    const [rates, setRates] = useState({})

    useEffect(() => {
        getCurrencies()
            .catch(err => console.log(err))
        getExchangeRates()
            .catch(err => console.log(err))
    }, [])

    const getExchangeRates = async () => {
        const res = await fetch(`https://openexchangerates.org/api/latest.json?app_id=ebe5dd0f636a4b5eafedc714fb0f452b&base=USD `, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await res.json()
        setRates(data.rates)
    }
    const getCurrencies = async () => {
        const res = await fetch('https://openexchangerates.org/api/currencies.json', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        setCurrencies(Object.keys(data))
    }
    return (
        <ConverterContext.Provider value={{
            currencies,
            rates
        }}>
            {children}
        </ConverterContext.Provider>
    )
}