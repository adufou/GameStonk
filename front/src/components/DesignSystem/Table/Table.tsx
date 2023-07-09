import React from 'react';
import ReactChildren from 'src/types/ReactChildren';

interface TableProps {
    children: ReactChildren;
}

const Table = ({ children = [] }: TableProps): React.ReactElement => {
    return (
        <div>
            {children}
        </div>
    );
};

export default Table;
