  import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const ProtectedRoute =({children})=>{
  const navigate = useNavigate();

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (!user) {
    navigate('/signup')
    }
  });
  return children
}
export default ProtectedRoute;