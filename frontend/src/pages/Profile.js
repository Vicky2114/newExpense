
import React, { useState } from 'react';
import { Button, message, Modal, Form, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';

const EditProfileModal = ({ visible, onCancel, onUpdateProfile, user }) => {
  const [form] = Form.useForm();

  const handleUpdate = () => {
    form
      .validateFields()
      .then((values) => {
        onUpdateProfile(values);
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log('Validation Failed:', errorInfo);
      });
  };

  return (
    <Modal
      title="Edit Profile"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button className="custom-button" key="update" type="primary" onClick={handleUpdate}>
          Update
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" initialValues={user}>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter your name' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email' }]}>
          <Input disabled />
        </Form.Item>
        {/* Add other form fields as needed */}
      </Form>
    </Modal>
  );
};

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [editModalVisible, setEditModalVisible] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const showEditModal = () => {
    setEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
  };

  const handleUpdateProfile = async (updatedProfile) => {
    try {
      setLoading(true);

      // Simulate an API call to update the user profile
      // Replace this with your actual API call
      await axios.post('/api/v1/users/update-profile', {
        userId: user._id,
        updatedProfile,
      });

      // Update the user data in localStorage (excluding password)
      const updatedUser = { ...user, ...updatedProfile, password: undefined };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setUser(updatedUser);
      setEditModalVisible(false);

      message.success('Profile updated successfully');
    } catch (error) {
      console.error(error);
      message.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div className="container">
      {loading && <Spinner />}
      <div className="profile-box">
        <h2 className="profile-heading">User Profile</h2>
        <p className="profile-info">Name: {user.name}</p>
        <p className="profile-info">Email: {user.email}</p>

        <div className="button-group">
          <Button className="edit-button" type="primary" onClick={showEditModal}>
            Edit Profile
          </Button>
          <Button className="back-button" onClick={() => navigate('/')}>
            <ArrowLeftOutlined />
            Back
          </Button>
        </div>
        <EditProfileModal
          visible={editModalVisible}
          onCancel={handleEditCancel}
          onUpdateProfile={handleUpdateProfile}
          user={user}
        />
      </div>
    </div>
  );
};

export default Profile;
