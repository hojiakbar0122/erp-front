import React, { useEffect, useState } from "react";
import { Button, Divider, Form, message, Popconfirm, Space, Table } from "antd";
import type { TableColumnsType } from "antd";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import StudentModal from "./student-modal";
import { studentService } from "@service"; // ← studentService bo‘lishi kerak
import dayjs from "dayjs";

interface Student {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password_hash?: string;
  gender: string;
  date_of_birth: string;
  lidId: number;
  eventsId: number;
}

const StudentTable: React.FC = () => {
  const [data, setData] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [form] = Form.useForm();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const getData = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const res = await studentService.getStudent({ page, limit });
      console.log(res);
      
      const transformed = res?.data.data.map((item: any) => ({
        ...item,
        date_of_birth: item.date_of_birth,
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
  }, [currentPage, pageSize]);

  const handleAdd = () => {
    setEditingStudent(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: Student) => {
    setEditingStudent(record);
    form.setFieldsValue({
      ...record,
      date_of_birth: dayjs(record.date_of_birth),
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
        console.log(id);
        
      await studentService.deleteStudent(id);
      message.success("Talaba o‘chirildi");
      getData(currentPage, pageSize);
    } catch {
      message.error("O‘chirishda xatolik yuz berdi");
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      values.date_of_birth = values.date_of_birth.format("YYYY-MM-DD");

      if (editingStudent?.id) {
        await studentService.updateStudent(values, editingStudent.id);
        message.success("Talaba yangilandi");
      } else {
        console.log(values);
        await studentService.createStudent(values);
        message.success("Talaba qo‘shildi");
      }

      setIsModalOpen(false);
      getData(currentPage, pageSize);
    } catch (err) {
      message.error("Formani to‘g‘ri to‘ldiring");
    }
  };

  const columns: TableColumnsType<Student> = [
    { title: "Ism", dataIndex: "first_name" },
    { title: "Familiya", dataIndex: "last_name" },
    { title: "Email", dataIndex: "email" },
    { title: "Telefon", dataIndex: "phone" },
    { title: "Jinsi", dataIndex: "gender" },
    { title: "Tug‘ilgan sana", dataIndex: "date_of_birth" },
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
      <Divider>Student Table</Divider>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Student
      </Button>
      <Table<Student>
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
    current: currentPage,
    pageSize: pageSize,
    total: total,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20", "50"],
    onChange: (page, size) => {
      setCurrentPage(page);
      setPageSize(size);
    },
  }}
        style={{paddingBottom:50}}
      />

      <StudentModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleModalOk}
        form={form}
        isEditing={!!editingStudent}
      />
    </>
  );
};

export default StudentTable;
