import moment from 'moment'

function simulatePGPersist(dateMomentLocalInUTC) {
    return dateMomentLocalInUTC?.toISOString().split('T', 1)[0]
  }

  function to8601(dateMomentLocalInUTC) {
    return dateMomentLocalInUTC.format(moment.HTML5_FMT.DATE)

    // return dateMomentLocalInUTC.toISOString( true) // this works too
  }


  export {
    simulatePGPersist, to8601
  }