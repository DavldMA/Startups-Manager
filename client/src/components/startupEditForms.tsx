import React, { useState } from 'react';
import { Modal, Form, Input, Button, FormProps, message } from 'antd';
import { updateStartup } from '../services/startupService';
import EditOutlined from '@ant-design/icons/lib/icons/EditOutlined';

type FieldType = {
    nome?: string;
};

const StartupEditForms = ({ setFetchTrigger, id }: { setFetchTrigger: Function, id: string }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const success = (message: string) => {
        messageApi.open({
        type: 'success',
        content: message,
        });
    };

    const error = (message: string) => {
        messageApi.open({
        type: 'error',
        content: message,
        });
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = async (values: any) => {
        await updateStartup(values.nome, id)
        setIsModalVisible(false);
        setFetchTrigger((prev: any) => !prev);
        success("Updated Successfully")
    };
    
    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
        error("Error while trying to submit the forms")
    };

    return (
        <div>
            {contextHolder}
            <Button style={{border: 'none', boxShadow: 'none'}} icon={<EditOutlined />} onClick={showModal} />
            <Modal
                title="Edit Startup Name"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 500, minWidth:10 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                    <Form.Item<FieldType>
                        label="Name"
                        name="nome"
                        rules={[{ required: true, message: 'Please input your startup name!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Edit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default StartupEditForms;
