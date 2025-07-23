import React, { useEffect, useState } from "react";
import { Table, Button, Space, Popconfirm, message, Divider, Form } from "antd";
import type { TableColumnsType } from "antd";
import { groupService } from "@service";
import { MdGroupAdd } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import GroupModal from "./group-modal";
import dayjs from "dayjs";

interface DataType {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  course: object;
}

const GroupTable: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<DataType | null>(null);

  // ✅ Pagination holati
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const getData = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const res = await groupService.getGroups({ page, limit }); // ← query bilan
      const transformed = res?.data.data.map((item: any, index: number) => ({
        id: item.id || index,
        name: item.name || "No name",
        start_date: item.start_date || "No start date",
        end_date: item.end_date || "No end date",
        course: item.course.title || "No end date",
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
    setEditingGroup(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: DataType) => {
    setEditingGroup(record);
    form.setFieldsValue({
      ...record,
      start_date: dayjs(record.start_date),
      end_date: dayjs(record.end_date),
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (record: DataType) => {
    console.log(record);
    await groupService.deleteGroup(record.id);    
    message.success("Gruppa o‘chirildi");
    getData(currentPage, pageSize);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      
      const payload = {
        ...values,
        start_date: values.start_date.format("YYYY-MM-DD"),
        end_date: values.end_date.format("YYYY-MM-DD"),
      };

      if (editingGroup?.id) {
        await groupService.updateGroup(payload, editingGroup.id);
        message.success("Gruppa yangilandi");
      } else {
        await groupService.createGroup(payload);
        message.success("Gruppa qo‘shildi");
      }
      setIsModalOpen(false);
      getData(currentPage, pageSize);
    } catch (err) {
      console.log("Xatolik:", err);
    }
  };

  const columns: TableColumnsType<DataType> = [
    { title: "Name", dataIndex: "name" },
    { title: "Start date", dataIndex: "start_date" },
    { title: "End date", dataIndex: "end_date" },
    { title: "Course", dataIndex: "course" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            <FaEdit />
          </Button>
          <Popconfirm
            title="Haqiqatan o‘chirmoqchimisiz?"
            onConfirm={() => handleDelete(record)}
            okText="Ha"
            cancelText="Yo‘q"
          >
            <Button
              type="link"
              danger
              style={{ backgroundColor: "transparent" }}
            >
              <RiDeleteBin5Fill />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Divider>Group Table</Divider>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Button type="primary" onClick={handleAdd}>
          <MdGroupAdd /> Add Group
        </Button>
      </div>

      <Table<DataType>
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
        size="middle"
      />

      <GroupModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleModalOk}
        form={form}
        isEditing={!!editingGroup}
      />
    </>
  );
};

export default GroupTable;
