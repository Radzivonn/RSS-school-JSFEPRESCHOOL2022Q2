const MAX = 20, MIN = 1; // диапазон рандомных чисел для смены фона 

const getRandomNum = (MIN, MAX) => Math.floor(Math.random() * (Math.floor(MAX) - Math.ceil(MIN) + 1)) + Math.ceil(MIN);

function ChangeSelectElement(id, valueToSelect)
{    
  let element = document.getElementById(id);
  // console.log(element);
  element.value = valueToSelect;
  // console.log(element.value);
}

export {MAX, MIN, getRandomNum, ChangeSelectElement};