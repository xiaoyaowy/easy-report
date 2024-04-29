import * as React from "react"
import 'tdesign-react/es/style/index.css';
import ReportList from "./components/ReportList";
import {useState} from "react";
import SqlEdit from "./components/SqlEdit";
import ReportDetail from "./components/ReportDetail";

const App: React.FC = () => {
  const [id, setId] = useState('');
  const [edit, setEdit] = useState(false);
  return (
    <>
      {id == '' && <ReportList open={setId} />}
      {id != '' && <ReportDetail id={id} back={setId} />}
      {edit && <SqlEdit/>}
    </>
  )
}
export default App
