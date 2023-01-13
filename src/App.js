import './App.css';

import {useState} from 'react'
import moment from 'moment'
import DisplayDateValues from './components/DisplayDateValues';

import { DatePicker as AntDDatePicker, Form, Button } from 'antd';

function simulatePGPersist(dateMomentLocalInUTC) {
  return dateMomentLocalInUTC?.toISOString().split('T', 1)[0]
}

function to8601(dateMomentLocalInUTC) {
  return dateMomentLocalInUTC.format(moment.HTML5_FMT.DATE)

  // return dateMomentLocalInUTC.toISOString( true) // this works too
}

function App() {
  const [payloadForSubmit, setPayloadForSubmit] = useState({})

  const onFinish = ({date }) => {
    const payloadForSubmit = {
      actualSent: date,
      actualPersisted: simulatePGPersist(date),
      expectedPersisted: to8601(date)
    }

    setPayloadForSubmit(payloadForSubmit)
  };

  const actualPersisted = simulatePGPersist(payloadForSubmit?.actualSent)
  const expectedPersisted = payloadForSubmit?.expectedPersisted

  const parsedSubmittedPayload = Object.keys(payloadForSubmit).length > 0 ?  { actual: moment(actualPersisted).format('DD/MM/YYYY'), expected: moment(expectedPersisted).format('DD/MM/YYYY') }: {}


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
    <h2>Write: For Submit</h2>
    <pre>{JSON.stringify(payloadForSubmit, null, 2)}</pre>
    <br />
    <h2>Read: For retrieval</h2>
    <pre>{JSON.stringify(parsedSubmittedPayload, null, 2)}</pre>


    </Form>


  );
}

export default App;
