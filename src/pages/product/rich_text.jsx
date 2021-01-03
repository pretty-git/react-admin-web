import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default class RichText extends Component {
    state = {
        editorState: EditorState.createEmpty() // 创建了一个没有内容的编辑对象
    }
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };
    getValue = () => {
        const { editorState } = this.state;
        let value = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        return value
    }
    /**
     * @description 回显富文本编辑器
     */
    init = () => {
        const contentBlock = htmlToDraft(this.props.detail);
        if (contentBlock) { // 如果有值
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.setState({
                editorState,
            });
        }
    }
    /**
     * @description 本地上传图片回调
     */
    uploadImageCallBack = (file) => {
        return new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', '/manage/img/upload');
                const data = new FormData();
                data.append('image', file);
                xhr.send(data);
                xhr.addEventListener('load', () => {
                    const response = JSON.parse(xhr.responseText);
                    const url = response.data.url
                    resolve({ data: { link: url } });
                });
                xhr.addEventListener('error', () => {
                    const error = JSON.parse(xhr.responseText);
                    reject(error);
                });
            }
        );
    }
    componentDidMount() {
        this.init()

    }
    render() {
        const { editorState } = this.state;
        return (
            <Editor
                editorState={editorState}
                editorStyle={{ border: '1px solid #aaa', minHeight: '200px', padding: 10 }}
                onEditorStateChange={this.onEditorStateChange}
                toolbar={{
                    image: { uploadCallback: this.uploadImageCallBack,
                      alt: { present: true, mandatory: true } },
                }}
            />
        );
    }
}