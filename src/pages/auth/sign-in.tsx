import { Button, Form, Input} from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { authService } from "../../service/auth.service";
import { useState } from "react";

// ✅ Yup orqali validatsiya sxemasi
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
    const [role, setRole] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submit = (values: any) => {
    console.log("Yuborilayotgan payload:", values, role);
    authService.signIn(values, role);
  };

  return (
    <div style={{ maxWidth: 360, margin: "100px auto" }}>
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

            <select onChange={(e)=>setRole(e.target.value)}>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
                <option value="lid">Lid</option>
            </select>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Kirish
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;
