import React from 'react';

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps) => {
  return <>{children}</>;
};

export default AppProviders;
