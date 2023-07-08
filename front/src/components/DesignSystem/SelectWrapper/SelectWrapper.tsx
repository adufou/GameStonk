import React from 'react';

import { Select } from '@windmill/react-ui'

const SelectWrapper = ({ values, callback, selected }) => {
    return (
        <Select className="mt-1"
            // defaultValue={selected}
            value={selected}
            onChange={({ target: { value } }) => callback(value)}
        >
            {values.map(value => (
                <option value={value.value} key={value.value}>
                    {value.text}
                </option>
            ))}
        </Select>
    );
}

export default SelectWrapper;
