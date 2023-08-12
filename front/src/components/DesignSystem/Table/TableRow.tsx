import ReactChildren from '@/types/ReactChildren';
import React from 'react';

interface TableRowProps {
    children: ReactChildren;
}

const TableRow = ({ children = [] }: TableRowProps): React.ReactElement => (
    <div>
        {children}
    </div>
);

export default TableRow;
