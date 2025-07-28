import React from "react";
import { Form, Input, InputNumber, Modal, Select } from "antd";

interface Props {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
  form: any;
  isEditing?: boolean;
}

const CourseModal: React.FC<Props> = ({ open, onCancel, onOk, form, isEditing }) => {
  return (
    <Modal
      title={isEditing ? "Edit Course" : "Add Course"}
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      okText={isEditing ? "Update" : "Create"}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="price" label="Price" rules={[{ required: true }]}>
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="duration" label="Duration (days)" rules={[{ required: true }]}>
          <InputNumber min={1} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="lessons_in_a_week" label="Lessons in a Week" rules={[{ required: true }]}>
          <Select placeholder="Select number">
            <Select.Option value={3}>3</Select.Option>
            <Select.Option value={5}>5</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="lessons_in_a_month" label="Lessons in a Month" rules={[{ required: true }]}>
          <Select placeholder="Select number">
            <Select.Option value={12}>12</Select.Option>
            <Select.Option value={20}>20</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="lesson_duration" label="Lesson Duration (minutes)" rules={[{ required: true }]}>
          <Select placeholder="Select duration">
            <Select.Option value={120}>120</Select.Option>
            <Select.Option value={180}>180</Select.Option>
            <Select.Option value={240}>240</Select.Option>
            <Select.Option value={270}>270</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CourseModal;
