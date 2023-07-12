import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GetEveningSet } from "containers/GetEveningSet";
import { MoviesList } from "containers/MoviesList";
import { Drink } from "containers/Drink";
import { SignUp } from "containers/SignUp";
import { SignIn } from "containers/SignIn";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetEveningSet />} />
        <Route path="/movies-list" element={<MoviesList />} />
        <Route path="/drink" element={<Drink />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
