// BranchModal.tsx

import React from "react";
import { Form, Input, Modal, Select } from "antd";
// import type { Teacher } from "../../types"; // Agar kerak bo‘lsa

interface Props {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
  form: any;
  isEditing?: boolean;
  confirmLoading?: boolean;
  teachers: any; // 🔥 qo‘shildi
}

const BranchModal: React.FC<Props> = ({
  open,
  onCancel,
  onOk,
  form,
  isEditing,
  confirmLoading,
  teachers,
}) => {
  return (
    <Modal
      title={isEditing ? "Edit Branch" : "Add Branch"}
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      okText={isEditing ? "Update" : "Create"}
      confirmLoading={confirmLoading}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Branch Name" rules={[{ required: true }]}>
          <Input placeholder="Masalan: Chilonzor Filiali" />
        </Form.Item>

        <Form.Item name="address" label="Address" rules={[{ required: true }]}>
          <Input placeholder="Masalan: Toshkent sh., Chilonzor 5" />
        </Form.Item>

        <Form.Item name="call_number" label="Phone Number" rules={[{ required: true }]}>
          <Input placeholder="Masalan: +998901234567" />
        </Form.Item>

        <Form.Item name="teacherIds" label="Teachers">
          <Select
            mode="multiple"
            placeholder="O‘qituvchilarni tanlang"
            allowClear
          >
            console.log(teachers);
            {teachers.map((teacher:any) => (
              <Select.Option key={teacher.id} value={teacher.id}>
                {teacher.first_name} {teacher.last_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BranchModal;
