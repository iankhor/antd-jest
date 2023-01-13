import './App.css';

import {useState} from 'react'
import moment from 'moment'
import DisplayDateValues from './components/DisplayDateValues';

import { DatePicker as AntDDatePicker, Form, Button } from 'antd';

import{ simulatePGPersist, to8601} from './helpers'

function App() {
  const [payloadForSubmit, setPayloadForSubmit] = useState({})

  const onFinish = ({date }) => {
    const payloadForSubmit = {
      actualSent: date,
      actualPersisted: simulatePGPersist(date),
      // actualPersisted: to8601(date), //uncomment to see test pass
      expectedPersisted: to8601(date) //here for visual purposes
    }

    setPayloadForSubmit(payloadForSubmit)
  };

  const actualPersisted = simulatePGPersist(payloadForSubmit?.actualSent)
  const expectedPersisted = payloadForSubmit?.expectedPersisted

  const parsedSubmittedPayload = Object.keys(payloadForSubmit).length > 0 ?  { actual: moment(actualPersisted).format('DD/MM/YYYY'), expected: moment(expectedPersisted).format('DD/MM/YYYY') }: {}

  console.log(moment().utc().format())


  return (
    <Form onFinish={onFinish} initialValues={{dateStringUTC: null}} >
    <Form.Item name="date"  >
          <AntDDatePicker  format="DD/MM/YYYY" />
      </Form.Item>

    <div style={{paddingTop: 300}}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
    </div>


    <DisplayDateValues />
    <div aria-label='write-values'>
      <h2>Write: For Submit</h2>
      <pre>{JSON.stringify(payloadForSubmit, null, 2)}</pre>
    </div>
    <br />
    <div aria-label='read-values'>
      <h2>Read: For retrieval</h2>
      <pre>{JSON.stringify(parsedSubmittedPayload, null, 2)}</pre>
    </div>


    </Form>


  );
}

export default App;
