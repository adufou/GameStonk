import React from 'react';

const Button = ({ children, type = undefined, href = '', callback = null, label = '' }) => {
    return (
        <div>
            <button type={type}>
                {children}
            </button>
        </div>
    );
};

export default Button;
