import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Form, Input, Button, Alert } from 'antd';
import map from 'lodash/map';
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
    <div>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSumbit}
        initialValues={{
          phone: '+7 ',
        }}
      >
        <FormItem
          label="Пароль"
          name="password"
          rules={[
            {
              required: true,
              message: 'Пароль обязателен',
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
            Войти
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};

export default withRouter(AuthForm);
