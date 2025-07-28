import React from "react";
import { Form, Input, Modal, Select } from "antd";

interface Props {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
  form: any;
  isEditing?: boolean;
}

const roles = ["main teacher", "assistant", "mentor"]; // kerak bo‘lsa kengaytirish mumkin

const TeacherModal: React.FC<Props> = ({ open, onCancel, onOk, form, isEditing }) => {
  return (
    <Modal
      title={isEditing ? "Edit Teacher" : "Add Teacher"}
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
          name="password"
          label="Password"
          rules={[{ required: !isEditing }]} // faqat create da kerak
        >
          <Input.Password placeholder={isEditing ? "Leave empty if unchanged" : ""} />
        </Form.Item>

        <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="role" label="Role" rules={[{ required: true }]}>
          <Select placeholder="Select role">
            {roles.map((r) => (
              <Select.Option key={r} value={r}>
                {r}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="branchId" label="Branches" rules={[{ required: true }]}>
          <Select mode="multiple" placeholder="Select branches">
            <Select.Option value={1}>Chilonzor</Select.Option>
            <Select.Option value={2}>Yunusobod</Select.Option>
            <Select.Option value={3}>Olmazor</Select.Option>
            <Select.Option value={5}>Berilgan 5-id</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TeacherModal;
