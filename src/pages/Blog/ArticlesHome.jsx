// 博客文章主页面
import React, { useState, useEffect } from 'react'
import { Card, Table, PageHeader, Button, Icon } from 'antd'
import { reqArticles } from '../../api'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getArticleGroupAction } from '../../store/actionCreator/blogAction'
import { dateFormat } from '../../utils/dateFormat';

const ArticlesHome = ({
    articleGroup,
    getArticleGroup
}) => {
    // 文章列表
    const [articles, setArticles] = useState([])

    // 获取文章列表
    useEffect(() => {
        getArticles()
        // 获取分组信息
        if (articleGroup.length === 0) {
            getArticleGroup()
        }
    }, [])

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
            render:(text)=>{
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
            render:(text)=>{
                return (
                    <img src={text} alt={text} style={{maxWidth:'200px'}}/>
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
            render: () => (
                <>
                    <Button type="dashed" style={{ marginRight: '10px' }}>
                        修改
                    </Button>
                    <Button type="danger">
                        删除
                    </Button>
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