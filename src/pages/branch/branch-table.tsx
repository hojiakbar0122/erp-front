import React, { useEffect, useState } from "react";
import { Button, Divider, Form, message, Popconfirm, Space, Table } from "antd";
import type { TableColumnsType } from "antd";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import BranchModal from "./branch-modal";
import { branchService } from "@service";
import type { Branch } from "../../types";

const BranchTable: React.FC = () => {
  const [data, setData] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [form] = Form.useForm();
  const [modalLoading, setModalLoading] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  const getData = async (page = 1, limit = 5) => {
    setLoading(true);
    try {
      const res = await branchService.getBranches({ page, limit });

      const transformed = res?.data.branch.map((item: any, index: number) => ({
        key: index,
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
  }, [currentPage, pageSize]);

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
    setModalLoading(true);
    try {
      const values = await form.validateFields();
      console.log(editingBranch);
      
      if (editingBranch?.id) {
        console.log("Editing branch ID:", editingBranch?.id);
        console.log("Payload:", values);

        await branchService.updateBranch(values, editingBranch.id);
        message.success("Filial yangilandi");
      } else {
        await branchService.createBranch(values);
        message.success("Filial qo‘shildi");
      }

      setIsModalOpen(false); // Faqat muvaffaqiyatli bo‘lsa yopiladi
      getData(currentPage, pageSize);
    } catch (err: any) {
      const msg = err?.response?.data?.message;
      if (Array.isArray(msg)) {
        msg.forEach((m) => message.error(m));
      } else {
        message.error(msg || "Formani to‘g‘ri to‘ldiring");
      }
    } finally {
      setModalLoading(false);
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
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50"],
          onChange: (page, size) => {
            setCurrentPage(page);
            setPageSize(size);
          },
        }}
        style={{paddingBottom:50}}
      />
      <BranchModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleModalOk}
        form={form}
        isEditing={!!editingBranch}
        confirmLoading={modalLoading} // bu ham qo‘shildi
      />
    </>
  );
};

export default BranchTable;
