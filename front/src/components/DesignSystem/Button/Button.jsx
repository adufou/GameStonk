import React from 'react';

const Button = ({ children, type = undefined, href = '', callback = null }) => {
    return (
        <div>
            <button type={type}>
                {children}
            </button>
        </div>
    );
};

export default Button;
