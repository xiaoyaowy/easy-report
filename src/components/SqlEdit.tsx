import {useEffect, useState} from "react";
import {Button, Input, Textarea} from "tdesign-react";
import axios from "axios";

function SqlEdit() {
  const [sql, setSql] = useState('');

  const [input, setInput] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.post('http://127.0.0.1:6006/api/v1/report/list', {  });
      console.log(res)
    }

    fetchData()
  }, []);
  const execute = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:6006/api/v1/test/sql', { name: input, sql: sql });
      // setResult(res.data);
      console.log(res)
    } catch (e: any) {
    }
  };

  return (
    <div>
      <Input value={input} onChange={e => setInput(e)} />
      <Textarea value={sql} onChange={(e) => setSql(e)} />
      <Button onClick={execute}>保存</Button>
    </div>
  );
}

export default SqlEdit;