import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, List, Space} from "tdesign-react";
import ListItem from "tdesign-react/es/list/ListItem";

function ReportList(props: any) {
    const {open} = props;
    const [list, setList] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.post('http://127.0.0.1:6006/api/v1/report/list', {  });
            setList(res.data.data)
        }

        if (list.length == 0) fetchData();
    }, [list]);

    function getReport(id: any) {
        console.log(id)
        open(id)
    }

    return (
        <div>
            <List>
                {list.length > 0 && list.map((item: any, index) => {
                    return (
                        <ListItem key={index} action={
                            <Space>
                                <Link theme="primary" hover="color" onClick={() => getReport(item.id)} >查看</Link>
                            </Space>
                        }>{item.name || "没有Name"}</ListItem>
                    )
                })}
            </List>
        </div>
    );
}

export default ReportList;