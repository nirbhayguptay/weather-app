console.log("Client Side javascript file loaded");

function submit() {
  address = document.getElementById("address").value;

  const url = `http://localhost:3000/weather?address=${address}`;

  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        document.getElementById("message-1").innerHTML = data.error;
      } else {
        document.getElementById("message-1").innerHTML = data.location;
        document.getElementById("message-2").innerHTML = data.forecastData;
      }
    });
  });
}
