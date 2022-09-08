import { BrowserRouter, Route, Routes} from "react-router-dom";
import {
  Navbar,
  Dashboard,
  Blog,
  Item,
  Login,
  Error,
  ProtectedRoute,
  AllBlogs,
  CreateBlog,
  Profile
} from "./pages/index";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Dashboard />} />
          <Route path="blog" element={<ProtectedRoute />}>
            <Route index element={<AllBlogs />} />
            <Route path=":username" element={<Blog />} />
            <Route path=":username/:id" element={<Item />} />
            <Route path="create">
              <Route index element={<CreateBlog />} />
              <Route path=":id" element={<CreateBlog hideUpdate={false} />} />
            </Route>
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
        <Route path="/auth" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
