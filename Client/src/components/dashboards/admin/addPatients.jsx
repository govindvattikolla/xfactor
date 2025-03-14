import React, { useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const AddPatientForm = () => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

    const handleFinish = async (values) => {
        try {
            await axios.post("http://localhost:5000/api/patients/add", values);
            message.success("Patient added successfully");
            alert("Patient added successfully")
            form.resetFields();
        } catch (error) {
            message.error("Error adding patient");
            alert("error adding patient")
        }
    };

    const uploadButton = (
        <button style={{ border: 0, background: "none" }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            style={{ maxWidth: 500, margin: "0 auto", padding: 20, background: "#fef5e7", borderRadius: 8 }}
        >
            <Form.Item>
                <div className="upload-container">
                    <Upload listType="picture-circle" fileList={fileList} onChange={handleChange}>
                        {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                </div>
            </Form.Item>

            <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter the name" }]}>
                <Input placeholder="Enter Name" />
            </Form.Item>

            <Form.Item label="Email" name="email" rules={[{ type: "email", message: "Enter a valid email" }]}>
                <Input placeholder="Enter Email" />
            </Form.Item>

            <Form.Item label="Phone" name="phone" rules={[{ required: true, message: "Please enter the phone number" }]}>
                <Input placeholder="Enter Phone" />
            </Form.Item>

            <Form.Item label="Address" name="address">
                <Input placeholder="Enter Address" />
            </Form.Item>

            <Form.Item label="Description" name="description">
                <Input.TextArea placeholder="Additional Notes" rows={4} />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Add Patient
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddPatientForm;
