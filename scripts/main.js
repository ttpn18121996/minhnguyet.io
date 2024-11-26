'use strict';

const MyWish = (function (_data) {
  const elements = {
    heading: null,
    message: null,
  };
  let key;

  function setup() {
    const urlSearchParam = new URLSearchParams(window.location.search);
    key = urlSearchParam.get('key');
    elements.heading = document.getElementById('heading');
    elements.message = document.getElementById('message');

    const data = getData(key);
    document.title = data.title;

    return run();
  }

  function getData(key) {
    return _data?.[key] ?? _data.protector;
  }

  function runProtect() {
    const data = getData('protector');
    autoType(data.heading, elements.heading);
    autoType(data.message, elements.message);
  }

  function run() {
    const data = getData(key ?? 'protector');
    autoType(data.heading, elements.heading);
    autoType(data.message, elements.message);
  }

  function autoType(text, element, options = {}) {
    let i = 0;
    const cursor = options?.cursor ?? '|';
    let result = cursor;
    let timeout = options?.timeout ?? 100;
    let interval;

    if (!text) {
      return;
    }

    interval = setInterval(function () {
      result = result.replace(new RegExp('\\' + cursor + '$'), '') + text[i] + cursor;

      if (element.innerText.length > text.length) {
        clearInterval(interval);
        element.innerText = element.innerText.replace(new RegExp('\\' + cursor + '$'), '');
        return;
      }

      element.innerText = result;
      i++;
    }, timeout);
  }

  return {
    setup,
    runProtect,
  };
})(data);

MyWish.setup();
