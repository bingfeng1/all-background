/**
 * 设置后端定时任务，通过后端是否保存定时任务的timer决定
 */
import React, { useState, useEffect } from 'react'
import { Button, Card, Table } from 'antd';
import { reqGetTimedTask, reqUpdateTimedTask } from '../../api';

const TimedTask = () => {
    // 页面初始化，添加任务（只能通过后端添加）
    const [task, setTask] = useState([])

    useEffect(() => {
        reqGetTimedTask().then(res => {
            if (res.status === 200) {
                setTask(res.data)
            }
        })
    }, [])

    const columns = [
        {
            title: '任务名称',
            dataIndex: 'name'
        },
        {
            title: '描述',
            dataIndex: 'desc'
        },
        {
            title: '操作',
            dataIndex: '',
            render: (text) => (
                <>
                    <Button
                        type={text.flag ? 'danger' : 'primary'}
                        onClick={() => startOrStop(text)}>
                        {text.flag ? '停止' : '开始'}
                    </Button>
                </>
            ),
        },
    ]

    // 添加或者修改链接
    const startOrStop = async (data) => {
        const { _id, name, flag } = data
        const result = await reqUpdateTimedTask({ _id, flag, name })
        console.log(result)
        reqGetTimedTask().then(res => {
            if (res.status === 200) {
                setTask(res.data)
            }
        })
    }

    return (
        <Card className="background_extend_link">
            <Table
                bordered
                rowKey="_id"
                columns={columns}
                dataSource={task} />
        </Card>
    )
}

export default TimedTask