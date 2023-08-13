import React from 'react';
import ReactChildren from '@/types/ReactChildren';

interface TableHeaderProps {
    children: ReactChildren;
}

const TableHeader = ({ children = [] }: TableHeaderProps): React.ReactElement => (
    <div>
        {children}
    </div>
);

export default TableHeader;
