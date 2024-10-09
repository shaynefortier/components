class Accordions {
	constructor(element, options = {}) {
		const defaults = {
			closeDelay: 300,
			oneActiveOnly: false,
		};
		this.timerOut;

		console.log(HTMLElement.prototype.isPrototypeOf(element));
		if (typeof element === 'string') {
			this.element = document.querySelector(element);
		} else if (HTMLElement.prototype.isPrototypeOf(element)) {
			this.element = element;
		} else {
			throw new Error('Element must be a string or an HTMLElement');
		}

		this.headers = this.element.querySelectorAll('.header');
		this.panels = this.element.querySelectorAll('.panel');
		this.options = { ...defaults, ...options };

		this.init();
	}

	init() {
		const items = this.element.querySelectorAll('.item');

		items.forEach((item, index) => {
			const header = item.querySelector('.header');

			header.setAttribute('aria-expanded', 'false');

			header.addEventListener('click', (e) => {
				const panel = item.querySelector('.panel');

				if (this.options.oneActiveOnly) {
					this.panels.forEach((region, index) => {
						if (region !== panel) {
							this.headers[index].setAttribute('aria-expanded', 'false');
							this.togglePanel(region, false);
						}
					});
				}

				if (header.getAttribute('aria-expanded') == 'false') {
					header.setAttribute('aria-expanded', 'true');
					this.togglePanel(panel, true);
				} else {
					header.setAttribute('aria-expanded', 'false');
					this.togglePanel(panel, false);
				}
			});
		});

		// TODO: Add keyboard support
	}

	togglePanel(panel, show) {
		if (show) {
			clearTimeout(this.timerOut);
			panel.removeAttribute('hidden');
		} else {
			clearTimeout(this.timerOut);
			this.timerOut = setTimeout(() => {
				panel.setAttribute('hidden', '');
			}, 300);
		}
	}
}
