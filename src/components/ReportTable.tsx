import React, { useState } from 'react';
import { Table, Button, DateRangePickerPanel, Space, Tag } from 'tdesign-react';

const columns: any = [
    { colKey: 'applicant', title: '申请人', width: 100, foot: '-' },
    {
        title: '签署方式',
        colKey: 'channel',
        // 多选过滤配置
        filter: {
            type: 'multiple',
            resetValue: [],
            list: [
                { label: 'All', checkAll: true },
                { label: '电子签署', value: '电子签署' },
                { label: '纸质签署', value: '纸质签署' },
            ],
            // 是否显示重置取消按钮，一般情况不需要显示
            showConfirmAndReset: true,
        },
    },
    {
        title: 'Email',
        colKey: 'email',
        // 输入框过滤配置
        filter: {
            type: 'input',

            // 文本域搜索
            // component: Textarea,

            resetValue: '',
            // 按下 Enter 键时也触发确认搜索
            confirmEvents: ['onEnter'],
            props: { placeholder: '输入关键词过滤' },
            // 是否显示重置取消按钮，一般情况不需要显示
            showConfirmAndReset: true,
        },
    },
    {
        title: 'Date',
        colKey: 'createTime',
        // 用于查看同时存在排序和过滤时的图标显示是否正常
        sorter: true,
        // 自定义过滤组件：日期过滤配置，请确保自定义组件包含 value 和 onChange 属性
        filter: {
            type: 'custom',
            component: DateRangePickerPanel,
            props: {
                firstDayOfWeek: 7,
            },
            style: { fontSize: '14px' },
            classNames: 'custom-class-name',
            attrs: { 'data-type': 'DateRangePickerPanel' },
            // 是否显示重置取消按钮，一般情况不需要显示
            showConfirmAndReset: true,
            // 日期范围是一个组件，重置时需赋值为 []
            resetValue: [],
        },
    },
];

// const initData = new Array(5).fill(null).map((_, i) => ({
//     key: String(i + 1),
//     applicant: ['贾明', '张三', '王芳'][i % 3],
//     status: i % 3,
//     channel: ['电子签署', '纸质签署', '纸质签署'][i % 3],
//     email: ['w.cezkdudy@lhll.au', 'r.nmgw@peurezgn.sl', 'p.cumx@rampblpa.ru'][i % 3],
//     matters: ['宣传物料制作费用', 'algolia 服务报销', '相关周边制作费', '激励奖品快递费'][i % 4],
//     time: [2, 3, 1, 4][i % 4],
//     createTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
// }));

export default function TableSingle(props: any) {
    const { columns, initData } = props;
    const [data, setData] = useState(initData);
    const [filterValue, setFilterValue] = useState({});

    const request = (filters: any) => {
        const timer = setTimeout(() => {
            clearTimeout(timer);
            const newData = initData.filter((item: any) => {
                let result = true;
                if (result && filters.channel && filters.channel.length) {
                    result = filters.channel.includes(item.channel);
                }
                if (result && filters.email) {
                    result = item.email.indexOf(filters.email) !== -1;
                }
                if (result && filters.createTime && filters.createTime.length) {
                    result = item.createTime === filters.createTime;
                }
                return result;
            });
            setData(newData);
        }, 100);
    };

    function onFilterChange(filters: any, col: any) {
        console.log(filters, col);
        setFilterValue({
            ...filters,
            createTime: filters.createTime || [],
            lastName: filters.lastName || [],
        });
        // 在此处理过滤数据效果，以达到更真实的过滤效果
        request(filters);
    }

    function onChange(info: any, context: any) {
        console.log('onChange', info, context);
    }

    return (
        <Space direction="vertical">
            <Space direction="horizontal" align="center">
                <Button
                    onClick={() => {
                        setFilterValue({});
                        setData([...initData]);
                    }}
                >
                    清空已筛选
                </Button>
                <span>已选筛选条件：{JSON.stringify(filterValue)}</span>
            </Space>
            <Table
                rowKey="key"
                data={data}
                columns={columns}
                filterValue={filterValue}
                // defaultFilterValue={filterValue}
                onFilterChange={onFilterChange}
                onChange={onChange}
                // filterRow={() => null}
                // 非受控写法
                pagination={{
                    defaultCurrent: 1,
                    defaultPageSize: 5,
                    showJumper: true,
                    pageSizeOptions: [1, 3, 5, 10],
                }}
                lazyLoad
            />
        </Space>
    );
}
