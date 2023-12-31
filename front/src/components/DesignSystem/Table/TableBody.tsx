import React from 'react';
import ReactChildren from '@/types/ReactChildren';

interface TableBodyProps {
    children: ReactChildren;
}

const TableBody = ({ children = [] }: TableBodyProps): React.ReactElement => (
    <div>
        {children}
    </div>
);

export default TableBody;
