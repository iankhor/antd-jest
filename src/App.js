import './App.css';

import { DatePicker, Form, Button , Input } from 'antd';


function App() {
  const [form] = Form.useForm();

  const onChange = (date, dateString) => {
    console.log(date.toISOString(),dateString)
    form.setFieldsValue({ dateString: dateString });
  };


   const onFinish = (values) => {
      console.log('Success:', values);
    };


  return (
    <Form onFinish={onFinish} form={form} initialValues={{dateString: null}}>
         <Form.Item name="dateString"  hidden>
          <Input hidden/>
        </Form.Item>
        <Form.Item label="date" name="date">
            <DatePicker onChange={onChange} />
        </Form.Item>

    <div style={{paddingTop: 300}}>
    <Button type="primary" htmlType="submit">
          Submit
        </Button>
    </div>


    </Form>


  );
}

export default App;
