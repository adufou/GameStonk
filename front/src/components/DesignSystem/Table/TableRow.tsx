import React from 'react';
import ReactChildren from 'src/types/ReactChildren';

interface TableRowProps {
    children: ReactChildren;
}

const TableRow = ({ children = [] }: TableRowProps): React.ReactElement => {
    return (
        <div>
            {children}
        </div>
    );
};

export default TableRow;
