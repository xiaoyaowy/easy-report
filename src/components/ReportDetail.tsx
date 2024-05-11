import {useEffect, useState} from "react";
import {Button, Divider} from "tdesign-react";
import axios from "axios";
import TableSingle from "./ReportTable";
import {generateColumns} from "../utils/handleColumns";

function ReportDetail(props: any) {
    const { id, back, report } = props;
    const initData: any = [];
    const [columns, setColumns] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const {data: result} = await axios.post('http://127.0.0.1:6006/api/v1/report/detail', { id });
            console.log(result.data)
            const {columns, name, reportText} = result.data;
            report({columns, name, reportText})
            setColumns(generateColumns(columns));
        }

        fetchData()
    }, []);

    return (
      <div>
          <div><Button onClick={() => back('')}>返回</Button></div>
          <Divider/>
          <TableSingle columns={columns} initData={initData} />
      </div>
    );
}

export default ReportDetail;