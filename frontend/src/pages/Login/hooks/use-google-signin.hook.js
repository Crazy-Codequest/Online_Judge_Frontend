import axios from 'axios';
import React from 'react'
import { urlConstants } from '../../../apis';
import { toast } from 'react-toastify';
import { loginSuccess } from '../../../features/auth/authSlice';
import { useDispatch } from 'react-redux';

const useGoogleSignIn = (setLoading) => {
  const dispatch = useDispatch();

  const handleGoogleSignIn = () => {
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id:
        "20870351451-mpi3unchgdhhoigegso0d6c1hcjo117r.apps.googleusercontent.com",
      scope: "openid email profile",
      callback: async (tokenResponse) => {
        try {
          setLoading(true);
          const accessToken = tokenResponse.access_token;
          const res = await fetch(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          const userInfo = await res.json();

          const response = await axios.post(urlConstants.googleLogin, {
            email: userInfo.email,
            name: userInfo.name,
          });

          const { user, token } = response.data;

          localStorage.setItem("user", JSON.stringify({ user }));
          localStorage.setItem("token", token);
          dispatch(loginSuccess({ user, token }));
          toast.success("Logged in with Google!");
        } catch (err) {
          console.error("Google login failed", err);
          toast.error("Google sign-in failed!");
          setLoading(false);
        }
      },
    });

    client.requestAccessToken();
  };

  return { handleGoogleSignIn };
};

export default useGoogleSignIn