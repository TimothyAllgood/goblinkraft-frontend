import React, { useEffect, useState } from "react";
import "./Home.css";
import { useAuth0 } from "@auth0/auth0-react";

function Home() {
  // const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
  //   useAuth0();
  // const [token, setToken] = useState(null);

  // useEffect(() => {
  //   const getToken = async () => {
  //     const token = await getAccessTokenSilently();
  //     setToken(token);
  //   };
  //   getToken();
  // }, [getAccessTokenSilently]);

  // if (isLoading) {
  //   return <div>Loading ...</div>;
  // }

  return (
    <div>
      Home Page
      {/* {isAuthenticated && (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{token}</p>
        </div>
      )} */}
    </div>
  );
}

export default Home;
