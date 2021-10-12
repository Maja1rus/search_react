import React, {useState, useRef, useEffect, useCallback} from 'react'

const Dropdown = ({
    options,
    id,
    label,
    defaultName,
    value,
    onChange,
    render,
    data
}) => {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')
    const dropdownEl = useRef()

    // Hiding dropdown
    const close = useCallback(
        (e) => {
            if (open && !dropdownEl.current.contains(e.target)) {
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
        <div className="dropdown" ref={dropdownEl}>
            <div className="control" onClick={() => setOpen((prev) => !prev)}>
                <div className="selected-value">
                    <input
                        type="text"
                        placeholder={value ? value[label] : defaultName}
                        value={displayValue()}
                        onChange={(e) => {
                            setQuery(e.target.value)
                            onChange(null)
                        }}
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
                        onClick={() => {
                            setQuery('')
                            onChange(option)
                            setOpen(false)
                        }}
                    >
                        <div className="select-wrapper">
                            {option[label]}
                            {render(data)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dropdown
