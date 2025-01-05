class TextReveal {
	constructor(elements, options = {}) {
		this.elements = elements;
		const defaultOptions = {};
		this.options = { ...defaultOptions, ...options };
		this.observer = new IntersectionObserver(this.activate.bind(this), {
			rootMargin: '0% 0% 0% 0%',
			threshold: 1,
		});

		this.init();
	}

	init() {
		for (let i = 0; i < this.elements.length; i++) {
			const element = this.elements[i];
			this.addSplitting(element);
		}
		TextReveal.splitWords();
	}

	activate(entries) {
		for (let i = 0; i < entries.length; i++) {
			const entry = entries[i];
			if (entry.isIntersecting) {
				const element = entry.target;
				element.classList.add('active');
				this.observer.unobserve(element);
			}
		}
	}

	addSplitting(element) {
		const paragraphs = element.querySelectorAll('p');

		for (let i = 0; i < paragraphs.length; i++) {
			const paragraph = paragraphs[i];
			paragraph.setAttribute('data-splitting', 'test');
			this.observer.observe(paragraph);
		}
	}

	static splitWords() {
		const paragraphs = Splitting({ by: 'lines' });

		for (let i = 0; i < paragraphs.length; i++) {
			const paragraph = paragraphs[i];
			let lines = '';

			for (let i = 0; i < paragraph.lines.length; i++) {
				const line = paragraph.lines[i];

				for (let i = 0; i < line.length; i++) {
					const word = line[i];
					word.style.setProperty('--word-index', i);
				}

				lines += `
					<span class="line"><div class="words">${line
						.map((word) => `${word.outerHTML}`)
						.join('<span class="whitespace"> </span>')}</div></span>
					`;
			}

			paragraph.el.innerHTML = lines;
		}
	}
}

const textRevealElements = document.querySelectorAll('.text-reveal');
new TextReveal(textRevealElements);
