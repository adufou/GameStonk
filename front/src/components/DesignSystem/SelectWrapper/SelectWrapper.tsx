import React from 'react';

type SelectValueType = string | number | undefined

interface SelectValue {
    value: SelectValueType;
    text: string;
}

interface SelectWrapperProps {
    values: SelectValue[];
    callback: () => void;
    selected: SelectValueType;
}

const SelectWrapper = ({
    values, callback, selected, 
}: SelectWrapperProps): React.ReactElement => 
// Ne va pas fonctionner, la callback ne prend plus la target, mais en meme temps on donne
// selected donc ça devrait le faire
    (
        <select
            value={selected}
            onChange={(): void => callback()}
        >
            {values.map(value => (
                <option
                    value={value.value}
                    key={value.value}
                >
                    {value.text}
                </option>
            ))}
        </select>
    )
;

export default SelectWrapper;
