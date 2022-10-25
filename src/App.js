import logo from './logo.svg';
import './App.css';
import firebaseJson from "./firebase.json";
import { AuthProvider } from './lib';

function App() {
    return (
      <AuthProvider firebaseConfig={firebaseJson.config}>

      </AuthProvider>
    )
}

export default App;
