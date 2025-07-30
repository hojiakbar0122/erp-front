import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Typography,
  Descriptions,
  Tag,
  Table,
  Spin,
  Button,
  Modal,
  Select,
  Collapse,
} from "antd";
import { groupService, teacherService, studentService } from "@service";

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const SingleGroupPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [group, setGroup] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [allTeachers, setAllTeachers] = useState<any[]>([]);
  const [allStudents, setAllStudents] = useState<any[]>([]);

  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState<number | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      fetchGroup();
      fetchAllTeachers();
      fetchAllStudents();
    }
  }, [id]);

  const fetchGroup = async () => {
    try {
      setLoading(true);
      const res = await groupService.getGroup(Number(id));
      setGroup(res?.data.group);
    } catch (err) {
      console.error("Group fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllTeachers = async () => {
    const res = await teacherService.getTeacher({});
    setAllTeachers(
      res?.data.data.map((t: any) => ({
        label: `${t.first_name} ${t.last_name}`,
        value: t.id,
        ...t,
      }))
    );
  };

  const fetchAllStudents = async () => {
    const res = await studentService.getStudent({ page: 1, limit: 100 });
    setAllStudents(
      res?.data.data.map((s: any) => ({
        label: `${s.first_name} ${s.last_name}`,
        value: s.id,
        ...s,
      }))
    );
  };

  const handleAddTeacher = () => {
    if (!selectedTeacherId || !group) return;
    const selected = allTeachers.find((t) => t.id === selectedTeacherId);
    if (!selected) return;

    const alreadyExists = group.teachers?.some((t: any) => t.id === selectedTeacherId);
    if (alreadyExists) return;

    setGroup((prev: any) => ({
      ...prev,
      teachers: [...prev.teachers, selected],
    }));
    setSelectedTeacherId(null);
    setIsTeacherModalOpen(false);
  };

  const handleAddStudent = () => {
    if (!selectedStudentId || !group) return;
    const selected = allStudents.find((s) => s.id === selectedStudentId);
    if (!selected) return;

    const alreadyExists = group.students?.some((s: any) => s.id === selectedStudentId);
    if (alreadyExists) return;

    setGroup((prev: any) => ({
      ...prev,
      students: [...prev.students, selected],
    }));
    setSelectedStudentId(null);
    setIsStudentModalOpen(false);
  };

  if (loading || !group) return <Spin size="large" />;

  return (
    <div className="p-4 space-y-6">
      {/* GROUP HEADER BOARD */}
      <Card>
        <Title level={2}>{group.name}</Title>
        <Descriptions column={1} size="small">
          <Descriptions.Item label="Boshlanish sanasi">
            {group.start_date}
          </Descriptions.Item>
          <Descriptions.Item label="Tugash sanasi">
            {group.end_date}
          </Descriptions.Item>
          <Descriptions.Item label="Xona raqami">
            {group.roomId}
          </Descriptions.Item>
        </Descriptions>
        <Paragraph>{group.status}</Paragraph>
      </Card>

      {/* TEACHERS LIST */}
      <Card
        title="O'qituvchilar"
        extra={<Button onClick={() => setIsTeacherModalOpen(true)}>Add Teacher</Button>}
      >
        <Collapse accordion>
          {group.teachers?.map((teacher: any) => (
            <Panel
              header={`${teacher.first_name} ${teacher.last_name}`}
              key={teacher.id}
              extra={
                <Tag color={teacher.role === "active" ? "green" : "red"}>
                  {teacher.role}
                </Tag>
              }
            >
            </Panel>
          ))}
        </Collapse>
      </Card>

      {/* MONTHLY LESSONS */}
      <Card title="Oylik Darslar">
        <div style={{ overflowX: "auto", display: "flex", gap: "16px" }}>
          {group.lessons?.map((lesson: any) => (
            <Card key={lesson.id} style={{ minWidth: 200 }}>
              <Title level={5}>{lesson.title}</Title>
              <Text>{lesson.date}</Text>
              <div>
                <Tag color={lesson.status === "done" ? "blue" : "orange"}>
                  {lesson.status}
                </Tag>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* STUDENTS TABLE */}
      <Card
        title="Talabalar ro‘yxati"
        extra={<Button onClick={() => setIsStudentModalOpen(true)}>Add Student</Button>}
      >
        <Table
          rowKey="id"
          dataSource={group.students || []}
          columns={[
            {
              title: "Ismi",
              dataIndex: "first_name",
              key: "first_name",
            },
            {
              title: "Familiyasi",
              dataIndex: "last_name",
              key: "last_name",
            },
            {
              title: "Email",
              dataIndex: "email",
              key: "email",
            },
            {
              title: "Telefon",
              dataIndex: "phone",
              key: "phone",
            },
            {
              title: "Holat",
              dataIndex: "is_active",
              key: "is_active",
              render: (is_active) => (
                <Tag color={is_active === "active" ? "green" : "red"}>{is_active}</Tag>
              ),
            },
          ]}
          pagination={{ pageSize: 5 }}
        />
      </Card>

      {/* Teacher Modal */}
      <Modal
        title="O'qituvchi qo‘shish"
        open={isTeacherModalOpen}
        onOk={handleAddTeacher}
        onCancel={() => setIsTeacherModalOpen(false)}
      >
        <Select
          style={{ width: "100%" }}
          options={allTeachers}
          value={selectedTeacherId ?? undefined}
          onChange={(value) => setSelectedTeacherId(value)}
          placeholder="O'qituvchini tanlang"
        />
      </Modal>

      {/* Student Modal */}
      <Modal
        title="Talaba qo‘shish"
        open={isStudentModalOpen}
        onOk={handleAddStudent}
        onCancel={() => setIsStudentModalOpen(false)}
      >
        <Select
          style={{ width: "100%" }}
          options={allStudents}
          value={selectedStudentId ?? undefined}
          onChange={(value) => setSelectedStudentId(value)}
          placeholder="Talabani tanlang"
        />
      </Modal>
    </div>
  );
};

export default SingleGroupPage;
