class Tabs {
	constructor(element, options = {}) {
		this.element = element;
		this.panels = this.element.querySelectorAll('.panel');
		this.items = this.element.querySelectorAll('.tab-items a');

		this.init();
	}

	init() {
		const tabContainer = this.element.querySelector('.tab-items');

		tabContainer.setAttribute('role', 'tablist');

		this.items.forEach((item, index) => {
			item.setAttribute('role', 'tab');

			if (index !== 0) {
				item.setAttribute('tabindex', '-1');
				this.panels[index].setAttribute('hidden', '');
			} else {
				item.setAttribute('aria-selected', 'true');
			}

			item.parentElement.setAttribute('role', 'presentation');
		});

		this.panels.forEach((panel) => {
			panel.setAttribute('tabindex', '0');
		});

		tabContainer.addEventListener('click', (e) => {
			const target = e.target.closest('a');
			if (!target) return;
			e.preventDefault();

			this.switchTab(target);
		});

		tabContainer.addEventListener('keydown', (e) => {
			switch (e.key) {
				case 'ArrowRight':
					this.moveRight();
					break;
				case 'ArrowLeft':
					this.moveLeft();
					break;
				case 'Home':
					e.preventDefault();
					this.switchTab(this.items[0]);
					break;
				case 'End':
					e.preventDefault();
					this.switchTab(this.items[this.items.length - 1]);
					break;
			}
		});
	}

	switchTab(tab) {
		const activePanelId = tab.getAttribute('href');
		const activePanel = this.element.querySelector(activePanelId);

		this.panels.forEach((panel) => {
			panel.setAttribute('hidden', '');
		});

		this.items.forEach((item) => {
			item.setAttribute('aria-selected', 'false');
			item.setAttribute('tabindex', '-1');
		});

		activePanel.removeAttribute('hidden');
		tab.setAttribute('aria-selected', 'true');
		tab.setAttribute('tabindex', '0');
		tab.focus();
	}

	moveLeft() {
		const currentTab = document.activeElement;

		if (!currentTab.parentElement.previousElementSibling) {
			this.switchTab(this.items[this.items.length - 1]);
		} else {
			this.switchTab(
				currentTab.parentElement.previousElementSibling.querySelector(
					'a'
				)
			);
		}
	}

	moveRight() {
		const currentTab = document.activeElement;

		if (!currentTab.parentElement.nextElementSibling) {
			this.switchTab(this.items[0]);
		} else {
			this.switchTab(
				currentTab.parentElement.nextElementSibling.querySelector('a')
			);
		}
	}
}
