import React, { useState, memo } from 'react';
import { Form, Button, Alert, Input } from 'antd';
import map from 'lodash/map';
import { ContentWrapper, StyledForm } from './authFormsContainers';

const FormItem = Form.Item;

interface ResetPasswordPageProps {}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = () => {
  const [form] = Form.useForm();
  const [errors, setErrors] = useState<any[]>([]);
  const { validateFields } = form;

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <ContentWrapper>
      <StyledForm
        style={{ padding: '20px' }}
        onFinish={handleSubmit}
        form={form}
      >
        {map(errors, error => (
          <Alert message={error.message} type="error" />
        ))}
        <FormItem name="email" label="Email">
          <Input size="small" />
        </FormItem>
        <FormItem>
          <Button htmlType="submit" type="primary">
            Reset password
          </Button>
        </FormItem>
      </StyledForm>
    </ContentWrapper>
  );
};

export default memo(ResetPasswordPage);
