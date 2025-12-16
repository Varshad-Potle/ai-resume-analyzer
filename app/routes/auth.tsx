import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta = () => {
  [
    { title: "Resumeval | Auth" },
    { name: "description", content: "Log into your account" },
  ];
};

const auth = () => {
  // usestate declared in puter.js
  const { isLoading, auth } = usePuterStore();
  // this hook returns the current location object
  const location = useLocation();
  // get the next parameter from the URL
  const next = location.search.split("next=")[1];
  // navigate hook to redirect
  const navigate = useNavigate();

  // useeffect to redirect if authenticated
  useEffect(() => {
    if(auth.isAuthenticated) {
        navigate(next);
    }
  }, [auth.isAuthenticated, next]);
  return (
    <main className='bg-[url("/images/bg-auth.svg")] bg-cover min-h-screen flex items-center justify-center'>
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1>Welcome</h1>
            <h2>Log in to Continue your Job Journey</h2>
          </div>
          <div>
            {isLoading ? (
              <button className="auth-button animate-pulse">
                <p>Signing you in...</p>
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <button className="auth-button" onClick={auth.signOut}>
                    <p>Log Out</p>
                  </button>
                ) : (
                  <button className="auth-button" onClick={auth.signIn}>
                    <p>Log In</p>
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default auth;
