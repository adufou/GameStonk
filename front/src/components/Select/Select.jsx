import React from 'react';

const Select = ({ values, callback, selected }) => {
    return (
        <select
            defaultValue={selected}
            onChange={({ target: { value } }) => callback(value)}
        >
            {values.map(value => (
                <option value={value.value} key={value.value}>
                    {value.text}
                </option>
            ))}
        </select>
    );
}

export default Select;
