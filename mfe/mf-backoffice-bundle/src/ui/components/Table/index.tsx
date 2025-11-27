import React from 'react';
import styles from './styles.module.css';

export const TableContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div
    className={
      className
        ? `${styles.tableContainer} ${className}`
        : styles.tableContainer
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
        className ? `${styles.tableWrapper} ${className}` : styles.tableWrapper
      }
    >
      <table className={styles.table}>
        {colgroup}
        {header}
      </table>
      <div className={styles.bodyScroll} style={{ maxHeight: bodyHeight }}>
        <table className={styles.table}>
          {colgroup}
          {body}
        </table>
      </div>
    </div>
  );
};

export const TableHeader: React.FC<{ header: string[] }> = ({ header }) => (
  <thead className={styles.thead}>
    <tr>
      {header.map((col) => (
        <th key={col} className={styles.th}>
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
  <tr className={className ? `${styles.tr} ${className}` : styles.tr}>
    {children}
  </tr>
);

export const TableCol: React.FC<{
  children: React.ReactNode;
  className?: string;
  align?: 'start' | 'center' | 'end';
}> = ({ children, className, align }) => (
  <td
    className={className ? `${styles.td} ${className}` : styles.td}
    style={{ textAlign: align }}
  >
    {children}
  </td>
);

export const TableBody: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <tbody>{children}</tbody>;
