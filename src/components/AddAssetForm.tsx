import { Form, DatePicker, TimePicker, InputNumber, Button, Modal } from "antd";
import {
  disabledDateFunction,
  isToday,
  getRemainingHours,
  validateTime,
} from "../utils.ts";
import { useState } from "react";
import { useCrypto } from "../context/crypto-context.tsx";

const AddAssetForm = ({ coin, getResultData }) => {
  const { addAsset } = useCrypto();
  const [form] = Form.useForm();
  const [disableTime, setDisableTime] = useState(true);
  const [today, setToday] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function onFinish(values) {    
    addAsset({
      amount: values.amount,
      date: values.date.$d.toString().split(' ').slice(0, 4).join(' '),
      id: coin.id,
      price: values.price,
      icon: coin.icon,
      time: values.time ? values.time.$d.toString().split(' ')[4] : values.time,
    });

    getResultData({
      name: coin.name,
      amount: values.amount,
      price: values.price,
    });
  }

  function changeValues(changedValue, allValues) {
    if (
      changedValue.amount ||
      changedValue.amount === 0 ||
      changedValue.price ||
      changedValue.price === 0
    ) {
      if (
        allValues.amount < 0 ||
        allValues.price < 0 ||
        allValues.amount === undefined
      ) {
        form.setFieldsValue({
          total: "-",
        });
        return;
      }
      form.setFieldsValue({
        total: changedValue.amount
          ? +(changedValue.amount * allValues.price).toFixed(2)
          : +(changedValue.price * allValues.amount).toFixed(2),
      });
    }
    if (changedValue.date) {
      setDisableTime(false);
      setToday(isToday(form.getFieldValue().date));
    }
    if (changedValue.time) {
      if (today) {
        console.log(changedValue.time);
        if (
          !validateTime(
            changedValue.time.$H,
            changedValue.time.$m,
            changedValue.time.$s
          )
        ) {
          setIsModalOpen(true);
        }
      }
    }
  }

  function handleCloseModal() {
    form.setFieldsValue({
      time: undefined,
    });
    setIsModalOpen(false);
  }

  function disableTimeOptions() {
    if (today) {
      const disabledHours = getRemainingHours();
      return {
        disabledHours: () => disabledHours,
      };
    }
  }

  return (
    <>
      <Form
        form={form}
        onValuesChange={changeValues}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          width: "100%",
        }}
        initialValues={{
          price: +coin.price.toFixed(2),
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              type: "number",
              min: 0,
              message: "Please input amount",
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              type: "number",
              min: 0,
              message: "Please input price",
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Total" name="total">
          <InputNumber disabled style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          rules={[
            {
              required: true,
              message: "Please choise date",
            },
          ]}
        >
          <DatePicker
            style={{ width: "100%" }}
            disabledDate={disabledDateFunction}
          />
        </Form.Item>

        <Form.Item label="Time" name="time">
          <TimePicker
            disabledTime={disableTimeOptions}
            disabled={disableTime}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Add Asset
          </Button>
        </Form.Item>
      </Form>
      <Modal
        title="Choose time!"
        footer={null}
        open={isModalOpen}
        onCancel={handleCloseModal}
      >
        You cannot select future time! Please choose a valid time!
      </Modal>
    </>
  );
};

export default AddAssetForm;
