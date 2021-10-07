import React, {useState, useRef, useEffect, useCallback} from 'react'

const Dropdown = ({options, id, label, rgb, prompt, value, onChange}) => {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')
    const dropdownEl = useRef()

    // Hiding dropdown
    const close = useCallback(
        (e) => {
            if (
                open &&
                e.target.closest('.dropdown') !== dropdownEl.current
            ) {
                setOpen(false)
            }
        },
        [open, setOpen, dropdownEl]
    )

    useEffect(() => {
        document.addEventListener('click', close)
        return () => document.removeEventListener('click', close)
    }, [close])

    function filter(options) {
        return options.filter(
            (option) =>
                option[label].toLowerCase().indexOf(query.toLowerCase()) > -1
        )
    }

    function displayValue() {
        if (query.length > 0) return query
        if (value) return value[label]
        return ''
    }

    return (
        <div
            className="dropdown">
            <div className="control">
                <div className="selected-value">
                    <input
                        type="text"
                        placeholder={value ? value[label] : prompt}
                        ref={dropdownEl}
                        value={displayValue()}
                        onChange={(e) => {
                            setQuery(e.target.value)
                            onChange(null)
                        }}
                        onClick={() => setOpen(!open)}
                    />
                </div>
                <div
                    className={`arrow ${open ? 'open' : null}`}
                    onClick={() => setOpen(!open)}
                />
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
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dropdown
