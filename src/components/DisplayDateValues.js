import {  Form } from 'antd';


export default function DisplayDateValues() {
  const form = Form.useFormInstance ();
  const dateMoment = Form.useWatch ('date', form);

  const buildDateDisplays = () => {
    return JSON.stringify({ "date (moment)": dateMoment }, null, 2)
  }

  return(
    <>
    <h2>Date Picker values (in flight)</h2>
    <pre>{buildDateDisplays()}</pre>
    </>
  )
}
