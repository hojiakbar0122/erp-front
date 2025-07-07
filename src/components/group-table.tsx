import React, { useEffect, useState } from "react";
import { Divider, Table } from "antd";
import type { TableColumnsType } from "antd";
import { groupService } from "../service";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Start date",
    dataIndex: "age",
  },
  {
    title: "End date",
    dataIndex: "address",
  },
];

const GroupTable: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await groupService.getGroups();
        console.log(res);
        
        // Agar backenddan kelgan ma'lumotlar formati boshqacha bo‘lsa — map qilinadi
        const transformed = res?.data.data.map((item: any, index: number) => ({
          key: item.id || index,
          name: item.name || "No name",
          start_date: item.start_date || "No address",
          end_date: item.end_date || "No address",
        }));
        setData(transformed);
      } catch (err) {
        console.error("Xatolik:", err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <>
      <Divider>Group Table</Divider>
      <Table<DataType>
        columns={columns}
        dataSource={data}
        loading={loading}
        size="middle"
      />
    </>
  );
};

export default GroupTable;
