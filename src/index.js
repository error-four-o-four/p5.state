import addStateClass from './state.js';

function initialize(p5) {
	addStateClass(p5);

	p5.prototype.createState = function (...args) {
		return (this._isGlobal)
			? new p5.State(...args)
			: new p5.State(this, ...args);
	};
}

if (window.p5 !== undefined) initialize(window.p5);

export default initialize;