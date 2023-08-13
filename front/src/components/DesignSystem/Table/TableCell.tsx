import React from 'react';
import ReactChildren from '@/types/ReactChildren';

interface TableCellProps {
    children: ReactChildren;
}

const TableCell = ({ children = [] }: TableCellProps): React.ReactElement => (
    <div>
        {children}
    </div>
);

export default TableCell;
