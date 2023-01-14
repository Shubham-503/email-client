import './App.css';
import Email from './components/Email';
import EmailActive from './components/EmailActive';

function App() {
  return (
    <div className="app">
      <div className="emails">

      <Email />
      <Email />
      </div>
      <EmailActive/>
    </div>
  );
}

export default App;
