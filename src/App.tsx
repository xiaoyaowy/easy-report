import * as React from "react"
import 'tdesign-react/es/style/index.css';
import ReportList from "./components/ReportList";
import {useEffect, useState} from "react";
import SqlEdit from "./components/SqlEdit";
import ReportDetail from "./components/ReportDetail";

const App: React.FC = () => {
  const [id, setId] = useState('');
  const [edit, setEdit] = useState(true);
  const [report, setReport] = useState({} as any);

  return (
    <>
      {id == '' && <ReportList open={setId} />}
      {id != '' && <ReportDetail id={id} back={setId} report={setReport} />}
      {edit && <SqlEdit/>}
    </>
  )
}
export default App
