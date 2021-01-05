import React, { FC, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Form, Input, Button, Alert, Checkbox } from 'antd';
import { ContentWrapper, StyledForm } from './authFormsContainers';

const InputPassword = Input.Password;
const FormItem = Form.Item;

interface RegistrationPageProps extends RouteComponentProps {}

const RegistrationPage: FC<RegistrationPageProps> = () => {
  const [errors, setErrors] = useState<any[]>([]);

  const [form] = Form.useForm();
  const { validateFields, getFieldsValue } = form;
  const handleSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <ContentWrapper>
      <StyledForm
        style={{ padding: '20p' }}
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          phone: '+7 ',
        }}
      >
        <FormItem
          name="firstName"
          label="First name"
          rules={[
            {
              required: true,
              message: 'first name is required',
            },
          ]}
        >
          <Input />
        </FormItem>
        <FormItem
          name="lastName"
          label="Last name"
          rules={[
            {
              required: true,
              message: 'last name is required',
            },
          ]}
        >
          <Input />
        </FormItem>
        <FormItem
          label="email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Required',
            },
          ]}
        >
          <Input />
        </FormItem>
        <FormItem
          label="password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Required',
            },
          ]}
        >
          <InputPassword />
        </FormItem>
        <FormItem
          label="Repeat password"
          name="repeatPassword"
          rules={[
            {
              required: true,
              message: 'Required',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('Passwords are not the same');
              },
            }),
          ]}
        >
          <InputPassword />
        </FormItem>
        <Form.Item
          name="pdAgree"
          valuePropName="checked"
          rules={[
            {
              required: true,
              transform: value => value || undefined,
              type: 'boolean',
              message: 'Access to the personal data',
            },
          ]}
        >
          <Checkbox>
            Agree to <a href="#">access for personal data</a>
          </Checkbox>
        </Form.Item>

        {Array.isArray(errors) && errors.length
          ? errors.map((error: any, index: number) => (
              <Alert key={index} message={error.message} type="error" />
            ))
          : null}

        <FormItem>
          <Button htmlType="submit" type="primary">
            Register
          </Button>
        </FormItem>
      </StyledForm>
    </ContentWrapper>
  );
};

export default RegistrationPage;
