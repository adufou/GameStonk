import React, { ChangeEvent } from 'react';
import './Input.scss';

interface InputProps {
    label?: string;
    name?: string
    type?: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => any;
    isRequired?: boolean;
}

const Input = ({ label, name, type = 'input', value, onChange, isRequired = false }: InputProps): React.ReactElement => {
    return (
        <div className='input'>
            {label &&
                <span className='input__label'>{label}</span>
            }
            <input className='input__input' type={type} name={name} value={value} onChange={onChange} required={isRequired} />
        </div>
    );
};

export default Input;
