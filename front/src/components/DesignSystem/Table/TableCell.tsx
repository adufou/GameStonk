import ReactChildren from '@/types/ReactChildren';
import React from 'react';

interface TableCellProps {
    children: ReactChildren;
}

const TableCell = ({ children = [] }: TableCellProps): React.ReactElement => (
    <div>
        {children}
    </div>
);

export default TableCell;
