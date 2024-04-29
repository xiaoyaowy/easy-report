import {useEffect} from "react";
import {Button} from "tdesign-react";
import axios from "axios";

function ReportDetail(props: any) {
    const { id, back } = props;
    // const []
    useEffect(() => {
        console.log(id)
        const fetchData = async () => {
            const res = await axios.post('http://127.0.0.1:6006/api/v1/report/detail', { id });
            console.log(res)
        }

        fetchData()
    }, []);

    return (
      <div>
          <div><Button onClick={back('')}>返回</Button></div>
          {id}
      </div>
    );
}

export default ReportDetail;