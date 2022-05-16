import {useContext, useState} from "react";
import {ConverterContext} from "../context/ConverterContext";

function FirstDropdown({firstSelect}) {
    const {currencies} = useContext(ConverterContext)
    const [checked, setChecked] = useState('AED')

    const handleChange = (e) => {
        setChecked(e.target.value)
        firstSelect(e.target.value)
    }
    return (
        <form>
            <div className="form-group">
                <select className='form-select'
                        defaultValue={checked} onChange={handleChange}>
                    {currencies.map((currency, index) => (
                        <option key={index} value={currency}>
                            {currency}</option>
                    ))}
                </select>
            </div>
        </form>
    )
}

export default FirstDropdown