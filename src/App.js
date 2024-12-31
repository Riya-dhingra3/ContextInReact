import logo from './logo.svg';
import { useReducer, useState, useContext, useRef ,useMemo} from "react";
import _ from "lodash";
import './App.css';
import userContext from './context/userContext';
import Oone from './oone';

const Action = {
  ADDTODO: "addtodo"
};

const reducer = (state, action) => {
  switch (action.type) {
    case Action.ADDTODO: {
      return [...state, action.payload.query];
    }
    default: 
      return state;
  }
};

function App() {
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");
  const [number,setnumber] = useState(0);
  const [count,setcount] = useState(0);
  const [todo, dispatch] = useReducer(reducer, []);

  const usercontext = useContext(userContext);

  if (!usercontext) {
    throw new Error("useContext must be used within a UserContextProvider");
  }

  const { user, setuser } = usercontext;

  const handlesetuser = () => {
    setuser(query);
  }

  const debounceFunction = _.debounce((text) => {
    setText(text);
  }, 3000);

  const btnref=useRef();

  const handleClick = () => {
    dispatch({ type: Action.ADDTODO, payload: { query } });
    setQuery("");
    btnref.current.style.backgroundColor="red"
    setTimeout(() => {
      btnref.current.style.backgroundColor = "";
    }, 500);
  
  }
  const handleInput = (event) => {
    setQuery(event.target.value);
    debounceFunction(event.target.value);
  };

  const square = useMemo(()=>{
    console.log("I am in a memoized Function");
    return number*number;
  },[number]);

  return (
    <div className="App">
      <input 
        value={query}
        onChange={handleInput}
      />
      <button ref={btnref} onClick={handleClick}>Submit</button>
      <button onClick={handlesetuser}>Set User</button>
      {user ? <p>{user}</p> : <p>No user reciieved</p>}
      <div>
      {todo.map((item, index) => <p key={index}>{item}</p>)}
      </div>
      <Oone query={query}/>
      <button onClick={()=>setcount(count+1)}>Re-render</button>
      <p>Re render count:{count}</p>
      <input
          type="number"
          value={number}
          onChange={(e)=>setnumber(e.target.value)}
      />
      <p>Square : {square}</p>
    </div>
  );
}

export default App;
