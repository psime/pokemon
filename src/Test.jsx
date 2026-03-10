import React from 'react';

function App() {
  React.useEffect(() => {
    console.log('Effect ran');
    return () => console.log('Cleanup ran');
  }, []);

  return <h1>Hello Strict Mode</h1>;
}

export default function Root() {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}