import React, { useContext, useState } from 'react';

const SidebarContext = React.createContext();

export const SidebarProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState(false);

  return (
    <SidebarContext.Provider
      value={{
        sidebarState: sidebar,
        openSidebar: () => setSidebar(true),
        closeSidebar: () => setSidebar(false),
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);
