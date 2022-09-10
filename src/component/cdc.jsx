import React, { useEffect, useState, useRef } from 'react';
import Flag from 'react-world-flags';
import '../utility/kg_custom.css';
import Notifications from './notification';
import Audio from './audio';
import Cookies from 'js-cookie';
import { Switch } from '@mui/material';
import AudioMp3 from '../audio/thinkorswim_bell.mp3';
import ReactDOM from 'react-dom';
export default function Cdc() 
{
  const [date, setDate] = React.useState(new Date());
  let myRef = useRef(null);
  let CookiesStatus = Cookies.get('notiStatus');
  let [switchStatus, setSwitchStatus] = useState(
    CookiesStatus === 'OFF' ? false : true
  );

  let CandleDiffChange, NotificationMsg;
  let candle = false;
  let finalGranted = false;
  let customNotStatus = true;
  const current_date = new Date();
  const CurrentUsTime = current_date.toLocaleString('en-US', 
  {
      timeZone: 'America/New_York',
      hour24: true,
      timeStyle: 'medium',
  }
  );

  const CurrentUkTime = current_date.toLocaleString('en-US', 
  {
      timeZone: 'Europe/London',
      hour24: true,
      timeStyle: 'medium',
  }
  );

  // Start code for 4hour Candle
  let candleTimeDiff;
  const UTCCurrentTime =
    current_date.getUTCHours() +
    ':' +
    current_date.getUTCMinutes() +
    ':' +
    current_date.getUTCSeconds();
  const UTCTimeHour = current_date.getUTCHours();
  if (UTCTimeHour / 4 >= 1 && UTCTimeHour / 4 < 2) 
  {
    candleTimeDiff = getTimeDiffrence(UTCCurrentTime, '07:59:59');
  } 
  else if (UTCTimeHour / 4 >= 2 && UTCTimeHour / 4 < 3) 
  {
    candleTimeDiff = getTimeDiffrence(UTCCurrentTime, '11:59:59');
  } 
  else if (UTCTimeHour / 4 >= 3 && UTCTimeHour / 4 < 4) 
  {
    candleTimeDiff = getTimeDiffrence(UTCCurrentTime, '15:59:59');
  } 
  else if (UTCTimeHour / 4 >= 4 && UTCTimeHour / 4 < 5) 
  {
    candleTimeDiff = getTimeDiffrence(UTCCurrentTime, '19:59:59');
  } 
  else if (UTCTimeHour / 4 >= 5) 
  {
    candleTimeDiff = getTimeDiffrence(UTCCurrentTime, '23:59:59');
  } 
  else 
  {
    candleTimeDiff = getTimeDiffrence(UTCCurrentTime, '03:59:59');
  }

  CandleDiffChange = candleTimeDiff.split(':');

  if (parseInt(CandleDiffChange[0]) === 0 && parseInt(CandleDiffChange[1]) < 30) 
  {
    candle = true;
  } 
  else 
  {
    candle = false;
  }

  document.title = candleTimeDiff;

  // End code for 4hour Candle

  // START code for US Market Hours Block

  let CurrentUsTime2 = current_date.toLocaleString('en-US', 
  {
      timeZone: 'America/New_York',
      hour12: false,
      timeStyle: 'medium',
  }
  );

  const USTime = date.toLocaleString('en-US', {
    timeZone: 'America/New_York',
  });

  const [dateValuesUS, timeValuesUS] = USTime.split(' ');
  const usDate = +new Date(dateValuesUS.slice(0, -1) + ' ' + timeValuesUS);
  const usNewDate = new Date(usDate);
  let usDay = usNewDate.getDay();

  if (usDay === 1) 
  {
    usDay = 'Mons';
  } 
  else if (usDay === 2)
  {
    usDay = 'Tues';
  } 
  else if (usDay === 3) 
  {
    usDay = 'Weds';
  } 
  else if (usDay === 4) 
  {
    usDay = 'Thus';
  } 
  else if (usDay === 5) 
  {
    usDay = 'Fris';
  } 
  else if (usDay === 6) 
  {
    usDay = 'Sats';
  } 
  else if (usDay === 7) 
  {
    usDay = 'Suns';
  }
  
  let CurrentUsHour = current_date.toLocaleString('en-US', 
  {
    //timeZone: 'Asia/Calcutta',
      timeZone: 'America/New_York',
      hour12: false,
      hour: 'numeric',
  }
  );
  let CurrentUsMinute = current_date.toLocaleString('en-US',
   {
      timeZone: 'America/New_York',
      hour12: false,
      minute: 'numeric',
  }
  );

  let CurrentUsWeekday = current_date.toLocaleString('en-US', 
  {
      timeZone: 'America/New_York',
      weekday: 'long',
  }
  );

  let USBack = false;
  let USMarketString, USDiff, USNotification, USBellString, USClass;
  let USWeekday = false;
  let USDiffChange = [];
  let UsMarketStartMins = 570;
  let UsMarketEndMins = 960;
  let UsMarketOpenInMins = 90;
  let UsMarketCurrentMins = parseInt(CurrentUsHour * 60) + parseInt(CurrentUsMinute);
  if (CurrentUsWeekday == 'Saturday' || CurrentUsWeekday == 'Sunday' || (CurrentUsWeekday == 'Friday' && UsMarketCurrentMins >= UsMarketEndMins)) 
  {
    USMarketString = 'WEEKEND!';
    USClass = 'close';
    USBellString = '';
    USWeekday = true;
    USNotification = 'US MARKETS WEEKEND!';
  } 
  else if (UsMarketCurrentMins >= UsMarketStartMins && UsMarketCurrentMins < UsMarketEndMins) 
  {
    USMarketString = 'OPEN';
    USClass = 'open';
    USBellString = 'Closing Bell in';
    USNotification = 'US MARKETS WII BE OPEN SOON!';
    USDiff = getTimeDiffrence(CurrentUsTime2, '15:59:59');
    USDiffChange = USDiff.split(':');
  } 
  else if (UsMarketCurrentMins >= UsMarketEndMins || UsMarketCurrentMins < UsMarketStartMins) 
  {
    USMarketString = 'CLOSED';
    USClass = 'close';
    USBellString = 'Opening Bell in';
    USNotification = 'US MARKETS OPENED!!';

    let usCurrent = CurrentUsTime2.split(':')[0];
    if (parseInt(usCurrent) < 25 && parseInt(usCurrent) > 16) 
    {
      USDiff = getTimeDiffrence(CurrentUsTime2, '32:29:59');
    } 
    else 
    {
      USDiff = getTimeDiffrence(CurrentUsTime2, '09:29:59');
    }
    USDiffChange = USDiff.split(':');
  } 
  else 
  {
  }
  // End code for US Market Hours Block

  // START code for UK Market Hours Block
  const CurrentUkTime2 = current_date.toLocaleString('en-US', 
  {
      timeZone: 'Europe/London',
      hour12: false,
      timeStyle: 'medium',
  }
  );
  let CurrentUkHour = current_date.toLocaleString('en-US', 
  {
    //timeZone: 'Asia/Calcutta',
      timeZone: 'Europe/London',
      hour12: false,
      hour: 'numeric',
  }
  );
  let CurrentUkMinute = current_date.toLocaleString('en-US', 
  {
      timeZone: 'Europe/London',
      hour12: false,
      minute: 'numeric',
  }
  );
  let CurrentUkWeekday = current_date.toLocaleString('en-US',
    {
      timeZone: 'Europe/London',
      weekday: 'long',
    }
  )
  ;
  const UKTime = date.toLocaleString('en-US', {
    timeZone: 'Europe/London',
  });
  const [dateValuesUK, timeValuesUK] = UKTime.split(' ');
  const ukDate = +new Date(dateValuesUK.slice(0, -1) + ' ' + timeValuesUK);
  const ukNewDate = new Date(ukDate);
  let ukDay = ukNewDate.getDay();

  if (ukDay === 1) {
    ukDay = 'Mons';
  } else if (ukDay === 2) {
    ukDay = 'Tues';
  } else if (ukDay === 3) {
    ukDay = 'Weds';
  } else if (ukDay === 4) {
    ukDay = 'Thus';
  } else if (ukDay === 5) {
    ukDay = 'Fris';
  } else if (ukDay === 6) {
    ukDay = 'Sats';
  } else if (ukDay === 7) {
    ukDay = 'Suns';
  }
  let UKBack = false;
  let UKMarketString, UKDiff, UKNotification, UKBellString, UKClass;
  let UKDiffChange = [];
  let UKWeekday = false;
  let UkMarketStartMins = 480;
  let UkMarketEndMins = 960;
  let UkMarketOpenInMins = 0;
  let UkMarketCurrentMins =
    parseInt(CurrentUkHour * 60) + parseInt(CurrentUkMinute);

  if (CurrentUkWeekday == 'Saturday' || CurrentUkWeekday == 'Sunday' || (CurrentUkWeekday == 'Friday' && UkMarketCurrentMins >= UkMarketEndMins)) 
  {
    UKMarketString = 'WEEKEND!';
    UKClass = 'close';
    UKWeekday = true;
    UKBellString = '';
    UKNotification = 'UK MARKETS WEEKEND!';
  } 
  else if (UkMarketCurrentMins >= UkMarketStartMins && UkMarketCurrentMins < UkMarketEndMins) 
  {
    UKMarketString = 'OPEN';
    UKClass = 'open';
    UKBellString = 'Closing Bell in';
    UKNotification = 'UK MARKETS WII BE OPEN SOON!!';
    UKDiff = getTimeDiffrence(CurrentUkTime2, '15:59:59');
    UKDiffChange = UKDiff.split(':');
  } 
  else if (UkMarketCurrentMins >= UkMarketEndMins || UkMarketCurrentMins < UkMarketStartMins) 
  {

    UKNotification = 'UK MARKETS OPENED!';
    UKMarketString = 'CLOSED';
    UKClass = 'close';
    UKBellString = 'Opening Bell in';
    let ukCurrent = CurrentUkTime2.split(':')[0];
    if (parseInt(ukCurrent) < 25 && parseInt(ukCurrent) > 16) 
    {
      UKDiff = getTimeDiffrence(CurrentUkTime2, '30:00:00');
    } 
    else 
    {
      UKDiff = getTimeDiffrence(CurrentUkTime2, '07:59:59');
    }
    UKDiffChange = UKDiff.split(':');
  } 
  else 
  {
  }
  // End code for UK Market Hours Block

  //Replaces componentDidMount and componentWillUnmount
  React.useEffect(() => 
  {
    var timerID = setInterval(() => tick(), 1000);
    return function cleanup() 
    {
      clearInterval(timerID);
    };
  });
  function tick() 
  {
    setDate(new Date());
  }

  //console.log('test');
  function getTimeDiffrence(fromTime, toTime) 
  {
    var time_start = new Date();
    var time_end = new Date();
    var value_start = fromTime.split(':');
    var value_end = toTime.split(':');

    time_start.setHours(value_start[0], value_start[1], value_start[2], 0);
    time_end.setHours(value_end[0], value_end[1], value_end[2], 0);

    let value = time_end - time_start; // millisecond

    const sec = parseInt(value, 10) / 1000; // convert value to number if it's string
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
    let seconds = Math.floor(sec - hours * 3600 - minutes * 60); //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours < 10) 
    {
      hours = '0' + hours;
    }
    if (minutes < 10) 
    {
      minutes = '0' + minutes;
    }
    if (seconds < 10) 
    {
      seconds = '0' + seconds;
    }
    return hours + ':' + minutes + ':' + seconds; // Return is HH : MM : SS
  }

  const CurrentUsHourNew = ((parseInt(CurrentUsHour) + 11) % 12) + 1;
  const CurrentUkHourNew = ((parseInt(CurrentUkHour) + 11) % 12) + 1;
  if (parseInt(CandleDiffChange[0]) === 0 && parseInt(CandleDiffChange[1]) === 0 && parseInt(CandleDiffChange[2]) === 0)
  {
    NotificationMsg = 'Candle Changed!!';
  } 
  else if (parseInt(USDiffChange[0]) === 0 && parseInt(USDiffChange[1]) === 0 && parseInt(USDiffChange[2]) === 0)
  {
    NotificationMsg = USNotification;
  } 
  else if (parseInt(UKDiffChange[0]) === 0 && parseInt(UKDiffChange[1]) === 0 && parseInt(UKDiffChange[2]) === 0)
  {
    NotificationMsg = UKNotification;
  } 
  else if (parseInt(USDiffChange[0]) === 0 && parseInt(USDiffChange[1]) === 0 && parseInt(USDiffChange[2]) === 0 && parseInt(UKDiffChange[0]) === 0 && parseInt(UKDiffChange[1]) === 0 && parseInt(UKDiffChange[2]) === 0) 
  {
    NotificationMsg = USNotification + '' + UKNotification;
  }
  if (Notification.permission === 'granted') 
  {
    finalGranted = true;
  } 
  else if (Notification.permission !== 'denied') 
  {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') 
      {
        finalGranted = true;
      }
    });
  }

  const NotificationChangeHandler = () => 
  {
    const newCustomNotStatus = !switchStatus;
    setSwitchStatus(newCustomNotStatus);
    Cookies.set('notiStatus', newCustomNotStatus ? 'ON' : 'OFF');
  };

  return (
    <div>
      <h1>
        <span>NEXT 4H CANDLE IN</span>
        {candle ? (
          <span style={{ backgroundColor: '#FF8C00' }} className="kg_digital">
            {candleTimeDiff}
          </span>
        ) : (
          <span className="kg_digital">{candleTimeDiff}</span>
        )}
      </h1>
      <br />
      <div className="kg_info_wrap kg_us_market">
        <h1>
          <span>
            <Flag code="US" />
            US MARKETS
            <span className={`kg_status ${USClass}`}> {USMarketString}</span>
          </span>
        </h1>
        {USWeekday ? (
          ''
        ) : (
          <h2 className="kg_bell_status">
            {USBellString}{' '}
            <span className="kg_digital">{parseInt(USDiffChange[0])}</span>{' '}
            hours{' '}
            <span className="kg_digital">{parseInt(USDiffChange[1])}</span> mins
          </h2>
        )}

        <h2>
          (it's {CurrentUsHourNew}:
          {CurrentUsMinute < 10 ? '0' + CurrentUsMinute : CurrentUsMinute}
          {parseInt(CurrentUsHour) >= 12 && parseInt(CurrentUsHour) !== 24
            ? 'pm'
            : 'am'}{' '}
          on {usDay} in New York)
        </h2>
      </div>
      <div className="kg_info_wrap kg_uk_market">
        <h1>
          <span>
            <Flag code="GB" />
            UK MARKETS
            <span className={`kg_status ${UKClass}`}> {UKMarketString}</span>
          </span>
        </h1>
        {UKWeekday ? (
          ''
        ) : (
          <h2 className="kg_bell_status">
            {UKBellString}{' '}
            <span className="kg_digital">{parseInt(UKDiffChange[0])}</span>{' '}
            hours{' '}
            <span className="kg_digital">{parseInt(UKDiffChange[1])}</span> mins
          </h2>
        )}

        <h2>
          (it's {CurrentUkHourNew}:
          {CurrentUkMinute < 10 ? '0' + CurrentUkMinute : CurrentUkMinute}
          {parseInt(CurrentUkHour) >= 12 && parseInt(CurrentUkHour) !== 24
            ? 'pm'
            : 'am'}{' '}
          on {ukDay} in London)
        </h2>
      </div>
      <div className="kg_switch">
        {'Notify on Market Opens'}
        <Switch
          checked={switchStatus}
          onChange={NotificationChangeHandler}
        ></Switch>
      </div>

      {finalGranted && switchStatus ? (
        (parseInt(CandleDiffChange[0]) === 0 &&
          parseInt(CandleDiffChange[1]) === 0 &&
          parseInt(CandleDiffChange[2]) === 0) ||
        (parseInt(USDiffChange[0]) === 0 &&
          parseInt(USDiffChange[1]) === 0 &&
          parseInt(USDiffChange[2]) === 0) ||
        (parseInt(UKDiffChange[0]) === 0 &&
          parseInt(UKDiffChange[1]) === 0 &&
          parseInt(UKDiffChange[2]) === 0) ? (
          <Notifications msg={NotificationMsg} />
        ) : (
          ''
        )
      ) : (
        ''
      )}
      {/* <Notifications /> */}
      {/* <button type="button" ref={myRef}>
        Click
      </button> */}
    </div>
  );
}
