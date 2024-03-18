import React, { useState } from 'react';
import { Modal, Form, Input, Button, FormProps, message } from 'antd';
import { addStartup } from '../services/startupService';

type FieldType = {
    nome?: string;
};

const StartupForms = ({ setFetchTrigger }: any) => {
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
        await addStartup(values.nome)
        setIsModalVisible(false);
        setFetchTrigger((prev: any) => !prev);
        success(`Created ${values.nome} Successfully`)
    };
    
    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
        error("Error while trying to submit the forms")
    };

    return (
        <div>
            {contextHolder}
            <Button type="primary" onClick={showModal}>
                Create New Startup
            </Button>
            <Modal
                title="Create a Startup"
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
                            Create
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default StartupForms;
