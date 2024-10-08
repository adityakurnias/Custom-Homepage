function search() {
  const searchBox = document.getElementById("search-box").value;
  const link = "https://google.com/search?q=";

  window.open(link + searchBox);
}

function time() {
  const time = new Date(),
  hours = time.getHours(),
  minutes = time.getMinutes(),
  seconds = time.getSeconds();

  return (
    hours + ':' + minutes + ':' + seconds
  )
}

window.onload = () => {
    document.getElementById('time').innerHTML = time()
    setInterval(() => {
        document.getElementById('time').innerHTML = time()
    }, 200)
}
