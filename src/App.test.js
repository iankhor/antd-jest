import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event'
import { Form, Input } from 'antd'
import App from './App'


function ChildComponent() {
  const { useWatch } = Form
  const userName = useWatch('username');


  // See https://ant.design/components/form/#Difference-between-other-data-fetching-method
  const { useFormInstance } = Form
  const form = useFormInstance()
  const foobar = form.getFieldValue('foobar')
  // const foobar = useWatch('foobar'); //uncomment this to make test pass

  return (<><p>{userName}</p><p>{foobar}</p></>)
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
      <Form.Item
        label="Foobar"
        name="foobar"
      >
        <Input />
      </Form.Item>
        <ChildComponent />
    </Form>
    )
}

test('foobar test', () => {
  render(<ComponentUnderTest />);

  const userNameInput = screen.getByRole('textbox', { name: /username/i })
  user.type(userNameInput, 'muahaha')

  const foobarInput = screen.getByRole('textbox', { name: /foobar/i })
  user.type(foobarInput, 'woohoo')


  const userName = screen.getByText('muahaha')
  const foobar = screen.getByText('woohoo')

  expect(userName).toBeInTheDocument()
  expect(foobar).toBeInTheDocument()
});

test.only("App", async () => {

  render(<App />)

  const dateInput = screen.getByPlaceholderText(/select date/i)
  user.click(dateInput)

  const lastDay = screen.getByText(/31/i)
  // console.log(x)
  user.click(lastDay)
  expect(screen.getByPlaceholderText(/select date/i)).toHaveValue("31/01/2023")

  const submit = screen.getByRole('button', { name: /submit/i})

  user.click(submit)
  await waitFor(() => {
    const writePayload = screen.getByRole('generic', {name: 'write-values'})
    const readPayload = screen.getByRole('generic', {name: 'read-values'})

    expect(writePayload).toHaveTextContent(/actualPersisted": "2023-01-31/i)
    // expect(readPayload).toHaveTextContent(/actual": "31\/01\/2023/i)
  })
})