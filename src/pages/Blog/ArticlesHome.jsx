// 博客文章主页面
import React, { useState, useEffect } from 'react'
import { Card, Table, PageHeader, Button, Icon } from 'antd'
import { reqArticles } from '../../api'
import { Link } from 'react-router-dom'

const ArticlesHome = () => {
    // 文章列表
    const [articles, setArticles] = useState([])

    // 获取文章列表
    useEffect(() => {
        getArticles()
    }, [])

    // 表格表头
    const columns = [
        {
            title: '标题',
            dataIndex: 'title'
        }, {
            title: '分类',
            dataIndex: 'group'
        }, {
            title: '发布日期',
            dataIndex: 'date'
        }, {
            title: '展示大图',
            dataIndex: 'img'
        }, {
            title: '是否置顶',
            dataIndex: 'isTop'
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
        console.log(data)
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

export default ArticlesHome