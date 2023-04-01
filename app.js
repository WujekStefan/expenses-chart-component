const weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

(async function() {
  try {
    const response = await axios.get('/data.json');
    render(response.data)
  } catch (error) {
    console.log('Error', error);
  }
})();

function render(data) {
  const currentDay = getCurrentDay();
  console.log(data);
  const highestAmount = getHighestAmount(data);
  data.forEach( (day) => {
    setData(day, currentDay, highestAmount);
  })
}

function getHighestAmount(data) {
  const day = data.reduce(
    (prev, current) => {
      return prev.amount > current.amount ? prev : current
    }  
  );
  return day.amount;
}

function setData(data, currentDay, highestAmount) {
  const div = document.querySelector(`#${data.day}`)
  div.setAttribute('data-day',currentDay===data.day);
  div.setAttribute('data-value', data.amount);
  const percentage = data.amount/highestAmount*100;
  div.style.height = percentage + '%';
}

function getCurrentDay() {
  const d = new Date();
  let day = d.getDay();
  return weekDays[day-1] 
}