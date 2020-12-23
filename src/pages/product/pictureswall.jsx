import React from 'react'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {deleteImg} from '../../api/index'
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
export default class Pictures extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [],
    };
    
    handleCancel = () => this.setState({ previewVisible: false });
    // 获取图片数组
    getImgList = () => {
      return  this.state.fileList.map(item => item.name)
    }
    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };
    /**
     * @description 操作修改上传后的图片的信息
     */
    handleChange =  async({ file,fileList }) => { 
        let files = fileList[fileList.length-1]
        if(file.status === 'done') {
            files.name = file.response.data.name
            files.url = file.response.data.url
            if(file.response.status != 0) {
                message.error('上传失败')
            }else {
                message.success('上传成功')
            }
        }else if(file.status === "removed") {
            await deleteImg(file.name)
            message.success('删除成功')
        }
        this.setState({ fileList })
    }

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>上传</div>
            </div>
        );
        return (
            <div>
                <Upload
                    accept="image/*"
                    action="/manage/img/upload"
                    listType="picture-card"
                    fileList={fileList}
                    name="image"
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                {/* 预览大图 */}
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        )

    }
}