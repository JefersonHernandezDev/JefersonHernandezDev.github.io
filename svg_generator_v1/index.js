function generateLabels({
  totalWidth,
  labelsYPos,
  limiteSuperior,
  intervalValue,
}) {
  const labels = [];
  const availableIntervals = limiteSuperior / intervalValue;

  const xOffset = totalWidth / availableIntervals; // 1024 / (100 / 5)

  for (let index = 0; index <= availableIntervals; index++) {
    labels.push(
      `<text x="0" y="15" fill="#666565" transform="matrix(1 0 0 1 ${
        index * xOffset
      } ${labelsYPos})">${index * intervalValue}</text>`
    );
  }

  return labels;
}

function generateSvg({
  totalWidth = 1000,
  basicColor = "#62A33D",
  cutof = 8,
  value,
  limiteSuperior,
  intervalValue,
  cutofValue = 0,
}) {
  const barHeight = 8;
  const cutofHeight = barHeight * 2.5;

  const dotSize = barHeight * 2.5;
  const labelsYPos = 10;

  const availableIntervals = limiteSuperior / intervalValue;
  const xOffsetByInterval = totalWidth / availableIntervals;
  const completeSections = value / intervalValue;
  const dotOffset = xOffsetByInterval * completeSections;
  const cutofOffset = xOffsetByInterval * (cutofValue / intervalValue);
  const gradientOffset = cutofOffset + cutof;

  let svg = `<?xml version="1.0" encoding="utf-8"?> 
  <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
  <svg version="1.1" id="Fullbar" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
       width="1024px" height="100px" viewBox="0 -32.669 1024 82.331" enable-background="new 0 -32.669 1024 82.331"
       xml:space="preserve">
  
  <linearGradient id="GradientBar_1_" gradientUnits="userSpaceOnUse" x1="${gradientOffset}" y1="7.6177" x2="${totalWidth}" y2="7.6177">
            <stop offset="0.0" style="stop-color:'#62A33D';stop-opacity:1.00" />
            <stop offset="0.0" style="stop-color:#62A33D;stop-opacity:1.00" />
  
            <stop offset="0.4" style="stop-color:rgb(230,247,12);stop-opacity:1.00" />
            <stop offset="0.6" style="stop-color:rgb(230,247,12);stop-opacity:1.00" />
  
            <stop offset="1.0" style="stop-color:rgb(197,6,22);stop-opacity:1.00" />
            <stop offset="1.0" style="stop-color:rgb(197,6,22);stop-opacity:1.00" />
  </linearGradient>
  <rect x="0" width="${cutofOffset}" height="${barHeight}" fill="${basicColor}"/>
  <rect x="${cutofOffset}"  y="-5"  width="${cutof}" rx="3" ry="3" height="${cutofHeight}" fill="#f5f5f5" />
  <rect x="${gradientOffset}" width="${totalWidth}" height="${barHeight}" fill="url(#GradientBar_1_)" />
  <rect x="${dotOffset}" y="-5" width="${dotSize}" rx="50" ry="50" height="${dotSize}" fill="#62A33D"   stroke="#f5f5f5" stroke-width="4"  />
  <text y="${50}" fill="#62A33D" x="${dotOffset}" font-size="18">${value}</text>
  <g>
    ${generateLabels({
      totalWidth,
      labelsYPos,
      limiteSuperior,
      intervalValue,
    })}
  </g>
  </svg>`;

  document.querySelector("#midcontentadcontainer").innerHTML = svg;
  document.querySelector("#svg_string").innerText = svg;
}

document.getElementById("btnGenerate").onclick = () => {
  generateSvg({
    value: document.querySelector("#inputValue").value,
    limiteSuperior: document.querySelector("#inputLimiteSuperior").value,
    intervalValue: document.querySelector("#inputIntervalo").value,
    cutofValue: document.querySelector("#inputCutofValue").value,
  });
};

document.getElementById("btnBasic").onclick = () => {
  generateSvg({
    totalWidth: 1000,
    value: 30,
    limiteSuperior: 50,
    intervalValue: 5,
    cutofValue: 45,
  });
};

document.getElementById("btnExampleOne").onclick = () => {
  generateSvg({
    totalWidth: 1000,
    value: 30,
    limiteSuperior: 50,
    intervalValue: 5,
    cutofValue: 10,
  });
};

document.getElementById("btnExampleTwo").onclick = () => {
  generateSvg({
    totalWidth: 1000,
    value: 30,
    limiteSuperior: 100,
    intervalValue: 15,
    cutofValue: 45,
  });
};

document.getElementById("btnExampleThree").onclick = () => {
  generateSvg({
    totalWidth: 1000,
    value: 150,
    limiteSuperior: 200,
    intervalValue: 10,
    cutofValue: 20,
  });
};
