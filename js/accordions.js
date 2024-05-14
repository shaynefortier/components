class Accordion {
	constructor(element, options = {}) {
		this.element = element;
		this.options = {
			closeDelay: options.closeDelay ? options.closeDelay : 300,
		};

		this.init();
	}

	init() {
		const items = this.element.querySelectorAll('.item');

		items.forEach((item) => {
			const header = item.querySelector('.header');

			header.addEventListener('click', () => {
				const panel = item.querySelector('.panel');

				if (header.getAttribute('aria-expanded') == 'false') {
					header.setAttribute('aria-expanded', 'true');
					this.togglePanel(panel, true);
				} else {
					header.setAttribute('aria-expanded', 'false');
					this.togglePanel(panel, false);
				}
			});
		});
	}

	togglePanel(panel, show) {
		if (show) {
			panel.removeAttribute('hidden');
		} else {
			setTimeout(() => {
				panel.setAttribute('hidden', '');
			}, this.options.closeDelay);
		}
	}
}
