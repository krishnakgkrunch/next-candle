import React from 'react';
import Image from '../utility/images/stock.jpg';
export default function Notifications(props) {
  let msg = props.msg;
  function showNotification() {
    const notification = new Notification('New Notification', {
      body: props.msg,
      icon: '',
    });
    notification.onclick = (e) => {
      window.location.href = 'https://thenextcandle.kgkrunch.com/';
    };
  }
  showNotification();
  console.log(Notification.permission);

  return (
    <></>
    // <div>
    //   <img src={Image} />
    // </div>
  );
}
