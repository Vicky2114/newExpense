/* eslint-disable no-restricted-globals */
import React, { useEffect } from 'react';
 const useDisableBackButton = () => {
        useEffect(() => {
          const disableBackButton = (event) => {
            history.pushState(null, null, document.URL);
          };
      
          // Disable the back button
          window.history.pushState(null, null, document.URL);
          window.addEventListener('popstate', disableBackButton);
      
          return () => {
            // Cleanup the event listener when the component unmounts
            window.removeEventListener('popstate', disableBackButton);
          };
        }, []);
      };
      const PageNotFound = () => {
      useDisableBackButton();

  return (
    <div>
      {/* Your component content */}
      <h1>404 not found</h1>
    </div>
  );
};

export default PageNotFound;
