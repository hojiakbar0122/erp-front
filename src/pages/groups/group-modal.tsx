import React from "react";
import { Form, Input, Modal, DatePicker, Select, TimePicker } from "antd";

interface Props {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
  form: any;
  isEditing?: boolean;
}

// Status variantlari
const statusOptions = ["new", "active", "completed", "cancelled", "pending"];

const GroupModal: React.FC<Props> = ({ open, onCancel, onOk, form, isEditing }) => {
  return (
    <Modal
      title={isEditing ? "Edit Group" : "Add Group"}
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      okText={isEditing ? "Update" : "Create"}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Group Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="course" label="Course" rules={[{ required: true }]}>
          <Select placeholder="Select course">
            {/* Optionlarni dynamic qilib yuborish kerak bo‘lsa, prop orqali kiritish mumkin */}
            <Select.Option value={1}>Frontend</Select.Option>
            <Select.Option value={2}>Backend</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="room" label="Room" rules={[{ required: true }]}>
          <Select placeholder="Select room">
            <Select.Option value={1}>Room A</Select.Option>
            <Select.Option value={2}>Room B</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="status" label="Status" rules={[{ required: true }]}>
          <Select placeholder="Select status">
            {statusOptions.map((status) => (
              <Select.Option key={status} value={status}>
                {status}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="start_time" label="Start Time" rules={[{ required: true }]}>
          <TimePicker format="HH:mm" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="start_date" label="Start Date" rules={[{ required: true }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="end_date" label="End Date" rules={[{ required: true }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default GroupModal;
