import ReactChildren from '@/types/ReactChildren';
import React from 'react';

interface TableBodyProps {
    children: ReactChildren;
}

const TableBody = ({ children = [] }: TableBodyProps): React.ReactElement => (
    <div>
        {children}
    </div>
);

export default TableBody;
