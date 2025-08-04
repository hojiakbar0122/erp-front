import { useEffect, useState } from "react";
import {
  Card,
  Descriptions,
  Avatar,
  Typography,
  Spin,
  message,
  Modal,
  Form,
  Input,
} from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { adminService } from "@service";

const { Title, Text } = Typography;

const AdminProfile = () => {
  const [adminData, setAdminData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [ id, setAdminId ] = useState<any>(null);

  const fetchProfile = async () => {
    try {
      const res = await adminService.getProfile(); // GET /admin/:id
      setAdminData(res?.data);
      
      setAdminId(res?.data.id)

      
    } catch (error) {
      message.error("Profil ma'lumotlari olinmadi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const handlePasswordSave = async () => {
    try {
      const values = await form.validateFields();      
      await adminService.changeAdminPassword(
        { old_password: values.old_password, password: values.new_password, confirm_password: values.new_password },
        id
      );
      message.success("Parol muvaffaqiyatli yangilandi");
      form.resetFields();
      setIsModalOpen(false);
    } catch (err) {
      message.error("Parol yangilanmadi");
    }
  };

  if (loading) {
    return <Spin tip="Yuklanmoqda..." fullscreen />;
  }

  return (
    <>
      <Card
        style={{
          maxWidth: 600,
          margin: "10px auto",
          padding: 24,
          borderRadius: 16,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Avatar
            size={80}
            icon={<UserOutlined />}
            style={{ backgroundColor: "#1890ff" }}
          />
          <Title level={3} style={{ marginTop: 16 }}>
            {adminData?.first_name} {adminData?.last_name}
          </Title>
          <Text type="secondary">Admin profil ma’lumotlari</Text>
        </div>

        <Descriptions column={1} bordered size="middle">
          <Descriptions.Item label="Ism">
            {adminData?.first_name}
          </Descriptions.Item>
          <Descriptions.Item label="Familiya">
            {adminData?.last_name}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {adminData?.email}
          </Descriptions.Item>
          <Descriptions.Item label="Telefon">
            {adminData?.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Roli">
            {adminData?.is_creator ? "Super Admin" : "Oddiy Admin"}
          </Descriptions.Item>
          <Descriptions.Item label="Parol">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>••••••••</span>
              <EditOutlined
                onClick={() => setIsModalOpen(true)}
                style={{ cursor: "pointer", color: "#1890ff", marginLeft: 8 }}
              />
            </div>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Modal
        title="Parolni yangilash"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handlePasswordSave}
        okText="Saqlash"
        cancelText="Bekor qilish"
      >
       <Form layout="vertical" form={form}>
  <Form.Item
    label="Eski parol"
    name="old_password"
    rules={[{ required: true, message: "Eski parolni kiriting" }]}
  >
    <Input.Password />
  </Form.Item>

  <Form.Item
    label="Yangi parol"
    name="new_password"
    rules={[{ required: true, message: "Yangi parolni kiriting" }]}
    hasFeedback
  >
    <Input.Password />
  </Form.Item>

  <Form.Item
    label="Parolni tasdiqlash"
    name="confirm_password"
    dependencies={["new_password"]}
    hasFeedback
    rules={[
      { required: true, message: "Parolni tasdiqlang" },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue("new_password") === value) {
            return Promise.resolve();
          }
          return Promise.reject(
            new Error("Tasdiqlash paroli yangi parolga mos emas!")
          );
        },
      }),
    ]}
  >
    <Input.Password />
  </Form.Item>
</Form>

      </Modal>
    </>
  );
};

export default AdminProfile;
