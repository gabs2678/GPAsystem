import React from "react";
import { Card, CardContent, Typography, Button } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function AccountCard({account })
{
    // for balance
  const formattedBalance = `$${account.current_balance.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;
  
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom color="inherit">
          Account Number
        </Typography>
        <Typography variant="h6" gutterBottom>
        {account.account_number}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Current Balance {formattedBalance}
        </Typography>
        <Button variant="outlined" color="primary">
          View Transactions
        </Button>
      </CardContent>
    </Card>
  );
}