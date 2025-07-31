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
  Row,
  Col,
  Statistic,
  Input,
  Space,
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
  const [groupTeachers, setGroupTeachers] = useState<any[]>([]);
  const [groupStudents, setGroupStudents] = useState<any[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<any[]>([]);

  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState<number | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    if (id) {
      fetchGroup();
      fetchAllTeachers();
      fetchAllStudents();
      fetchGroupTeachers();
      fetchGroupStudents();
    }
  }, [id]);

  useEffect(() => {
    handleSearchStudent(searchText);
  }, [searchText, groupStudents]);

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
    const formatted = res?.data.data.map((s: any) => ({
      label: `${s.first_name} ${s.last_name}`,
      value: s.id,
      ...s,
    }));
    setAllStudents(formatted);
    setFilteredStudents(formatted);
  };

  const fetchGroupTeachers = async () => {
    const res = await groupService.getGroupTeachers(Number(id));
    setGroupTeachers(res?.data || []);
  };

  const fetchGroupStudents = async () => {
    const res = await groupService.getGroupStudents(Number(id));
    const studentArr = (res?.data || []).map((item:any) => item.student);
    setGroupStudents(studentArr || []);
    setFilteredStudents(studentArr || []);
  };

  const handleAddTeacher = async () => {
    if (!selectedTeacherId || !id) return;
    try {
      await groupService.addTeacherToGroup({
        groupId: Number(id),
        teacherId: [selectedTeacherId],
      });
      await fetchGroupTeachers();
      setIsTeacherModalOpen(false);
      setSelectedTeacherId(null);
    } catch (error) {
      console.error("Add teacher error:", error);
    }
  };

  const handleAddStudent = async () => {
    if (!selectedStudentId || !id) return;
    try {
      await groupService.addStudentToGroup({
        groupId: Number(id),
        studentId: [selectedStudentId],
      });
      await fetchGroupStudents();
      setIsStudentModalOpen(false);
      setSelectedStudentId(null);
    } catch (error) {
      console.error("Add student error:", error);
    }
  };

  const handleSearchStudent = (value: string) => {
    const filtered = groupStudents.filter((s) =>
      `${s.first_name} ${s.last_name}`.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredStudents(filtered);
  };

  if (loading || !group) return <Spin size="large" />;

  const totalLessons = group.lessons?.length || 0;
  const doneLessons = group.lessons?.filter((l: any) => l.status === "done").length || 0;
  const pendingLessons = totalLessons - doneLessons;

  const getLessonTagColor = (status: string) => {
    switch (status) {
      case "done": return "green";
      case "pending": return "orange";
      case "missed": return "red";
      default: return "default";
    }
  };

  return (
    <div className="p-4 space-y-6">
      <Card className="shadow-md border border-gray-200 rounded-xl">
        <Space direction="vertical">
          <Title level={2} style={{ marginBottom: 0 }}>{group.name}</Title>
          <Paragraph type="secondary">{group.status}</Paragraph>
        </Space>
        <Descriptions column={1} size="small" style={{ marginTop: 16 }}>
          <Descriptions.Item label="Boshlanish sanasi">{group.start_date}</Descriptions.Item>
          <Descriptions.Item label="Tugash sanasi">{group.end_date}</Descriptions.Item>
          <Descriptions.Item label="Xona raqami">{group.roomId}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card
        title="O'qituvchilar"
        extra={<Button onClick={() => setIsTeacherModalOpen(true)}>Add Teacher</Button>}
      >
        <Collapse accordion>
          {groupTeachers.map((obj: any) => (
            <Panel
              header={`${obj.teacher.first_name} ${obj.teacher.last_name}`}
              key={obj.teacher.id}
              extra={<Tag color={obj.teacher.role === "active" ? "green" : "red"}>{obj.teacher.role}</Tag>}
            />
          ))}
        </Collapse>
      </Card>

      <Card
        title={<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Oylik Darslar</span>
          <Row gutter={16}>
            <Col><Statistic title="Jami" value={totalLessons} /></Col>
            <Col><Statistic title="O'tilgan" value={doneLessons} /></Col>
            <Col><Statistic title="Kutilmoqda" value={pendingLessons} /></Col>
          </Row>
        </div>}
      >
        <div style={{ overflowX: "auto", display: "flex", gap: "16px" }}>
          {group.lessons?.map((lesson: any) => (
            <Card
              key={lesson.id}
              style={{ minWidth: 180, transition: "transform 0.3s" }}
              hoverable
            >
              <Title level={5}>{lesson.title}</Title>
              <Text>{lesson.date}</Text>
              <div style={{ marginTop: 8 }}>
                <Tag color={getLessonTagColor(lesson.status)}>{lesson.status.toUpperCase()}</Tag>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      <Card
        title="Talabalar ro‘yxati"
        extra={<Button onClick={() => setIsStudentModalOpen(true)}>Add Student</Button>}
      >
        <Input
          placeholder="Ism yoki familiya orqali qidirish"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <Table
          rowKey="id"
          bordered
          scroll={{ x: 1000 }}
          dataSource={filteredStudents}
          columns={[
            { title: "Ismi", dataIndex: "first_name", key: "first_name" },
            { title: "Familiyasi", dataIndex: "last_name", key: "last_name" },
            { title: "Email", dataIndex: "email", key: "email" },
            { title: "Telefon", dataIndex: "phone", key: "phone" },
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
