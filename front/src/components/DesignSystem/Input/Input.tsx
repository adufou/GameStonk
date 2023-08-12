import React, { ChangeEvent } from 'react';

interface InputProps {
    label?: string;
    name?: string
    type?: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    isRequired?: boolean;
}

const Input = ({
    label, name, type = 'input', value, onChange, isRequired = false, 
}: InputProps): React.ReactElement => (
    <div className='input'>
        {label && 
            <span className='input__label'>{label}</span>
        }
        <input
            className='input__input'
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={isRequired}
        />
    </div>
);

export default Input;
