import React, { useState, useEffect } from 'react'
import { Card, Table, Row, Col, Button, Icon, Modal, Form, Input, message } from 'antd'
import { reqAddArticleGroup, reqArticleGroup } from '../../api'
import { connect } from "react-redux";
import { getArticleGroupAction, addArticleGroupAction, deleteArticleGroupAction } from "../../store/actionCreator/blogAction";

const ArticleGroup = (
    {
        form,   // antd的form
        articleGroup,   // redux使用的articleGroup（这里进行测试使用，主要在写文章的地方使用）
        getArticleGroup,
        addArticleGroup,
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
                        <Button type="primary" size="small" onClick={() => addGroup()}>
                            <Icon type="plus" />
                        </Button>
                    </Col>
                </Row>
            ),
            dataIndex: '',
            render: (text) => (
                <>
                    <Button type="dashed" style={{ marginRight: '10px' }}>
                        修改
                    </Button>
                    <Button type="danger" onClick={() => deleteArticleGroup(text)}>
                        删除
                    </Button>
                </>
            ),
        },
    ]

    // 添加分组
    const addGroup = () => {
        setVisible(true)
    }

    // 点击确认
    const handleOk = async () => {
        const result = getFieldsValue()
        const { data } = await reqAddArticleGroup(result)
        if (data) {
            const { _id, name, sort } = data[0]
            addArticleGroup({ _id, name, sort })
            setVisible(false)
        } else {
            message.error('提交分类失败')
        }
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
                            getFieldDecorator('name')(
                                <Input placeholder="分类名称" />
                            )
                        }
                    </Form.Item>
                    <Form.Item>
                        {
                            getFieldDecorator('sort')(
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
        getArticleGroup() {
            reqArticleGroup().then(res => {
                const action = getArticleGroupAction(res.data)
                dispatch(action)
            })
        },
        addArticleGroup(data) {
            const action = addArticleGroupAction(data)
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