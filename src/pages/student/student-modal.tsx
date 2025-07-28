import React from "react";
import { Form, Input, Modal, Select, DatePicker } from "antd";

interface Props {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
  form: any;
  isEditing?: boolean;
}

const StudentModal: React.FC<Props> = ({ open, onCancel, onOk, form, isEditing }) => {
  return (
    <Modal
      title={isEditing ? "Edit Student" : "Add Student"}
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      okText={isEditing ? "Update" : "Create"}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="first_name" label="First Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="last_name" label="Last Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="password_hash"
          label="Password"
          rules={[{ required: !isEditing }]} // faqat create da kerak
        >
          <Input.Password placeholder={isEditing ? "Leave empty if unchanged" : ""} />
        </Form.Item>

        <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
          <Select placeholder="Select gender">
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="date_of_birth" label="Date of Birth" rules={[{ required: true }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="lidId" label="Lid ID" rules={[{ required: true }]}>
          <Select placeholder="Select Lid ID">
            <Select.Option value={1}>Lid 1</Select.Option>
            <Select.Option value={2}>Lid 2</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="eventsId" label="Event ID" rules={[{ required: true }]}>
          <Select placeholder="Select Event ID">
            <Select.Option value={1}>Event 1</Select.Option>
            <Select.Option value={2}>Event 2</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StudentModal;
