import React, {useContext, useState, useEffect} from "react";
import {agent} from "../agent";
import {useHistory} from "react-router-dom";

const AuthContext = React.createContext(null);

const AuthProvider = ({children}) => {
  const history = useHistory();
  const [token, setToken] = useState(localStorage.getItem('token'));

  const ROLE_CUSTOMER = 'customer';
  const ROLE_ADMIN = 'admin';
  const [role, setRole] = useState(localStorage.getItem('role'));

  const [profile, setProfile] = useState(null);

  useEffect(async () => {
    // restore token and role from local storage
    console.log('reload')
    // if (!token || !role) {
    //   return history.replace('/sign-in');
    // }

    // reload user info
    await reloadUserInfo(role);
    history.replace('/');
  }, [token, role]);

  const signIn = ({role, email, password}) => {
    if (role === ROLE_CUSTOMER) {
      // customer sign in
      agent.customerSignIn(email, password)
        .then(async (res) => {
          if (res.status !== 200) {
            alert(res.body.message);
            return;
          }
          localStorage.setItem('token', res.body.token);
          localStorage.setItem('role', role);
          setToken(res.body.token);
          setRole(role);
        });
    } else if (role === ROLE_ADMIN) {
      // admins sign in
      agent.adminSignIn(email, password)
        .then(async (res) => {
          if (res.status !== 200) {
            alert(res.body.message);
            return;
          }
          localStorage.setItem('token', res.body.token);
          localStorage.setItem('role', role);
          setToken(res.body.token);
          setRole(role);
        });
    }
  };

  const reloadUserInfo = async (role) => {
    await new Promise(resolve => {
      if (role === ROLE_CUSTOMER) {
        agent.getCustomerInfo()
          .then(res => {
            if (res.status !== 200) {
              alert(res.body.message);
              return;
            }
            setProfile(res.body);
            resolve();
          })
      } else if (role === ROLE_ADMIN) {
        agent.getAdminInfo()
          .then(res => {
            if (res.status !== 200) {
              alert(res.body.message);
              return;
            }
            setProfile(res.body);
            resolve();
          })
      }
    })
  }

  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken('');
    setRole('');
    setProfile(null);
    return history.replace('/sign-in');
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        reloadUserInfo,
        token,
        role,
        profile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const auth = useContext(AuthContext);
  if (auth == null) {
    throw new Error("useAuth() called outside of a AuthProvider?"); // an alert is not placed because this is an error for the developer not the user
  }
  return auth;
};

export {AuthProvider, useAuth};
