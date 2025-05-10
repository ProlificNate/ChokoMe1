export default topup =(amount,phoneNumber)=>{
  const options = {
    method: 'POST',
    headers: {'X-API-Key': 't7hJfI56vOkb1xxAjbY0n', 'Content-Type': 'application/json'},
    body: JSON.stringify(amount,phoneNumber),
  };
  
  fetch('https://api.pay.staging.mynkwa.com/collect', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}