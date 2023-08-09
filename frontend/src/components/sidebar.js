import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCard from './AccountCard';
import { Grid } from '@mui/material';
import axios from 'axios';
import TransactionTable from './TransactionTable';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import {client} from '../App'
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Sidebar({username}) {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [user, setUser] = useState(username);
  //accounts states 
  const [accounts, setAccounts] = useState([]);
  //transaction states
  const [transactions, setTransactions] = useState([]);
  //view between accounts and transactions
  const [currentView, setCurrentView] = useState('accounts');

  //this state is used for create transaction button
  const [createTransaction, setCreateTransaction] = useState(false);

  //transaction data used for creating a transaction
  const [transactionData, setTransactionData] = useState({
    amount: '',
    transaction_type: '',
    note: '',
    account: '', 
  });

  //managing states for account selection
  const [accountDateInput, setAccountDateInput] = useState({
    account: '',
    date: ''
  });
  const [balance, setBalance] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccountDateInput(prev => ({
        ...prev,
        [name]: value
    }));
};

const getBalanceForDate = () => {
  client.get(`/api/accounts/transactions/${accountDateInput.account}/balance/${accountDateInput.date}/`)
  .then(response => {
      setBalance(response.data.balance);
  })
  .catch(error => {
      console.error("Error fetching balance:", error);
  });
};

  const csrfToken = document.cookie.match(/csrftoken=([^;]+)/)[1];



   const client2 = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
      'X-CSRFToken': csrfToken,
      'Content-Type': 'application/json', // Adjust content type as needed
  },
  });
  //function to create transaction api
  const createTransactionApiCall = () => {
    console.log("Sending data:", transactionData);

    client2.post('/api/accounts/transactions', {
      transaction_type: transactionData.transaction_type,
      note: transactionData.note,
      amount: transactionData.amount,
      account: transactionData.account
    })
    
    
    .then(response => {
        console.log("Transaction created:", response.data);
        setCreateTransaction(false);
    })
    .catch(error => {
        console.error("Error creating transaction:", error);
    });
  };
  

  //Getting the accounts from endpoint api
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/accounts', {withCredentials: true})
        .then(response => {
            setAccounts(response.data);
        })
        .catch(error => {
            console.error("Error fetching accounts:", error);
        });
        setUser(username);
        if (currentView === 'transactions') {
          axios.get('http://127.0.0.1:8000/api/accounts/transactions', {withCredentials: true})
              .then(response => {
                  setTransactions(response.data);
              })
              .catch(error => {
                  console.error("Error fetching transactions:", error);
              });
      }
}, [currentView]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
        {user}
        </DrawerHeader>
        <Divider />
        <List>
        {/* side bar items */}
          {['Accounts', 'Transactions'].map((text, index) => (
            <ListItem key={text} disablePadding>
            {/* onClick is used for chaging the mainView */}
              <ListItemButton onClick={()=> setCurrentView(text.toLowerCase())}>
                <ListItemIcon>
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
      
        <DrawerHeader />
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          
          <Main open={open}>
          
            <DrawerHeader />
            {currentView === 'accounts' &&(
              <div>
              <FormControl fullWidth variant="outlined" margin="dense">
        <InputLabel htmlFor="account-input">Account</InputLabel>
        <Select
            label="Account"
            id="account-input"
            name="account"
            value={accountDateInput.account}
            onChange={handleInputChange}
        >
            {accounts.map(account => (
                <MenuItem key={account.accound_id} value={account.accound_id}>
                    {account.account_number}
                </MenuItem>
            ))}
        </Select>
        </FormControl>

        <TextField
            label="Date"
            type="date"
            name="date"
            variant="outlined"
            fullWidth
            margin="dense"
            value={accountDateInput.date}
            onChange={handleInputChange}
            InputLabelProps={{
                shrink: true,
            }}
        />

        <Button onClick={getBalanceForDate} variant="contained" color="primary">
            Get Balance
        </Button>

        {balance !== null && (
            <Typography variant="h6" style={{ marginTop: '20px' }}>
                Balance as of {accountDateInput.date}: ${balance}
            </Typography>
        )}

          
        <Grid container spacing={3}>
          {accounts.map(account => (
            <Grid item key={account.account_number} xs={12} sm={12} md={6} lg={4}>
              <AccountCard account={account} />
            </Grid>
          ))}
        </Grid>
        </div>
        )}



        {currentView === 'transactions' &&(
          <div>
          <Button variant="contained" color="primary" onClick={() => setCreateTransaction(true)}>
            Create transaction
          </Button>
          <Dialog open={createTransaction} onClose={() => setCreateTransaction(false)}>
          <DialogTitle>Create Transaction</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Fill in the details to create a new transaction.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Amount"
              type="number"
              fullWidth
              variant="outlined"
              value={transactionData.amount}
              onChange={(e) => setTransactionData({ ...transactionData, amount: e.target.value })}

            />
            <FormControl fullWidth variant="outlined" margin="dense">
              <InputLabel htmlFor="transaction-type">Transaction Type</InputLabel>
              <Select
                label="Transaction Type"
                id="transaction-type"
                value={transactionData.transaction_type}
                onChange={(e) => setTransactionData({ ...transactionData, transaction_type: e.target.value })}
              >
                <MenuItem value={"CREDIT"}>CREDIT</MenuItem>
                <MenuItem value={"DEBIT"}>DEBIT</MenuItem>
              </Select>
            </FormControl>

            <TextField
              autoFocus
              margin="dense"
              label="Note"
              type="string"
              fullWidth
              variant="outlined"
              value={transactionData.note}
              onChange={(e) => setTransactionData({ ...transactionData, note: e.target.value })}
            />
            <FormControl fullWidth variant="outlined" margin="dense">
              <InputLabel htmlFor="account-number">Account</InputLabel>
              <Select
                label="Account"
                id="account-number"
                value={transactionData.account}
                onChange={(e) => setTransactionData({ ...transactionData, account: e.target.value })}
              >
                {accounts.map(account => (
                  <MenuItem key={account.accound_id} value={account.accound_id}>
                    {account.account_number}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>


          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCreateTransaction(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={()=> createTransactionApiCall()} color="primary">
              Create
            </Button>

          </DialogActions>
        </Dialog>

          <TransactionTable data = {transactions}></TransactionTable>
          </div>
        )}
      </Main>
    </Box>
      </Main>
    </Box>
  );
}