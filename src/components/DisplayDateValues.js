import {  Form } from 'antd';
import moment from 'moment'



export default function DisplayDateValues() {
  const form = Form.useFormInstance ();
  const dateMoment = Form.useWatch ('date', form);

  const buildDateDisplays = () => {
    return JSON.stringify({ "date (moment)": dateMoment, "moment utc": moment().utc(),  "currentTime moment.format": moment().format(), }, null, 2)
  }

  return(
    <>
    <h2>Date Picker values (in flight)</h2>
    <pre>{buildDateDisplays()}</pre>
    </>
  )
}
