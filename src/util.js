import simplifyjs from 'simplify-js';

export const charToHex = (char) => {
  return ('00000' + char.charCodeAt(0).toString('16')).slice(-5);
};

export const fetchKanji = (kanji) => {
  const request = new XMLHttpRequest();

  return new Promise((resolve, reject) => {
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status === 200) {
          resolve({
            kanji: kanji,
            svg: request.response
          });
        }
        else {
          reject(request.statusText);
        }
      }
    };

    request.open('GET', `./kanji/${charToHex(kanji)}.svg`);
    request.send();
  });
};

export const parseSvg = (data) => {
  const div = document.createElement('div');
  div.innerHTML = data.svg;

  const strokes = Array
    .from(div.querySelectorAll(`path[id^="kvg:${charToHex(data.kanji)}-s"]`))
    .map((path) => path.getAttribute('d'));

  return Promise.resolve(strokes);
};

export const simplify = (points, ...args) => {
  points = points.map((p) => {
    return {x: p[0], y: p[1]};
  });

  return simplifyjs(points, ...args)
    .map((p) => [p.x, p.y]);
};

export const samplePath = (d, n) => {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', d);

  const l = path.getTotalLength();
  const part = l / (n - 1);
  const rv = [];

  for (let i = 0; i < n; i++) {
    const pt = path.getPointAtLength(part * i);
    rv.push([pt.x, pt.y]);
  }

  return rv;
};

export const parseJapanese = (str) => {
};

export default {
  charToHex: charToHex,
  fetchKanji: fetchKanji,
  parseSvg: parseSvg,
  simplify: simplify,
  samplePath: samplePath,
  parseJapanese: parseJapanese
};
