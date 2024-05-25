let tg = window.Telegram.WebApp;


document.getElementById('main-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  // Now you can use formData.get('foo'), for example.
  // Don't forget e.preventDefault() if you want to stop normal form .submission
  let dataObject = {
    'region' : formData.get('region'),
    'name' : formData.get('name'),
    'company' : formData.get('company'),
    'tags' : formData.get('tags'),
    'notes' : formData.get('notes'),
  }
  tg.sendData(JSON.stringify(dataObject));
  console.log(dataObject)
});

