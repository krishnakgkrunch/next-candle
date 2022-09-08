import React from 'react';
import audio from '../audio/thinkorswim_bell.mp3';
export default function Audio() {
  //   let kg_audio = document.getElementById('kg_adi');
  //   kg_audio.onload = function () {
  //     console.log('Browser has loaded the current frame');
  //   };
  return (
    <>
      <audio id="kg_adi" autoPlay="autoplay" controls="controls">
        <source src={audio} type="audio/mp3" />
      </audio>
    </>
  );
}
