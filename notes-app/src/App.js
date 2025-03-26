import NotesList from "./components/NotesList";
import { useState } from "react";
import { nanoid } from "nanoid";

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "This is first notes!!",
      date: "01/01/2021"
    },
    {
      id: nanoid(),
      text: "This is 2 notes!!",
      date: "01/01/2021"
    },
    {
      id: nanoid(),
      text: "This is 3 notes!!",
      date: "01/01/2021"
    },
    {
      id: nanoid(),
      text: "This is 4 notes!!",
      date: "01/01/2021"
    },
    {
      id: nanoid(),
      text: "This is 5 notes!!",
      date: "01/01/2021"
    },
  ]);
  return <div className="container">
    <NotesList notes={notes}/>
  </div>;
}

export default App;