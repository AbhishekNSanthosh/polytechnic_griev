import LoginDir from "./Pages/LoginDir/LoginDir";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, purple, red } from '@mui/material/colors';
import {
  HashRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Navbar from "./Components/Navbar/Navbar";
import ViewGriev from "./Pages/ViewGriev/ViewGriev";
import { toast, Toaster } from "react-hot-toast";
import AddTool from "./Components/AddTool/AddTool";
import AddGriev from "./Pages/AddGriev/AddGriev";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion'
import Loader from "./Components/Loader/Loader";

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: green[500],
    },
  },
});




function App() {
  const [user, setUser] = useState(null)
  const [reload, setReload] = useState(false);
  const [callUser, setCallUser] = useState(false);
  const [loading, setLoading] = useState(true);

  // Simulating data loading using useEffect hook
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const token = Cookies.get('access_token');

  const userType = localStorage.getItem('usertype')
  const getUserDetails = () => {
    axios.get('https://flask-production-37b2.up.railway.app/user_details/', {
      headers: {
        'x-access-token': token
      }
    }).then((res) => {
      setUser(res.data)
      localStorage.setItem('user', JSON.stringify(res.data))
    }).catch((err) => {
      if (err.response.status === 401) {
        toast.error('Token Expired', {
          position: 'top-center',
          style: {
            backgroundColor: 'black',
            color: '#fff'
          }
        })
        toast.error('Please Login', {
          style: {
            border: '1px solid #713200',
            padding: '10px',
            color: '#713200',
          },
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
        });
        localStorage.clear();
        Cookies.remove('access_token');
        setTimeout(() => {
          window.location.reload()
        }, 900);
      }
    })
  }
  useEffect(() => {
    if (token) {
      getUserDetails()
    }
  }, [callUser])


  const getCall = (data) => {
    setReload(data)
  }

  const getCall2 = (data) => {
    setCallUser(data)
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <LoginDir getCall2={getCall2} />
            </motion.div>}
          />
          <Route path="/dashboard" element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Dashboard user={user} reload={reload} Token={token}/>
            </motion.div>
          } />
          <Route path="/dashboard/view" element={
            <>
              {loading ?
                <Loader />
                :
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <ViewGriev user={user} />
                </motion.div>
              }
            </>
          } />
          <Route path="/dashboard/add-griev" element={
            <>
              {loading ?
                <Loader />
                :
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <AddGriev user={user} getCall={getCall} />
                </motion.div>
              }
            </>
          } />
          {/* <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" />} /> */}
        </Routes>
        {userType === 'Student' &&
          <AddTool />
        }
      </Router>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
