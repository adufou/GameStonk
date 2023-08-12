import ReactChildren from '@/types/ReactChildren';
import React from 'react';

interface TableHeaderProps {
    children: ReactChildren;
}

const TableHeader = ({ children = [] }: TableHeaderProps): React.ReactElement => (
    <div>
        {children}
    </div>
);

export default TableHeader;
