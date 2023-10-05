import React from 'react';
import WordCloud from 'react-d3-cloud';

export default function Cloud() {

  const data = [
    { text: 'Hey', value: 100 },
    { text: 'Hey', value: 120 },
    { text: 'Hey', value: 140 },
    { text: 'Hey', value: 140 },
    { text: 'Hey', value: 140 },
    { text: 'Hey', value: 140 },
    { text: 'Hey', value: 140 },
    { text: 'Hey', value: 140 },
    { text: 'Hey', value: 140 },
    { text: 'Hey', value: 140 },
    { text: 'Hey', value: 140 },
    { text: 'Hey', value: 140 },
    { text: 'Hey', value: 140 },
    { text: 'Hey', value: 140 },
    { text: 'Hey', value: 140 },
    { text: 'Hey', value: 140 },
    { text: 'Hey', value: 140 },
    { text: 'lol', value: 2201 },
    { text: 'lol', value: 2201 },
    { text: 'lol', value: 200 },
    { text: 'lol', value: 200 },
    { text: 'lol', value: 240 },
    { text: 'lol', value: 24000 },
    { text: 'lol', value: 24000 },
    { text: 'lol', value: 24000 },
    { text: 'lol', value: 24000 },
    { text: 'lol', value: 24000 },
    { text: 'lol', value: 240 },
    { text: 'lol', value: 240 },
    { text: 'lol', value: 240 },
    { text: 'duck', value: 20 },
    { text: 'duck', value: 21130 },
    { text: 'duck', value: 21130 },
    { text: 'duck', value: 21130 },
    { text: 'duck', value: 21130 },
    { text: 'duck', value: 21130 },
    { text: 'duck', value: 20 },
    { text: 'duck', value: 20 },
    { text: 'duck', value: 20 },
  ];

  return (
    <WordCloud
      data={data}
      width={1200}
      height={500}
      font={'preRg'}
      fontWeight={'bold'}
      fontSize={(word) => Math.log2(word.value) * 7}
      spiral={'rectangular'}
      rotate={(word) => word.value * 90}
      onWordMouseOver={(event, d) => {
        console.log(`onWordMouseOver: ${d.text}`);
      }}
      // fill={["#ffffff"]}
    />
  )
}



