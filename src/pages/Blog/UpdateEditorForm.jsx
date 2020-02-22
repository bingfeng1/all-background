import React, { useState, useEffect } from 'react'
import { Form, Input, Switch, Upload, Icon, message } from 'antd'

const { Item } = Form



const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file, fileList) {
    console.log(file, fileList)
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

const UpdateEditorForm = (props) => {
    const [checked, setChecked] = useState(true)
    const [uploadAvator, setuUploadAvator] = useState("")
    const { form, name, avatar, setForm } = props
    const { getFieldDecorator, setFieldsValue } = form

    // console.log(setForm)
    // useEffect(() => {
    setForm(form)
    // })

    useEffect(() => {
        setuUploadAvator(avatar)
    }, [avatar])

    const uploadButton = (
        <div>
            <Icon type={avatar ? 'loading' : 'plus'} />
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    const changeType = (checked) => {
        setChecked(checked)
    }

    const getImgBase64 = (obj) => {
        const { file } = obj
        getBase64(file, imgBase64 => {
            setuUploadAvator(imgBase64)
            setFieldsValue({ avatarStr: imgBase64 })
        })
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
                label={
                    getFieldDecorator('avatarSwtich', {
                        valuePropName: "checked",
                        initialValue: true
                    })(
                        <Switch
                            checkedChildren="url地址"
                            unCheckedChildren="图片"
                            onChange={changeType}>

                        </Switch>
                    )
                }>
                {
                    checked ? (
                        getFieldDecorator('avatar', {
                            rules: [{
                                required: true,
                                message: "头像必填"
                            }],
                            initialValue: avatar
                        })(
                            <Input />
                        )
                    ) : (
                            getFieldDecorator('avatarFile', {
                                valuePropName: 'string',
                                initialValue: uploadAvator
                            })(
                                < Upload
                                    beforeUpload={beforeUpload}
                                    listType="picture-card"
                                    showUploadList={false}
                                    customRequest={getImgBase64}>
                                    {uploadAvator ? <img src={uploadAvator} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                            )

                        )

                }
            </Item>
            <Item style={{ display: 'none' }}>
                {
                    getFieldDecorator('avatarStr',{
                        initialValue: avatar
                    })(
                        <Input />
                    )
                }
            </Item>
        </Form >
    )
}

const WrappedNormalLoginForm = Form.create({ name: 'update_editor_form' })(UpdateEditorForm);


export default WrappedNormalLoginForm