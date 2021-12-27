import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const headerStyles = {
  fontSize: 'calc(11px + 1vmin)',
  color: '#61dafb',
  maxWidth: '50%'
}
const headerRowStyles = {
  background: '#131417'
}
const cellStyles = {
  fontSize: 'calc(8px + 1vmin)',
  maxWidth: '50%',
  color: '#FFF'
}
const containerStyles = {
  background: '#1e1f26',
  margin: '0 auto'
}
const footerStyles = {
  fontSize: 'calc(8px + 1vmin)',
  background: '#61dafb',
  color: '#131417'
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const BasicTable = ({ rows }) => {
  const totalEth = parseFloat(rows[0].eth);
  const totalUsd = parseFloat(rows[0].usd);
  rows = rows.slice(1);
  return (
    <TableContainer
      style={containerStyles}
      component={Paper}
    >
      <Table
        sx={{ minWidth: 370 }}
        aria-label="spanning table"
      >
        <TableHead>
          <TableRow style={headerRowStyles}>
            <TableCell
              align="center"
              style={headerStyles}
            >Holdings
            </TableCell>
            <TableCell
              align="center"
              style={headerStyles}
            >Quantity
            </TableCell>
            <TableCell
              align="center"
              style={headerStyles}
            >Value
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell
                align="center"
                style={cellStyles}
                sx={{ borderRight: '1px solid #FFF' }}
              >{row.desc}
              </TableCell>
              <TableCell
                align="center"
                style={cellStyles}
              >{row.price.eth}
              </TableCell>
              <TableCell
                align="center"
                style={cellStyles}
              >{row.price.usd}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell
              align='center'
              style={footerStyles}
              sx={{ borderRight: '1px solid #FFF' }}
            >Grand Total:
            </TableCell>
            <TableCell
              align='center'
              style={footerStyles}
            >{totalEth}
            </TableCell>
            <TableCell
              align='center'
              style={footerStyles}
            >{formatter.format(totalUsd)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}