import React, { useState, useEffect } from 'react'
import { Card, Avatar, Table, Row, Col, Button, Modal, Icon, message } from 'antd'
import { reqEditor, reqUpdateEditor } from '../../api';
import UpdateEditorForm from './UpdateEditorForm';

// 表格标题
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
    const [myUploadAvatar, setMyUploadAvatar] = useState(undefined)
    let myForm;

    useEffect(() => {
        // 异步获取信息
        getEditor()
    }, [])

    // 获取个人信息
    const getEditor = async () => {
        const result = await reqEditor()
        const { data } = result
        if (data.status !== 403) {
            setEditor(data)
        }
    }

    // 展示修改个人信息框
    const showModal = () => {
        setVisible(true)
    }

    const setAvatar = (file) => {
        setMyUploadAvatar(file)
    }

    // 确认修改个人信息
    const handleOk = async () => {
        const { name } = myForm.getFieldsValue()
        let param = new FormData()
        param.append('_id', editor._id)
        param.append('name', name)
        // 获取其他头像信息

        if (myUploadAvatar) {
            // 随机id
            const { uid, name: imgName } = myUploadAvatar
            // 获取扩展名
            const ext = imgName.split('.')[1]
            param.append('imgName', `${uid}.${ext}`)
            param.append('avatar', myUploadAvatar)
        }

        const { data } = await reqUpdateEditor(param)
        if (data.status !== 403) {
            message.success('个人信息更新成功')
        }
        if (data.status === 200) {
            // 更新界面
            getEditor()
        }
        setVisible(false)
    }

    // 取消修改个人信息
    const handleCancel = () => {
        myForm.resetFields()
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
                    setForm={(form) => { myForm = form }}
                    setMyUploadAvatar={setAvatar}>
                </UpdateEditorForm>
            </Modal>
        </Card >
    )
}

export default Editor