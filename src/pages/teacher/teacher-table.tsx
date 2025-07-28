import React, { useEffect, useState } from "react";
import { Button, Divider, Form, message, Popconfirm, Space, Table } from "antd";
import type { TableColumnsType } from "antd";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import TeacherModal from "./teacher-modal";
import { teacherService } from "@service"; // ← teacherService tayyor bo'lishi kerak

interface Teacher {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: string;
  branchId: number[]; // Multi-branch support
}

const TeacherTable: React.FC = () => {
  const [data, setData] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [form] = Form.useForm();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const getData = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const res = await teacherService.getTeacher({ page, limit });
      const transformed = res?.data.data.map((item: any) => ({
        id: item.id,
        first_name: item.first_name,
        last_name: item.last_name,
        email: item.email,
        phone: item.phone,
        role: item.role,
        branchId: item.branchId || [], // array
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
    setEditingTeacher(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: Teacher) => {
    setEditingTeacher(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await teacherService.deleteTeacher(id);
      message.success("O‘qituvchi o‘chirildi");
      getData(currentPage, pageSize);
    } catch {
      message.error("O‘chirishda xatolik yuz berdi");
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();

      if (editingTeacher?.id) {
        await teacherService.updateTeacher(values, editingTeacher.id);
        message.success("O‘qituvchi yangilandi");
      } else {
        await teacherService.createTeacher(values);
        message.success("O‘qituvchi qo‘shildi");
      }

      setIsModalOpen(false);
      getData(currentPage, pageSize);
    } catch (err) {
      message.error("Formani to‘g‘ri to‘ldiring");
    }
  };

  const columns: TableColumnsType<Teacher> = [
    { title: "Ism", dataIndex: "first_name" },
    { title: "Familiya", dataIndex: "last_name" },
    { title: "Email", dataIndex: "email" },
    { title: "Telefon", dataIndex: "phone" },
    { title: "Rol", dataIndex: "role" },
    {
      title: "Amallar",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            <FaEdit />
          </Button>
          <Popconfirm title="O‘chirishga ishonchingiz komilmi?" onConfirm={() => handleDelete(record.id)}>
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
      <Divider>Teacher Table</Divider>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Teacher
      </Button>
      <Table<Teacher>
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

      <TeacherModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleModalOk}
        form={form}
        isEditing={!!editingTeacher}
      />
    </>
  );
};

export default TeacherTable;
