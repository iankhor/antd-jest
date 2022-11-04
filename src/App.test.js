import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event'
import { Form, Input } from 'antd'

function ChildComponent() {
  const { useFormInstance, useWatch } = Form
  const form = useFormInstance()
  const userName = useWatch('username', form);

  return <div>{userName}</div>
}

function ComponentUnderTest() {
  return (
    <Form initialValues={{ remember: true }} >
      <Form.Item
        label="Username"
        name="username"
      >
        <Input />
      </Form.Item>
        <ChildComponent />
    </Form>
    )
}

test('foobar test', () => {
  render(<ComponentUnderTest />);

  const input = screen.getByRole('textbox', { name: /username/i })
  user.type(input, 'muahaha')

  const userName = screen.getByText('muahaha')

  expect(userName).toBeInTheDocument()
});
