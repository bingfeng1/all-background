// 博客文章主页面
import React, { useState, useEffect } from 'react'
import { Card, Table, PageHeader, Button, Icon, Popconfirm, message } from 'antd'
import { reqArticles, reqDeleteArticle } from '../../api'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getArticleGroupAction } from '../../store/actionCreator/blogAction'
import { dateFormat } from '../../utils/dateFormat';

const ArticlesHome = ({
    articleGroup,
    getArticleGroup,
    history
}) => {
    // 文章列表
    const [articles, setArticles] = useState([])

    // 获取文章列表
    useEffect(() => {
        getArticles()
    }, [])

    // 获取分组信息
    if (articleGroup.length === 0) {
        getArticleGroup()
    }

    // 表格表头
    const columns = [
        {
            title: '标题',
            dataIndex: 'title'
        }, {
            title: '分类',
            dataIndex: 'group',
            render: (text) => {
                return (
                    <span>
                        {
                            articleGroup.find(value => value._id === text)?.name
                        }
                    </span>
                )
            }
        }, {
            title: '发布日期',
            dataIndex: 'date',
            render: (text) => {
                return (
                    <span>
                        {
                            dateFormat(text).getYearMonthDate
                        }
                    </span>
                )
            }
        }, {
            title: '展示大图',
            dataIndex: 'img',
            render: (text) => {
                return (
                    <img src={text} alt={text} style={{ maxWidth: '200px' }} />
                )
            }
        }, {
            title: '是否置顶',
            dataIndex: 'isTop',
            render: (text) => {
                return (
                    <span>
                        {text ? '是' : '否'}
                    </span>
                )
            }
        }, {
            title: '访问数量',
            dataIndex: 'customerNum'
        },
        {
            title: '操作',
            dataIndex: '',
            render: (text) => (
                <>
                    <Button
                        type="dashed"
                        style={{ marginRight: '10px' }}
                        onClick={() => updateArticle(text)}>
                        修改
                    </Button>
                    <Popconfirm
                        title="确认删除吗"
                        icon={<Icon type="exclamation-circle" style={{ color: 'red' }} />}
                        onConfirm={() => deleteArticle(text)}
                        okText="是的"
                        cancelText="点错了，不删">
                        <Button
                            type="danger"
                        >
                            删除
                    </Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    const getArticles = async () => {
        // 获取文章结果
        const { data } = await reqArticles()
        setArticles(data)
    }

    // 添加文章按钮
    const AddArticle = () => {
        return (
            <Link to="/blog/articles/addupdate">
                <Button type="primary">
                    <Icon type="plus" />
                    新增文章
                </Button>
            </Link>
        )
    }

    // 删除文章
    const deleteArticle = async (text) => {
        const { _id } = text
        const { data } = await reqDeleteArticle(_id)
        if (data.status !== 403) {
            message.success('删除文章成功')

        }
        if (data.status === 500) {
            message.error('删除图片失败')
        }
        // 重新获取文章列表
        getArticles()
    }

    // 更新文章
    const updateArticle = (text) => {
        // 将参数传给另一个页面
        history.push({ pathname: '/blog/articles/addupdate', state: text })
    }

    return (
        <Card>
            <PageHeader
                style={{
                    border: 0,
                    paddingTop: 0,
                    paddingLeft: 0
                }}
                title="博客文章列表"
                extra={AddArticle()}
            />
            <Table
                bordered
                dataSource={articles}
                columns={columns}
                expandedRowRender={record => <p style={{ margin: 0 }}>{record.desc}</p>}
                rowKey="_id">

            </Table>
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesHome)