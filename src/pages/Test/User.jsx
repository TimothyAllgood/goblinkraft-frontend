import React, { useEffect, useState } from "react";
import User from "../../services/user.service";

function UserProtected() {
  const [authorized, setAuthorized] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      let res = await User.getUser();
      setAuthorized(true);
      setData(res);
    } catch (error) {
      setAuthorized(false);
      console.log(error);
    }
  };
  if (!authorized) return <div>Not Authorized</div>;
  return <div>{data}</div>;
}

export default UserProtected;
