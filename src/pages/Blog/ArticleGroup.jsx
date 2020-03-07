import React, { useState, useEffect } from 'react'
import { Card, Table, Row, Col, Button, Icon, Modal, Form, Input } from 'antd'
import { connect } from "react-redux";
import { getArticleGroupAction, deleteArticleGroupAction, addOrUpdateArticleGroupAction } from "../../store/actionCreator/blogAction";

const ArticleGroup = (
    {
        form,   // antd的form
        articleGroup,   // redux使用的articleGroup（这里进行测试使用，主要在写文章的地方使用）
        getArticleGroup,
        addOrUpdateArticleGroup,
        deleteArticleGroup
    }
) => {
    // 表单数据
    const { getFieldDecorator, getFieldsValue, resetFields } = form

    useEffect(() => {
        // 获取分组信息
        if (articleGroup.length === 0) {
            getArticleGroup()
        }
    }, [])

    // 是否显示弹层
    const [visible, setVisible] = useState(false)

    // 需要修改的分组
    const [editArticleGroup, setEditArticleGroup] = useState({})

    const columns = [
        {
            title: '分类名称',
            dataIndex: 'name'
        },
        {
            title: '顺序',
            dataIndex: 'sort'
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
                    <Button type="danger" onClick={() => deleteArticleGroup(text)}>
                        删除
                    </Button>
                </>
            ),
        },
    ]

    // 添加或者修改分组
    const addOrUpdateGroup = (data) => {
        // 如果有参数传入，那就是修改
        if (data) {
            setEditArticleGroup(data)
        } else {
            // 没有参数，就是增加
            setEditArticleGroup({})
        }
        setVisible(true)
    }

    // 点击确认
    const handleOk = async () => {
        // 获取表单的值
        let result = getFieldsValue()
        // 这里判断是否有editArticleGroup，如果有，那就是修改
        !!editArticleGroup._id && (result._id = editArticleGroup._id)
        addOrUpdateArticleGroup(result)
        // 清空表单
        resetFields()
        setVisible(false)
    }

    const handleCancel = () => {
        resetFields()
        setVisible(false)
    }

    return (
        <Card className="blog_article_group">
            <Table
                bordered
                rowKey="_id"
                columns={columns}
                dataSource={articleGroup} />
            <Modal
                title="添加分组名称"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}>
                <Form>
                    <Form.Item>
                        {
                            getFieldDecorator('name', {
                                initialValue: editArticleGroup.name
                            })(
                                <Input placeholder="分类名称" />
                            )
                        }
                    </Form.Item>
                    <Form.Item>
                        {
                            getFieldDecorator('sort', {
                                initialValue: editArticleGroup.sort
                            })(
                                <Input placeholder="分类排序" />
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
        articleGroup: state.articleGroup
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getArticleGroup: async () => {
            const action = await getArticleGroupAction()
            dispatch(action)
        },
        addOrUpdateArticleGroup: async (data) => {
            const action = await addOrUpdateArticleGroupAction(data)
            dispatch(action)
        },
        deleteArticleGroup: async (data) => {
            const { _id } = data
            const action = await deleteArticleGroupAction(_id)
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ArticleGroup))