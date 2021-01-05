import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import * as paths from '../../router/paths';
import { Form, Input, Button, Alert } from 'antd';
import map from 'lodash/map';
import { ContentWrapper, StyledForm } from './authFormsContainers';
const InputPassword = Input.Password;
const FormItem = Form.Item;

interface AuthFormProps extends RouteComponentProps {}

const AuthForm: React.FunctionComponent<AuthFormProps> = ({ location }) => {
  const [errors, setErrors] = useState<any[]>([]);

  const [form] = Form.useForm();
  const { validateFields, getFieldsValue } = form;

  const handleSumbit = (values: any) => {
    console.log(values);
  };
  return (
    <ContentWrapper>
      <StyledForm
        layout="vertical"
        form={form}
        onFinish={handleSumbit}
        initialValues={{
          phone: '+7 ',
        }}
      >
        <FormItem
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Email is required',
            },
          ]}
        >
          <Input size="small" />
        </FormItem>
        <FormItem
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Password is required',
            },
          ]}
        >
          <InputPassword />
        </FormItem>

        {map(errors, error => (
          <Alert message={error.message} type="error" />
        ))}

        <FormItem>
          <Button htmlType="submit" type="primary">
            Sign in
          </Button>
        </FormItem>
        <Link to={paths.REGISTER}>Registration</Link>
        <br />
        <Link to={paths.RESET_PASSWORD}>Reset password</Link>
      </StyledForm>
    </ContentWrapper>
  );
};

export default withRouter(AuthForm);
