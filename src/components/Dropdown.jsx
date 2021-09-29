import React, {useState, useRef, useEffect} from 'react'

const Dropdown = ({ options, id, label, rgb, prompt, value, onChange }) => {
    
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("")
    const ref = useRef(null);

    useEffect(() => {
        document.addEventListener("click", close)
        return () => document.removeEventListener("click", close)
    }, [])

    function close(e) {
        setOpen(e && e.target === ref.current)
    }

    function filter(options) {
        return options.filter(option => option[label].toLowerCase().indexOf(query.toLowerCase()) > -1);
    }

    function displayValue() {
        if (query.length > 0) return query;
        if (value) return value[label];
        return "";
    }

    return (
        <div className="dropdown">
            <div className="control" onClick={() => setOpen((prev) => !prev)}>
                <div className="selected-value">
                    <input
                        type="text"
                        ref={ref}
                        placeholder={value ? value[label] : prompt}
                        value={displayValue()}
                        onChange={(e) => {
                            setQuery(e.target.value)
                            onChange(null)
                        }}
                        onClick={() => setOpen((prev) => !prev)}
                    />
                </div>
                <div className={`arrow ${open ? 'open' : null}`} />
            </div>
            <div className={`options ${open ? 'open' : null}`}>
                {filter(options).map((option) => (
                    <div
                        key={option[id]}
                        className={`option ${
                            value === option ? 'selected' : null
                        }`}
                        style={{color: `rgb(${option[rgb]})`}}
                        onClick={() => {
                            setQuery('')
                            onChange(option)
                            setOpen(false)
                        }}
                    >
                        <div className="select-wrapper">
                            {option[label]}
                            <div
                                className="box-color"
                                style={{background: `rgb(${option[rgb]})`}}
                            />
                            </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dropdown
