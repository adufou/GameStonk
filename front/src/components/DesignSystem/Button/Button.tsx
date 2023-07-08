import React from 'react';

interface ButtonProps {
    text: string;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    href?: string;
    label?: string;
}

const Button = ({ text = '', type, onClick, href, label }: ButtonProps): JSX.Element => {
    const test = () => {
        console.log('test');
    };

    return (
        <div>
            if ({label}) {
                <span >{label}</span>
            }
            <button type={type} onClick={test}>
                {text}
            </button>
        </div>
    );
};

export default Button;
