import React from 'react';
import ReactChildren from '@/types/ReactChildren';

interface TableRowProps {
    children: ReactChildren;
}

const TableRow = ({ children = [] }: TableRowProps): React.ReactElement => (
    <div>
        {children}
    </div>
);

export default TableRow;
