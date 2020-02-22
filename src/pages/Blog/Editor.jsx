import React, { useState, useEffect } from 'react'
import { Card, Avatar, Table, Row, Col, Button, Modal, Icon } from 'antd'
import { reqEditor } from '../../api';
import UpdateEditorForm from './UpdateEditorForm';

const columns = [
    {
        title: '图标特定名称',
        dataIndex: 'icon',
        key: 'icon',
    },
    {
        title: '是否为阿里图标库',
        dataIndex: 'iconfont',
        key: 'iconfont',
        render: text => text ? '是' : '否'
    },
    {
        title: (
            <Row
                type="flex"
                align="middle"
                justify="space-between"
                style={{ minWidth: "200px" }}>
                <Col>
                    外链地址
                </Col>
                <Col>
                    <Button type="primary" size="small">
                        <Icon type="plus" />
                    </Button>
                </Col>
            </Row>
        ),
        dataIndex: 'url',
        key: 'url',
    },
];

const Editor = () => {
    const [editor, setEditor] = useState({})
    const [visible, setVisible] = useState(false)
    let myForm;

    useEffect(() => {
        // 异步获取信息
        getEditor()
    }, [])

    const getEditor = async () => {
        const result = await reqEditor()
        const { data } = result
        setEditor(data)
    }

    const showModal = () => {
        setVisible(true)
    }

    const handleOk = () => {
        console.log(myForm,myForm.getFieldsValue())
        setVisible(false)
    }

    const handleCancel = () => {
        setVisible(false)
    }

    const { avatar, name, customerNum, socialContact } = editor;

    return (
        < Card
            title="个人信息"
            bordered={false} >
            <Row
                type="flex"
                align="middle"
                justify="space-around"
                className="editor-info">
                <Col>
                    <Avatar
                        size={100}
                        src={avatar}>
                    </Avatar>
                </Col>
                <Col>
                    {name}
                </Col>
                <Col>
                    总访问次数：{customerNum}
                </Col>
                <Col>
                    <Button
                        type="primary"
                        onClick={showModal}>
                        修改个人信息
                    </Button>
                </Col>
            </Row>
            <Table
                dataSource={socialContact}
                columns={columns}
                rowKey="_id"
                bordered
            >

            </Table>
            <Modal
                title="修改个人信息"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}>
                <UpdateEditorForm
                    name={name}
                    avatar={avatar}
                    setForm={(form) => { myForm = form }}>
                </UpdateEditorForm>
            </Modal>
        </Card >
    )
}

export default Editor