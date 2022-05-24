import {useContext, useEffect, useState} from "react"
import FirstDropdown from "./components/FirstDropdown"
import SecondDropdown from "./components/SecondDropdown"
import {ConverterContext} from "./context/ConverterContext"
import './App.css'

function App() {
    const {rates} = useContext(ConverterContext)
    const [firstInput, setFirstInput] = useState(0)
    const [secondInput, setSecondInput] = useState(0)
    const [firstSelected, setFirstSelected] = useState('AED')
    const [secondSelected, setSecondSelected] = useState('AED')

    useEffect(() => {
        if (firstInput !== 0 || secondInput !== 0) {
            setSecondInput(firstInput * rates[secondSelected] / rates[firstSelected])
        }
    }, [firstSelected])

    useEffect(() => {
        if (firstInput !== 0 || secondInput !== 0) {
            setFirstInput(secondInput * rates[firstSelected] / rates[secondSelected])
        }
    }, [secondSelected])

    const handleFirstInput = (e) => {
        setFirstInput((e.target.value))
        setSecondInput(e.target.value * rates[secondSelected] / rates[firstSelected])
    }

    const handleSecondInput = (e) => {
        setSecondInput(e.target.value)
        setFirstInput(e.target.value * rates[firstSelected] / rates[secondSelected])
    }

    return (
        <div style={{textAlign: 'center', marginTop:'5%'}}>
            <h6 className='text-black text-opacity-75'>
                {Number(firstInput).toFixed(2)} {' '} {firstSelected} entsprischt
            </h6>
            <h3 className='text-primary'>{Number(secondInput).toFixed(2)} {' '} {secondSelected}</h3>
            <div className="d-flex justify-content-center gap-5 mb-2">
                <input type="number" min="0" value={Number(firstInput).toFixed(2)}
                       onChange={handleFirstInput}/>
                <FirstDropdown firstSelect={(firstSelected) => setFirstSelected(firstSelected)}/>
            </div>
            <div className="d-flex justify-content-center gap-5">
                <input type="number" min="0" value={Number(secondInput).toFixed(2)}
                       onChange={handleSecondInput}/>
                <SecondDropdown secondSelect={(secondSelected) => setSecondSelected(secondSelected)}/>
            </div>
        </div>
    );
}

export default App;
