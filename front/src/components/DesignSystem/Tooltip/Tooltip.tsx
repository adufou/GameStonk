import Tippy from '@tippyjs/react';
import React, { forwardRef } from 'react';
import ReactChildren from '@/types/ReactChildren';

interface TooltipProps {
    children: React.ReactElement,
    content: ReactChildren | string,
}

const Tooltip = ({
    children, content, 
}: TooltipProps): React.ReactElement => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const TooltipForwardRef = forwardRef<any, unknown>((props, ref) => {
        return (
            <div ref={ref}>
                { children }
            </div>
        );
    });   
    TooltipForwardRef.displayName = 'TooltipForwardRef';
    
    return(
        <Tippy content={<>{content}</>}>
            <TooltipForwardRef />
        </Tippy>
    );
};

export default Tooltip;
