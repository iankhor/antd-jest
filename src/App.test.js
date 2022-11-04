import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event'
import { Form, Input } from 'antd'

function ChildComponent() {
  const { useWatch } = Form
  const userName = useWatch('username');

  // See https://ant.design/components/form/#Difference-between-other-data-fetching-method
  // const { useFormInstance } = Form
  // const userName = "static"
  // const form = useFormInstance()
  // console.log(form.getFieldsValue(true))

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
