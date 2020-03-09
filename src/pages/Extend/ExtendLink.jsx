/**
 * 扩展链接功能，由于全局其他地方也有需要，所以这个可以放在react-redux中
 */
import React, { useState } from 'react'
import { connect } from "react-redux";
import { Row, Col, Button, Icon, Card, Table, Modal, Form, Input } from 'antd';
import { getExtendLinkAction, addExtendLinkAction, updateExtendLinkAction, deleteExtendLinkAction } from '../../store/actionCreator/extendLinkAction';

const ExtendLink = (
    {
        form,   // antd的form
        extendLink,   // redux使用的ExtendLink（这里进行测试使用，主要在写文章的地方使用）
        getExtendLink,
        addExtendLink,
        updateExtendLink,
        deleteExtendLink
    }
) => {
    // 表单数据
    const { getFieldDecorator, getFieldsValue, resetFields } = form

    // 获取链接信息
    if (extendLink.length === 0) {
        getExtendLink()
    }

    // 是否显示弹层
    const [visible, setVisible] = useState(false)

    // 需要修改的链接
    const [editExtendLink, setEditExtendLink] = useState({})

    const columns = [
        {
            title: '链接名称',
            dataIndex: 'name'
        },
        {
            title: '链接地址',
            dataIndex: 'url'
        },
        {
            title: (
                <Row
                    type="flex"
                    align="middle"
                    justify="space-between">
                    <Col>
                        操作
                </Col>
                    <Col>
                        <Button type="primary" size="small" onClick={() => addOrUpdateGroup()}>
                            <Icon type="plus" />
                        </Button>
                    </Col>
                </Row>
            ),
            dataIndex: '',
            render: (text) => (
                <>
                    <Button
                        type="dashed"
                        style={{ marginRight: '10px' }}
                        onClick={() => addOrUpdateGroup(text)}>
                        修改
                </Button>
                    <Button type="danger" onClick={() => deleteExtendLink(text)}>
                        删除
                </Button>
                </>
            ),
        },
    ]

    // 添加或者修改链接
    const addOrUpdateGroup = (data) => {
        // 如果有参数传入，那就是修改
        if (data) {
            setEditExtendLink(data)
        } else {
            // 没有参数，就是增加
            setEditExtendLink({})
        }
        setVisible(true)
    }

    // 点击确认
    const handleOk = async () => {
        // 获取表单的值
        let result = getFieldsValue()
        // 这里判断是否有editExtendLink，如果有，那就是修改
        const flag = (!!editExtendLink._id)
        if (flag) {
            // 更新操作
            result._id = editExtendLink._id
            updateExtendLink(result)
        } else {
            // 添加操作
            addExtendLink(result)
        }
        // 清空表单
        resetFields()
        setVisible(false)
    }

    const handleCancel = () => {
        resetFields()
        setVisible(false)
    }

    return (
        <Card className="background_extend_link">
            <Table
                bordered
                rowKey="_id"
                columns={columns}
                dataSource={extendLink} />
            <Modal
                title="添加链接名称"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}>
                <Form>
                    <Form.Item>
                        {
                            getFieldDecorator('name', {
                                initialValue: editExtendLink.name
                            })(
                                <Input placeholder="链接名称" />
                            )
                        }
                    </Form.Item>
                    <Form.Item>
                        {
                            getFieldDecorator('url', {
                                initialValue: editExtendLink.url
                            })(
                                <Input placeholder="链接地址" />
                            )
                        }
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    )
}


const mapStateToProps = state => {
    return {
        extendLink: state.extendLink
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getExtendLink: async () => {
            const action = await getExtendLinkAction()
            dispatch(action)
        },
        addExtendLink: async (data) => {
            const action = await addExtendLinkAction(data)
            dispatch(action)
        },
        updateExtendLink: async (data) => {
            const action = await updateExtendLinkAction(data)
            dispatch(action)
        },
        deleteExtendLink: async (data) => {
            const { _id } = data
            const action = await deleteExtendLinkAction(_id)
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ExtendLink))