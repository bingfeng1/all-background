import React, { useState } from 'react'
import { Form, Input, Upload,  message } from 'antd'

const { Item } = Form

// 表单label和input的间距
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

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

// 修改的表单
const UpdateEditorForm = (props) => {
    // 由父级组件传递的数据
    const { form, name, avatar, setForm, setMyUploadAvatar } = props
    const { getFieldDecorator } = form

    const [myAvatar, setMyAvatar] = useState(avatar)

    setForm(form)

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
            setMyAvatar(imageUrl)
        })
        setMyUploadAvatar(file)
    }

    return (
        <Form {...formItemLayout}>
            <Item label="昵称">
                {
                    getFieldDecorator('name', {
                        rules: [{
                            required: true,
                            message: "昵称必填"
                        }],
                        initialValue: name
                    })(
                        <Input
                        />
                    )
                }
            </Item>
            <Item
                label="头像">
                {
                    getFieldDecorator('avatarFile', {
                        valuePropName: 'file',
                        initialValue: myAvatar
                    })(
                        < Upload
                            name="avatarFile"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            customRequest={saveImg}
                            beforeUpload={beforeUpload}
                        >
                            <img src={myAvatar} alt="avatar" style={{ width: '100%' }} />
                        </Upload>
                    )
                }
            </Item>
        </Form >
    )
}

// 重新封装，增加一个form的参数
const WrappedNormalLoginForm = Form.create({ name: 'update_editor_form' })(UpdateEditorForm);

export default WrappedNormalLoginForm