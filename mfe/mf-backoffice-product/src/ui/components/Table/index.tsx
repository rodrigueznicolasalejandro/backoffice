import React from 'react';

export const TableContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div
    className={
      className
        ? `bg-white rounded-lg shadow p-4 overflow-hidden w-full box-border ${className}`
        : 'bg-white rounded-lg shadow p-4 overflow-hidden w-full box-border'
    }
  >
    {children}
  </div>
);

export const Table: React.FC<{
  cantColumns: number;
  header: React.ReactNode;
  body: React.ReactNode;
  className?: string;
  bodyHeight?: string;
  colWidths?: string[];
}> = ({
  cantColumns,
  header,
  body,
  className,
  bodyHeight = '300px',
  colWidths,
}) => {
  // Genera <colgroup> para sincronizar los anchos
  const colgroup = (
    <colgroup>
      {Array.from({ length: cantColumns }).map((_, idx) => (
        <col
          key={idx}
          style={colWidths && colWidths[idx] ? { width: colWidths[idx] } : {}}
        />
      ))}
    </colgroup>
  );
  return (
    <div
      className={
        className
          ? `w-full rounded-lg p-4 box-border ${className}`
          : 'w-full rounded-lg p-4 box-border'
      }
    >
      <table className="w-full border-collapse">
        {colgroup}
        {header}
        {body}
      </table>
    </div>
  );
};

export const TableHeader: React.FC<{ header: string[] }> = ({ header }) => (
  <thead className="sticky top-0 z-20">
    <tr>
      {header.map((col) => (
        <th key={col} className="bg-gray-100 text-primary-700 font-semibold border-b border-gray-200 p-3 text-left">
          {col}
        </th>
      ))}
    </tr>
  </thead>
);

export const TableRow: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <tr className={className ? `border-b border-gray-200 transition-colors hover:bg-gray-50 ${className}` : 'border-b border-gray-200 transition-colors hover:bg-gray-50'}>
    {children}
  </tr>
);

export const TableCol: React.FC<{
  children: React.ReactNode;
  className?: string;
  align?: 'start' | 'center' | 'end';
}> = ({ children, className, align }) => (
  <td
    className={className ? `p-3 box-border text-left ${className}` : 'p-3 box-border text-left'}
    style={{ textAlign: align }}
  >
    {children}
  </td>
);

export const TableBody: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <tbody>{children}</tbody>;
