import { Button, Form, Input, Select, Card } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setItem } from "@helpers";
import { useAuth } from "@hooks";

const { Option } = Select;

const schema = yup
  .object({
    email: yup
      .string()
      .email("Email noto‘g‘ri formatda!")
      .required("Iltimos, email kiriting!"),
    password: yup
      .string()
      .min(6, "Parol kamida 6 ta belgidan iborat bo‘lishi kerak!")
      .required("Iltimos, parolingizni kiriting!"),
  })
  .required();

const SignIn = () => {
  const [role, setRole] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const { mutate } = useAuth();

  const submit = async (values: any) => {
    mutate(
      { data: values, role },
      {
        onSuccess: (res: any) => {
          if (res.status === 201) {
            setItem("access_token", res.data.access_token);
            setItem("role", role);
            navigate(`/${role}`);
          }
        },
      }
    );
  };

  return (
    <div style={{ maxWidth: 400, margin: "100px auto" }}>
      <Card style={{ padding: 24, borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <Form layout="vertical" onFinish={handleSubmit(submit)}>
          <Form.Item
            label="Email"
            validateStatus={errors.email ? "error" : ""}
            help={errors.email?.message}
          >
            <Input
              placeholder="Email"
              {...register("email")}
              onChange={(e) => setValue("email", e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Parol"
            validateStatus={errors.password ? "error" : ""}
            help={errors.password?.message}
          >
            <Input.Password
              placeholder="Parol"
              {...register("password")}
              onChange={(e) => setValue("password", e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Rolni tanlang">
            <Select placeholder="Rol tanlang" onChange={(value) => setRole(value)}>
              <Option value="student">Student</Option>
              <Option value="teacher">Teacher</Option>
              <Option value="admin">Admin</Option>
              <Option value="lid">Lid</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Kirish
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SignIn;
