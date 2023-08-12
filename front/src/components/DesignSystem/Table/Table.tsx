import ReactChildren from '@/types/ReactChildren';
import React from 'react';

interface TableProps {
    children: ReactChildren;
}

const Table = ({ children = [] }: TableProps): React.ReactElement => (
    <div>
        {children}
    </div>
);

export default Table;
