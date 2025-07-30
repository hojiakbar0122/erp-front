import { Button, Popconfirm } from 'antd';
import { MdLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Signout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("selected_menu_key");
    navigate("/");
  };

  return (
    <Popconfirm
      title="Rostdan ham chiqmoqchimisiz?"
      okText="Ha, chiqaman"
      cancelText="Bekor qilish"
      onConfirm={handleLogout}
    >
      <Button style={{ marginRight: "10px" }}>
        <MdLogout />
      </Button>
    </Popconfirm>
  );
};

export default Signout;
