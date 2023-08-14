import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



export default function TransactionTable({ data, filterByAccount }) {
  const filteredTransactions = data.filter(transaction => transaction.account_number === (filterByAccount==='' ? transaction.account_number:filterByAccount));
  //filter by id
  //const sortedTransactions = filteredTransactions.sort((a, b) => a.transaction_id - b.transaction_id);
  //filter by the date
  const sortedTransactions = filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  return (
      <TableContainer component={Paper}>
          <Stack spacing={2}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                      <TableRow>
                          <StyledTableCell>ID</StyledTableCell>
                          <StyledTableCell align="center">Date</StyledTableCell>
                          <StyledTableCell align="center">Type</StyledTableCell>
                          <StyledTableCell align="center">Account Number</StyledTableCell>
                          <StyledTableCell align="center">Note</StyledTableCell>
                          <StyledTableCell align="center">Amount</StyledTableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {sortedTransactions.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((transaction) => {
                          //format the date
                          const dateObj = new Date(transaction.date);
                          const formattedDate = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
                          //get the last 4 digits
                          const maskedAccountNumber = `***${transaction.account_number.slice(-4)}`;
                          return (
                              <StyledTableRow key={transaction.transaction_id}>
                                  <StyledTableCell align='center' style={{ width: "10px" }}>
                                      {transaction.transaction_id}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">{formattedDate}</StyledTableCell>
                                  <StyledTableCell align="center">{transaction.transaction_type}</StyledTableCell>
                                  <StyledTableCell align="center">{maskedAccountNumber}</StyledTableCell>
                                  <StyledTableCell align="center">{transaction.note}</StyledTableCell>
                                  <StyledTableCell align="center">{transaction.transaction_type === "CREDIT" ? `+${transaction.amount}` : `-${transaction.amount}`}</StyledTableCell>
                              </StyledTableRow>
                          );
                      })}
                  </TableBody>
              </Table>
              <Pagination
                  count={Math.ceil(sortedTransactions.length / rowsPerPage)}
                  page={page}
                  onChange={(event, newPage) => setPage(newPage)}
              />
          </Stack>
      </TableContainer>
  );
}
