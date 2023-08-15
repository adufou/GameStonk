import Tippy, { TippyProps } from '@tippyjs/react';
import React, { forwardRef } from 'react';
import ReactChildren from '@/types/ReactChildren';

interface TooltipProps {
    children: React.ReactElement,
    content: ReactChildren | string,
    /* see https://atomiks.github.io/tippyjs/v6/all-props/ for tippy.js props
     * and https://www.npmjs.com/package/@tippyjs/react#props for @tippyjs/react props
     */
    props?: Partial<TippyProps>,
}

const Tooltip = ({
    children, content, props,
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
    
    const defaultClassName = 'tooltip';
    
    // Add supported props here for type, default values and clarity
    /* eslint-disable react/prop-types */
    const tippyProps = {
        /* tippy.js props */
        // Arrow defaults to true
        arrow: props?.arrow !== undefined ? props.arrow : false,

        /* @tippyjs/react props */
        className: props?.className ? props.className : defaultClassName,
        disabled: props?.disabled,
        visible: props?.visible,
    };
    /* eslint-enable react/prop-types */
    
    return(
        <Tippy 
            content={<>{content}</>}
            arrow={tippyProps.arrow}
            
            className={tippyProps.className}
            disabled={tippyProps.disabled}
            visible={tippyProps.visible}
        >
            <TooltipForwardRef />
        </Tippy>
    );
};

export default Tooltip;
