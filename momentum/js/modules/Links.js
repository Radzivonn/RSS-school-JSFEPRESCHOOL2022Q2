const LinksButon = document.querySelector('.Links');
const socialMediaPopup = document.querySelector('.social-media');
const Links__Wrapper = document.querySelector('.Links__Wrapper');

function windowClickFunction(e) {
	if (!e.target.closest('.Links__Wrapper') && !e.target.closest('.Links')) {
		CloseLinksWidget(); // закрыть виджет Links, если кликнули по окну вне виджета
	}
}

const OpenLinksWidget = () => {
	LinksButon.classList.add('hidden');
	Links__Wrapper.classList.add('open');
	socialMediaPopup.classList.add('open');
	window.addEventListener('click', windowClickFunction);
}

const CloseLinksWidget = () => {
	LinksButon.classList.remove('hidden');
	Links__Wrapper.classList.remove('open');
	socialMediaPopup.classList.remove('open');
	window.removeEventListener('click', windowClickFunction);
}

LinksButon.addEventListener('click', OpenLinksWidget);