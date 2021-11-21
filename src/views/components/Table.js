import React from 'react';
import styled from '@emotion/styled';

const TableCont = styled('div')(({ noScroll }) => ({
  overflow: !noScroll && 'auto',
}));

const Th = styled('th')(({ align, cellPadding }) => ({
  padding: cellPadding || 15,
  textAlign: align || 'left',
}));

const Td = styled('td')(({ align, cellPadding }) => ({
  padding: cellPadding || 15,
  textAlign: align || 'left',
}));

const TableBody = styled('table')(({ align }) => ({
  width: '100%',
  borderSpacing: 0,
}));

const Table = ({ headers, noScroll, data, onRowClick, rowSelected, hoverRows, cellPadding }) => (
  <TableCont noScroll={noScroll}>
    <TableBody>
      <tr>
        {headers?.map((item) => (
          <>
            {!item?.hide && (
              <Th cellPadding={cellPadding} align={item?.align} key={item.key}>
                {item.children}
              </Th>
            )}
          </>
        ))}
      </tr>

      {data?.map((row, index) => (
        <tr
          key={`${row.name}-${row?.id}`}
          onClick={() => onRowClick && onRowClick(index, row)}
          selected={rowSelected === index}
          hover={hoverRows}
          style={
            rowSelected !== index
              ? {
                background: index % 2 ? 'white' : 'rgba(0, 0, 0, 0.04)',
              }
              : {}
          }
        >
          {headers?.map((item) => (
            <>
              {!item?.hide && (
                <Td
                  cellPadding={cellPadding}
                  align={item?.alignRow}
                  style={{
                    width: item?.width,
                    minWidth: item?.minWidth,
                  }}
                  key={`${item.key}-${row?.id}`}
                >
                  {item?.render(row[item?.keyProps], row, index)}
                </Td>
              )}
            </>
          ))}
        </tr>
      ))}

    </TableBody>
  </TableCont>
);

export default Table;
