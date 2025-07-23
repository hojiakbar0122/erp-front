// pages/CourseTable.tsx

import React, { useEffect, useState } from "react";
import { Button, Divider, Popconfirm, Space, Table, message, Form } from "antd";
import type { TableColumnsType } from "antd";
import { courseService } from "@service";
import CourseModal from "./course-modal";
import type { Course } from "../../types/course";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";

const CourseTable: React.FC = () => {
  const [data, setData] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [form] = Form.useForm();

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const getData = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const res = await courseService.getCourse({ page, limit });
      const transformed = res?.data.courses.map((item: any, index: number) => ({
        key: item.id || index,
        id: item.id,
        title: item.title || "No title",
        description: item.description || "No description",
        price: item.price || 0,
        duration: item.duration || "No duration",
      }));
      setData(transformed);
      setTotal(res?.data.total);
      setCurrentPage(res?.data.page);
      setPageSize(res?.data.limit);
    } catch (err) {
      console.error("Xatolik:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(currentPage, pageSize);
  }, []);

  const handleAdd = () => {
    setEditingCourse(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: Course) => {
    setEditingCourse(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (id?: number) => {
    try {
      await courseService.deleteCourse(id!);
      message.success("O'chirildi");
      getData(currentPage, pageSize);
    } catch {
      message.error("O'chirishda xatolik yuz berdi");
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingCourse?.id) {
        await courseService.updateCourse(values, editingCourse.id);
        message.success("Yangilandi");
      } else {
        await courseService.createCourse(values);
        message.success("Qo'shildi");
      }
      setIsModalOpen(false);
      getData(currentPage, pageSize);
    } catch (err) {
      console.log("Form xatolik:", err);
    }
  };

  const columns: TableColumnsType<Course> = [
    { title: "Name", dataIndex: "title" },
    { title: "Desc", dataIndex: "description" },
    { title: "Price", dataIndex: "price" },
    { title: "Duration", dataIndex: "duration" },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            <FaEdit />
          </Button>
          <Popconfirm title="Ishonchingiz komilmi?" onConfirm={() => handleDelete(record.id)}>
            <Button type="link" danger>
              <RiDeleteBin5Fill />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Divider>Course Table</Divider>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Course
      </Button>
      <Table<Course>
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: total,
          onChange: (page, size) => {
            getData(page, size);
          },
        }}
      />

      <CourseModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleModalOk}
        form={form}
        isEditing={!!editingCourse}
      />
    </>
  );
};

export default CourseTable;
