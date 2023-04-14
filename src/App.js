import { Routes, Route } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import Home from './components/Home';
import Layout from './components/Layout';
import Editor from './components/Editor';
import Missing from './components/Missing';
import Lounge from './components/Lounge';
import Admin from './components/Admin';
import Unauthorized from './components/Unauthorized';
import LinkPage from './components/LinkPage';
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* protected routes */}
        <Route element={<RequireAuth allowedRoles={[2001]} />}>
          <Route path="/" element={<Home />} />
        </Route>  
        <Route element={<RequireAuth allowedRoles={[1984]} />}>
          <Route path="editor" element={<Editor />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[5150]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[1984, 5150]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route>


        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
