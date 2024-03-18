import React, { useEffect, useState } from "react";
import { profile, getCurrentUser } from "../services/userAuthService";

const Profile: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [token, setToken] = useState<any>(null);

  useEffect(() => {
    const fetchProfileAndToken = async () => {
      const user = await profile();
      const userToken = getCurrentUser();
      setCurrentUser(user);
      setToken(userToken);
    };
    fetchProfileAndToken();
  }, []);


  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser?.username} 's</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {token?.token.substring(0, 20)} ...{" "}
        {token?.token.substr(token?.token.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser?.id}
      </p>
      <p>
        <strong>Username:</strong> {currentUser?.username}
      </p>
      <strong>Role:</strong>
      <ul>
        {currentUser?.role != 'admin'? "- Regular User" : "- Admin User"}
      </ul>
    </div>
  );
};

export default Profile;