async function loadComponent(id, file) {
	try {
			const response = await fetch(file);
			if (response.ok) {
					document.getElementById(id).innerHTML = await response.text();
			} else {
					console.error(`Ошибка загрузки ${file}`);
			}
	} catch (error) {
			console.error(error);
	}
}

loadComponent('header', 'header.html');
loadComponent('main', 'main.html');
loadComponent('footer', 'footer.html');