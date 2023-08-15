import Tippy from '@tippyjs/react';
import React from 'react';
import ReactChildren from '@/types/ReactChildren';

interface TooltipProps {
    children: React.ReactElement,
    content: ReactChildren | string,
}

const Tooltip = ({
    children, content, 
}: TooltipProps): React.ReactElement => {
    return(
        <Tippy content={<>{content}</>}>
            {children}
        </Tippy>
    );
};

export default Tooltip;
