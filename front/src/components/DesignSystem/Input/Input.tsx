import React, { ChangeEvent } from 'react';

interface InputProps {
    label?: string;
    name: string
    type: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => any;
    isRequired: boolean;
}

const Input = ({ label, name, type, value, onChange, isRequired = false }: InputProps): React.ReactElement => {
    return (
        <div>
            if ({label}) {
                <p>{label}</p>
            }
            <input type={type} name={name} value={value} onChange={onChange} required={isRequired} />
        </div>
    );
};

export default Input;
