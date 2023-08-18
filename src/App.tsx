import "./App.css";
import { Button, Checkbox, Form, Input, Modal, Space, Table, Tag } from "antd";
import Title from "antd/es/typography/Title";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";

interface DataType {
  no: number;
  name: string;
  age: number;
  address: string;
}

const data: DataType[] = [
  {
    no: 1,
    name: "John Brown",
    age: 32,
    address: "Jl.Manggis 1",
  },
  {
    no: 2,
    name: "Jim Green",
    age: 42,
    address: "Jl.Manggis 2",
  },
  {
    no: 3,
    name: "Joe Black",
    age: 32,
    address: "Jl.Manggis 3",
  },
];

type FieldType = Omit<DataType, "no">;

function App() {
  const [open, setOpen] = useState<"Tambah" | "Ubah" | null>(null);
  const [popupData, setpopupData] = useState<DataType>({});
  const [currentData, setcurrentData] = useState(data);

  const columns: ColumnsType<DataType> = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setOpen("Ubah");
              setpopupData(record);
            }}
          >
            Ubah
          </Button>
          <Button
            onClick={() => {
              setcurrentData((prev) => prev.filter((d) => d.no !== record.no));
            }}
          >
            Hapus
          </Button>
        </Space>
      ),
    },
  ];

  const hideModal = () => {
    setOpen(null);
    setpopupData({})
  };

  return (
    <>
      <Modal
        title={open + " Data Siswa"}
        open={Boolean(open)}
        onOk={hideModal}
        onCancel={hideModal}
        okText=""
        cancelText=""
        destroyOnClose
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={popupData}
          onFinish={(values) => {
            setcurrentData((prev) => {
              const tempData = [...prev];
              if(open === "Ubah") {
                const foundIndex = tempData.findIndex((x) => x.no === values.no);
                tempData[foundIndex] = { ...values };
              } else {
                tempData.push({...values, no: prev.length + 1})
              }
              return tempData;
            });
            setOpen(null)
            setpopupData({})
          }}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="No"
            name="no"
            hidden
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Nama"
            name="name"
            rules={[{ required: true, message: "Please input your Nama!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Umur"
            name="age"
            rules={[{ required: true, message: "Please input your Umur!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Alamat"
            name="address"
            rules={[{ required: true, message: "Please input your Alamat!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button onClick={hideModal}>Kembali</Button>
            <Button type="primary" htmlType="submit">
              Simpan
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Space
        direction="vertical"
        style={{
          display: "flex",
          alignItems: "stretch",
          height: "100vh",
          minWidth: "1200px",
        }}
      >
        <Space
          align="end"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Title>Tabel Nama Siswa Yayasan LMAP Peduli</Title>
          <Button
            type="primary"
            onClick={() => {
              setOpen("Tambah");
            }}
          >
            + Data Siswa
          </Button>
        </Space>
        <Table columns={columns} dataSource={currentData} />
      </Space>
    </>
  );
}

export default App;
