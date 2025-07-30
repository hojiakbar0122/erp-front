import React from "react";
import { Form, Input, Modal } from "antd";

interface Props {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
  form: any;
  isEditing?: boolean;
  confirmLoading?: boolean; // ✅ loading props qo‘shildi
}

const BranchModal: React.FC<Props> = ({
  open,
  onCancel,
  onOk,
  form,
  isEditing,
  confirmLoading,
}) => {
  return (
    <Modal
      title={isEditing ? "Edit Branch" : "Add Branch"}
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      okText={isEditing ? "Update" : "Create"}
      confirmLoading={confirmLoading} // ✅ loading ishlatilmoqda
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
      </Form>
    </Modal>
  );
};

export default BranchModal;
