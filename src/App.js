import React, {useState} from 'react'
import './App.css'
import Dropdown from './components/Dropdown'
import data from './data/colors.json'

function App({option, rgb}) {
    const [value, setValue] = useState(null)



    return (
        <div className="App">
            <div className="content">
                <Dropdown
                    defaultName="Select color..."
                    options={data}
                    id="label"
                    label="label"
                    rgb="rgb"
                    value={value}
                    onChange={(val) => setValue(val)}
                    render={(data) => (
                        <div
                            className="box-color"
                            style={{background: `rgb(${data})` }}
                        ></div>
                    )}
                />
            </div>
        </div>
    )
}

export default App
