import React, { useState } from 'react'
import { connect } from "react-redux";
import { Input, Select, Form, DatePicker, Upload, message, Button, Icon, Switch } from 'antd'
import marked from 'marked'
import moment from 'moment';
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import { dateFormat } from '../../utils/dateFormat';
import { reqAddArticle, reqArticleDetail, reqUpdateArticle } from '../../api';
import { getArticleGroupAction } from '../../store/actionCreator/blogAction';

const { TextArea } = Input
const { Option } = Select

const ArticlesAddUpdate = (props) => {
    // 通过Form.create获取
    const { form, articleGroup, getArticleGroup, location } = props
    const { getFieldDecorator, getFieldValue, getFieldsValue } = form
    const { state } = location

    // 获取分组信息
    if (articleGroup.length === 0) {
        getArticleGroup()
    }

    // 用于展示的图片
    const [imgUrl, setImgUrl] = useState(state?.img)

    // 用于保存，发送后端的图片
    const [imgFile, setImgFile] = useState(undefined)

    // 用于获取日期
    const [dateString, setdateString] = useState(dateFormat(state?.date ?? undefined).getYearMonthDate)

    // 判断是否置顶
    const [isTop, setIsTop] = useState(state?.isTop ?? false)

    // 改变日期
    const changeDate = (date, dateString) => {
        setdateString(dateString)
    }

    // 文章详细内容
    const [context, setContext] = useState("")

    // 获取文章详情
    const getArticleDetail = async (_id) => {
        const { data } = await reqArticleDetail(_id)
        setContext(data.context)
    }

    //如果有id存在的话，从后端能获取文章详细信息
    if (state?._id) {
        getArticleDetail(state._id)
    }


    // 在上传前，判断图片是否符合
    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    // 获取图片base64码
    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    // 保存图片
    const saveImg = (...args) => {
        const { file } = args[0]
        getBase64(file, imageUrl => {
            setImgUrl(imageUrl)
        })
        setImgFile(file)
    }

    // 解析markdown
    const renderer = new marked.Renderer()

    marked.setOptions({
        renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        highlight(code) {
            return hljs.highlightAuto(code).value
        }
    })

    const uploadButton = (
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Icon type='plus' />
            点击添加描述图片
        </div>
    );

    // 选择是否置顶
    const switchChange = (checked) => {
        setIsTop(checked)
    }

    // 新增或者修改文章，通过是否有参数判断
    const addOrUpdateArticle = async () => {
        //获取表单值
        const { title, group, desc, context } = getFieldsValue()
        const param = new FormData()

        // 判断是否有_id，决定是新增还是修改
        if (state?._id) {
            param.append('_id', state._id)
        }
        param.append('title', title)
        param.append('group', group)
        param.append('date', dateString)
        param.append('desc', desc)
        param.append('context', context)
        param.append('isTop', isTop)
        if (imgFile) {
            const { uid, name: imgName } = imgFile
            // 获取扩展名
            const ext = imgName.split('.')[1]
            param.append('imgName', `${uid}.${ext}`)
            param.append('img', imgFile)
        }
        let result;
        // 判断是否有_id，决定是新增还是修改
        if (state?._id) {
            result = await reqUpdateArticle(param)
        } else {
            result = await reqAddArticle(param)
        }
        if (result.data?.status !== 403) {
            if (result.status === 200) {
                message.success('提交成功')
                props.history.push('/blog/articles')
            } else {
                message.error('提交失败', result.errmsg)
            }
        }
    }

    return (
        // 这边使用grid布局
        <Form>
            <div className="blog_article_grid">
                {/* 标题 */}
                <div>
                    {
                        getFieldDecorator('title', {
                            initialValue: state?.title
                        })(
                            <Input placeholder="请输入标题" />
                        )
                    }
                </div>
                {/* 分组 */}
                <div>
                    {
                        getFieldDecorator('group', {
                            initialValue: state?.group ?? articleGroup[0]?._id ?? ""
                        })(
                            <Select>
                                {
                                    articleGroup.map(item => (
                                        <Option
                                            value={item._id}
                                            key={item._id}>
                                            {
                                                item.name
                                            }
                                        </Option>
                                    ))
                                }
                            </Select>
                        )
                    }
                </div>
                {/* 描述 */}
                <div className="desc">
                    {
                        getFieldDecorator('desc', {
                            initialValue: state?.desc ?? ''
                        })(
                            <TextArea />
                        )
                    }
                </div>
                {/* 文章内容（textarea） */}
                <div className="context">
                    {
                        getFieldDecorator('context', {
                            initialValue: context
                        })(
                            <TextArea />
                        )
                    }
                </div>
                {/* 文章内容（展示） */}
                <div className="showContext">
                    {/* markdown */}
                    <div dangerouslySetInnerHTML={{ __html: marked(getFieldValue("context")) }}>
                    </div>
                </div>

                {/* 日期选择 */}
                <div className="date">
                    <DatePicker
                        defaultValue={moment(dateString, 'YYYY-MM-DD')}
                        onChange={changeDate} />
                </div>
                {/* 封面图片 */}
                <div className="avatarFile">
                    < Upload
                        name="avatarFile"
                        listType="picture"
                        className="avatar-uploader"
                        showUploadList={false}
                        customRequest={saveImg}
                        beforeUpload={beforeUpload}
                    >
                        {imgUrl ? <img src={imgUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </div>
                {/* 取消/确认按钮 */}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Switch
                        checkedChildren="置顶"
                        unCheckedChildren="不置顶"
                        defaultChecked={isTop}
                        onChange={switchChange} />
                    <Button type="primary" onClick={addOrUpdateArticle}>
                        确认
                    </Button>
                </div>
            </div>
        </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ArticlesAddUpdate))