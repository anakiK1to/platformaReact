// src/App.tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import {createTheme, ThemeProvider, Button} from "@mui/material";
import {blueGrey, pink, teal} from "@mui/material/colors";


const theme = createTheme({
    palette: {
        primary: blueGrey,
        secondary: pink,
        background: {
            default: '#f7f7f7',
        },
    },
    components: {
        MuiListItem: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                },
            },
        },
    },
});


const App: React.FC = () => (
    <ThemeProvider theme={theme}>
        <AuthProvider>
            <Router>
                <AppRoutes />
            </Router>
        </AuthProvider>
    </ThemeProvider>
);


export default App;
