// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import FormPage from './Components/FormPage';
// import SecondPage from './Components/SecondPage';


// const App: React.FC = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<FormPage />} />
//         <Route path="/second" element={<PrivateRoute />}>
//           <Route path="/second" element={<SecondPage />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// };

// const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
//   const userDetails = localStorage.getItem('userDetails');
//   return userDetails ? children : <Navigate to="/SecondPage" />;
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormPage from './Components/FormPage';
import SecondPage from './Components/SecondPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/second-page" element={<SecondPage />} />
      </Routes>
    </Router>
  );
};

export default App;

