import React from "react";
import { Card, CardContent, Typography, Button } from '@mui/material';

export default function AccountCard({account , setCurrentView, setFilterByAccount})
{
    // for balance
  const formattedBalance = `$${account.current_balance.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  
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
        <Button variant="outlined" color="primary" onClick={()=> {setCurrentView('transactions'); setFilterByAccount(account.account_number);}}>
          View Transactions
        </Button>
      </CardContent>
    </Card>
  );
}