
import React from 'react'
import {Form, Select} from 'antd';
const { Option } = Select;
export default class AddForm extends React.Component {
    render() {
        return (
            <Form>
                <Select>
                   <Option value="jack">Jack</Option>
                </Select>
            </Form>
        )
    }
}