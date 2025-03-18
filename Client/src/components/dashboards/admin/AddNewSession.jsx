import React, { useState } from "react";
import { Input, Button, DatePicker, Upload, message, Form, InputNumber } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import dayjs from 'dayjs';

const AddSession = () => {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [timestamp, setTimestamp] = useState(null);  // Initialize as null to handle invalid dates properly
    const [price, setPrice] = useState(null);  // Add price state

    // Handle image upload response
    const handleImageChange = (info) => {
        if (info.file.status === "done") {
            setImage(info.file.response.filePath); // The response from server contains the file path
        }
    };

    // Handle form submission
    const handleFormSubmit = async () => {
        if (!image || !title || !timestamp || price === null) {
            message.error("Please fill in all fields");
            return;
        }
    
        console.log("Form data being sent:", { image, title, timestamp, price });
    
        try {
            await axios.post("http://localhost:5000/api/sessions/add", {
                image,
                title,
                timestamp,
                price,  // Send price with the session data
            });
            message.success("Session added successfully");
            alert("session added successfully")
        } catch (error) {
            console.error("Error adding session:", error);
            message.error("Error adding session");
            alert("Error adding Session")
        }
    };
    

    return (
        <div style={styles.container}>
            <Form layout="vertical" onFinish={handleFormSubmit} style={styles.form}>
                {/* Session Title */}
                <Form.Item label="Session Title">
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter session title"
                    />
                </Form.Item>

                {/* Session Image */}
                <Form.Item label="Session Image">
                    <Upload
                        name="image"
                        action="http://localhost:5000/api/upload/session"  // Use the session image upload route
                        listType="picture"
                        onChange={handleImageChange}
                        showUploadList={false}
                    >
                        <Button icon={<PlusOutlined />}>Upload Image</Button>
                    </Upload>
                    {image && (
            <p className="mt-2 text-gray-600">Selected File: {image.split('/').pop()}</p> 
          )}
                </Form.Item>

                {/* Session Date and Time */}
                <Form.Item label="Session Date and Time">
                    <DatePicker
                        showTime
                        value={timestamp ? dayjs(timestamp) : null} // Convert string to dayjs object
                        onChange={(date, dateString) => setTimestamp(dateString)} // Set timestamp as string
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="Select session date and time"
                    />
                </Form.Item>

                {/* Session Price */}
                <Form.Item label="Session Price">
                    <InputNumber
                        min={0}
                        value={price}
                        onChange={(value) => setPrice(value)}
                        placeholder="Enter session price"
                        style={{ width: '100%' }}
                    />
                </Form.Item>

                {/* Submit Button */}
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Session
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

// Style for the form and container
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: "-70px",
        height: '100vh',
        backgroundColor: '#bbe4e9',
    },
    form: {
        maxWidth: '500px',
        width: '100%',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
};

export default AddSession;
