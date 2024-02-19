import React from 'react';
import { useWeb3React } from '@web3-react/core';

function LoginButton() {
  const { account, activate, deactivate } = useWeb3React();

  const handleLogin = () => {
    activate(injectedConnector); // Use the injected connector (MetaMask)
  };

  const handleLogout = () => {
    deactivate();
  };

  return (
    <div>
      {account ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login with MetaMask</button>
      )}
    </div>
  );
}

export default LoginButton;