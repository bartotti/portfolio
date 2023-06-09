import { useState } from "react";
import PasswordForm from "../components/PasswordForm";

const ProtectedPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handlePasswordSubmit = password => {
    const correctPassword = process.env.NEXT_PUBLIC_PASSWORD;
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  return (
    <div>
      {!isAuthenticated ? (
        <PasswordForm onPasswordSubmit={handlePasswordSubmit} />
      ) : (
        <h1>Hello this is after you enter the password</h1>
      )}
    </div>
  );
};

export default ProtectedPage;
