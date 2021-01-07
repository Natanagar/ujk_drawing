import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import * as paths from '../../router/paths';
import { Form, Input, Button, Alert, notification } from 'antd';
import map from 'lodash/map';
import { ContentWrapper, StyledForm } from './authFormsContainers';
import postLogin from '../../model/common/auth/postLogin';

const InputPassword = Input.Password;
const FormItem = Form.Item;

interface AuthFormProps extends RouteComponentProps {}

const AuthForm: React.FunctionComponent<AuthFormProps> = ({ location }) => {
  const [errors, setErrors] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState<boolean>();
  const [form] = Form.useForm();
  const history = useHistory();
  const { validateFields, getFieldsValue } = form;

  const handleSumbit = (values: any) => {
    setSubmitting(true);
    postLogin(values)
      .then((res: any) => {
        if (res.status === 200) {
          notification.success({
            message: 'Login',
            description: 'succeeded',
          });
          history.push(paths.MAIN);
          setSubmitting(false);
        }
      })
      .catch((err: any) => {
        setSubmitting(false);
        notification.error({
          message: 'Server error',
          description: `${err || err.message || err[0].message}`,
        });
      });
  };
  return (
    <ContentWrapper>
      <StyledForm
        style={{ padding: '20px' }}
        layout="vertical"
        form={form}
        onFinish={handleSumbit}
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
          <Button loading={submitting} htmlType="submit" type="primary">
            Sign in
          </Button>
        </FormItem>
        <Link to={paths.REGISTER}>Registration</Link>
        <br />
      </StyledForm>
    </ContentWrapper>
  );
};

export default withRouter(AuthForm);
