const weatherForm=document.querySelector('form')
const search=document.querySelector('input');
const messageOne=document.querySelector('#message-1');
const messageTwo=document.querySelector('#message-2');

weatherForm.addEventListener('submit',async(e)=>{
  messageOne.textContent='LOADING....';
  messageTwo.textContent='';
  e.preventDefault();
  const location=search.value;
  const response = await fetch(`http://localhost:3000/weather?address=${location}`);
  const data = await response.json();
  if (data.error) {
    messageOne.textContent=data.error
  } else {
    messageOne.textContent=data.location
    messageTwo.textContent=data.forecast
  }
})