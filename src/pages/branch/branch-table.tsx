import React, { useEffect, useState } from "react";
import { Button, Divider, Form, message, Popconfirm, Space, Table } from "antd";
import type { TableColumnsType } from "antd";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import BranchModal from "./branch-modal";
import { branchService } from "@service"; // Sizda mavjud branchService bo'lishi kerak

interface Branch {
  id: number;
  name: string;
  address: string;
  call_number: string;
}

const BranchTable: React.FC = () => {
  const [data, setData] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [form] = Form.useForm();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const getData = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const res = await branchService.getBranches({ page, limit });
      console.log(res);
      
      const transformed = res?.data.branch.map((item: any, index: number) => ({
        key:index,
        id: item.id,
        name: item.name,
        address: item.address,
        call_number: item.call_number,
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
    setEditingBranch(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: Branch) => {
    setEditingBranch(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await branchService.deleteBranch(id);
      message.success("Filial o'chirildi");
      getData(currentPage, pageSize);
    } catch (err) {
      message.error("O'chirishda xatolik yuz berdi");
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingBranch?.id) {
        await branchService.updateBranch(values, editingBranch.id);
        message.success("Filial yangilandi");
      } else {
        await branchService.createBranch(values);
        message.success("Filial qo‘shildi");
      }
      setIsModalOpen(false);
      getData(currentPage, pageSize);
    } catch (err) {
      message.error("Formani to‘g‘ri to‘ldiring");
    }
  };

  const columns: TableColumnsType<Branch> = [
    { title: "Name", dataIndex: "name" },
    { title: "Address", dataIndex: "address" },
    { title: "Call Number", dataIndex: "call_number" },
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
      <Divider>Branch Table</Divider>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Branch
      </Button>
      <Table<Branch>
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
      <BranchModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleModalOk}
        form={form}
        isEditing={!!editingBranch}
      />
    </>
  );
};

export default BranchTable;
