import React, {useState} from 'react'
import './App.css'
import Dropdown from './components/Dropdown'
import data from './data/colors.json'

function App() {
    const [value, setValue] = useState(null)

    return (
        <div className="App">
            <div className="content">
                <Dropdown
                    prompt="Select color..."
                    options={data}
                    id="label"
                    label="label"
                    rgb="rgb"
                    value={value}
                    onChange={(val) => setValue(val)}
                />
            </div>
        </div>
    )
}

export default App
