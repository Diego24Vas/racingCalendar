fetch('https://api.openf1.org/v1/drivers?session_key=9158')
  .then(response => response.json())
  .then(jsonContent => {
    const resultsElement = document.getElementById('results');
    jsonContent.forEach(driver => {
      const driverElement = document.createElement('div');
      driverElement.style.border = '1px solid #ccc';
      driverElement.style.padding = '10px';
      driverElement.style.margin = '10px';
      driverElement.style.textAlign = 'center';

      const imgElement = document.createElement('img');
      imgElement.src = driver.headshot_url;
      imgElement.alt = `${driver.full_name} headshot`;
      imgElement.style.width = '100px';
      imgElement.style.height = '100px';
      imgElement.style.borderRadius = '50%';

      const nameElement = document.createElement('p');
      nameElement.textContent = driver.full_name;

      const teamElement = document.createElement('p');
      teamElement.textContent = driver.team_name;
      teamElement.style.color = `#${driver.team_colour}`;

      driverElement.appendChild(imgElement);
      driverElement.appendChild(nameElement);
      driverElement.appendChild(teamElement);

      resultsElement.appendChild(driverElement);
    });
  })
  .catch(error => console.error('Error:', error));