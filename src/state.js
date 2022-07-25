export default function (p5) {
	p5.State = function (...args) {
		if (typeof args[0] === 'object' && args[0] instanceof p5) {
			const p = args.shift();
			this._frameCount = () => p.frameCount;

			Object.defineProperty(this, 'countFrames', {
				get() {
					return this.frames <= this._frameCount();
				},
				set(frames) {
					this.frames = frames + this._frameCount();
				},
				enumerable: true,
				configurable: false
			});
		}
		else {
			Object.defineProperty(this, 'countFrames', {
				get() {
					return this.frames <= window.frameCount;
				},
				set(frames) {
					this.frames = frames + window.frameCount;
				},
				enumerable: true,
				configurable: false
			});
		}

		this.values = [...args];
		this.value = 0;
		this.frames = 0;

		const decorator = (fn, ...args) => {
			fn.call(this, ...args);
			return this.get();
			// return console.log(this.get());
		};
		for (const name of ['set', 'next', 'prev']) {
			this[name] = decorator.bind(null, this[name]);
		}
	};

	p5.State.prototype.set = function(string) {
		// if (!this.values.includes(string)) console.error('wrong state argument');
		if (!!!~this.values.indexOf(string)) console.error('wrong state argument');

		this.value = this.values.indexOf(string);
	}
	p5.State.prototype.get = function() {
		return this.values[this.value];
	}
	p5.State.prototype.is = function(...args) {
		// return args.includes(this.get());
		return !!~args.indexOf(this.get());
	}
	p5.State.prototype.next = function() {
		this.value = (this.value + 1) % this.values.length;
	}
	p5.State.prototype.prev = function() {
		this.value = (this.value + this.values.length - 1) % this.values.length;
	}
}