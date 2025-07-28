import React, { useEffect, useState } from "react";
import { Table, Button, Space, Popconfirm, message, Divider, Form } from "antd";
import type { TableColumnsType } from "antd";
import { groupService } from "@service";
import { MdGroupAdd } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import GroupModal from "./group-modal";
import dayjs from "dayjs";
import { Tag } from "antd";

interface DataType {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  course: object;
  status:string
  roomId:number
  start_time:string
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
        start_time: item.start_time || "No end date",
        status: item.status || "No end date",
        // room: item.roomId || "No end date",
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
    setEditingGroup(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: DataType) => {
    setEditingGroup(record);
    console.log("record.roomId:", record);
    form.setFieldsValue({
      ...record,
      start_date: dayjs(record.start_date),
      end_date: dayjs(record.end_date),
      start_time: dayjs(record.start_time, "HH:mm"),
      status: record.status,
      room: record.roomId,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (record: DataType) => {
  try {
    await groupService.deleteGroup(record.id);    
    message.success("Gruppa o‘chirildi");
    getData(currentPage, pageSize);
  } catch (error) {
    console.error("Delete xatoligi:", error);
    message.error("Gruppa o‘chirishda xatolik yuz berdi");
  }
};

 const handleModalOk = async () => {
  try {
    const values = await form.validateFields();
    console.log("Form values:", values);

    const payload = {
      name: values.name,
      courseId: typeof values.course === "object" ? values.course?.id : values.course,
      roomId: typeof values.room === "object" ? values.room?.id : values.room,
      status: values.status,
      start_time: values.start_time.format("HH:mm"),
      start_date: values.start_date.format("YYYY-MM-DD"),
      end_date: values.end_date.format("YYYY-MM-DD"),
    };

    console.log("Yuborilayotgan payload:", payload);

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
    console.error("Modal ok xatolik:", err);
    message.error("Formani to‘g‘ri to‘ldiring");
  }
};



  const columns: TableColumnsType<DataType> = [
    { title: "Name", dataIndex: "name" },
    { title: "Start date", dataIndex: "start_date" },
    { title: "End date", dataIndex: "end_date" },
    { title: "Course", dataIndex: "course" },
    { title: "Start time", dataIndex: "start_time" },
    {
  title: "Status",
  dataIndex: "status",
  render: (status: string) => {
    let color = "";
    switch (status) {
      case "active":
        color = "green";
        break;
      case "pending":
        color = "orange";
        break;
      case "completed":
        color = "blue";
        break;
      case "cancelled":
        color = "red";
        break;
      default:
        color = "default";
    }

    return <Tag color={color}>{status.toUpperCase()}</Tag>;
  },
},

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
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20", "50"],
    onChange: (page, size) => {
      setCurrentPage(page);
      setPageSize(size);
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
