import React, { FC, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { useHistory } from 'react-router-dom';
import { Alert, Button, Checkbox, Form, Input, notification } from 'antd';
import * as paths from '../../router/paths';
import { ContentWrapper, StyledForm } from './authFormsContainers';
import postSignup from '../../model/common/auth/postSignup';

const InputPassword = Input.Password;
const FormItem = Form.Item;

interface RegistrationPageProps extends RouteComponentProps {}

const RegistrationPage: FC<RegistrationPageProps> = () => {
  const [errors, setErrors] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [form] = Form.useForm();
  const history = useHistory();
  const { validateFields, getFieldsValue } = form;
  const handleSubmit = (values: any) => {
    console.log(values);
    const postData = { email: values.email, password: values.password };
    console.log(postData);
    setSubmitting(true);
    postSignup(postData)
      .then((res: any) => {
        if (res.message === 'Signup successful') {
          notification.success({
            message: 'You can log in',
            description: 'you will be directed to the login',
          });
          history.push(paths.AUTH);
          setSubmitting(false);
        }
      })
      .catch((err: any) => {
        setSubmitting(false);
        notification.error({
          message: 'Server error',
          description: `${err.message || err[0].message}`,
        });
      });
  };

  return (
    <ContentWrapper>
      <StyledForm
        style={{ padding: '40px' }}
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
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
          <Button loading={submitting} htmlType="submit" type="primary">
            Register
          </Button>
        </FormItem>
      </StyledForm>
    </ContentWrapper>
  );
};

export default RegistrationPage;
