/**
api.root('div')
.append('div', {id: 'div1'})
.children()
.appendMany(3, 'span', (idx) => ({id: `span${idx}`, content: 'Hello'}))
.select('span')
.css('color', 'green')
.commit()
 */

function solution() {
    class DOMWorker {
        constructor(roots, prevContext = null) {
            this._roots = roots;
            this._prevContext = prevContext;
        }

        root(selector) {
            if (!this._roots) {
                this._roots = document.querySelectorAll(selector);
            }

            return this;
        }

        append(tag, attrs = {}) {
            if (!this._roots) return this;

            const { content, ...restAttrs } = attrs;
            const el = document.createElement(tag);
            if (content) {
                el.innerText = content;
            }
            if (restAttrs) {
                for (const key in restAttrs) {
                    el.setAttribute(key, restAttrs[key]);
                }
            }

            for (const root of this._roots) {
                root.appendChild(el);
            }

            return this;
        }

        appendMany(count, tag, attrs) {
            for (let i = 0; i < count; i++) {
                this.append(tag, typeof attrs === "function" ? attrs(i) : attrs);
            }

            return this;
        }

        css(property, value) {
            if (!this._roots) return this;

            if (typeof property === "object") {
                for (const key in property) {
                    this.css(key, property[key]);
                }
            } else {
                for (const root of this._roots) {
                    root.style[property] = value;
                }
            }

            return this;
        }

        children(selector) {
            if (!this._roots) return this;

            const newRoots = [];
            for (const root of this._roots) {
                for (const child of root.children) {
                    if (selector === undefined || child.matches(selector)) {
                        newRoots.push(child);
                    }
                }
            }

            return new DOMWorker(newRoots, this);
        }

        select(selector) {
            if (!this._roots) return this;

            const newRoots = [];
            for (const root of this._roots) {
                for (const child of root.querySelectorAll(selector)) {
                    newRoots.push(child);
                }
            }

            return new DOMWorker(newRoots, this);
        }

        previousContext(steps = 1) {
            let result = this;
            while (result && steps > 0) {
                result = result._prevContext;
                steps--;
            }

            return result;
        }

        remove(selector) {
            if (!selector) {
                this._roots = [];
                return this;
            }
            if (!this._roots) return this;

            this._roots = this._roots.filter((root) => root.matches(selector));
        }
    }

    class Planner {
        _isDone = false;

        root() {
            if (!this._commands) {
                const task = new Planner();
                task._commands = [["root", arguments]];
                return task;
            }

            return this;
        }

        append() {
            if (this._isDone) return;
            this._commands.push(["append", arguments]);

            return this;
        }

        appendMany() {
            if (this._isDone) return;
            this._commands.push(["appendMany", arguments]);
            return this;
        }

        css() {
            if (this._isDone) return;
            this._commands.push(["css", arguments]);
            return this;
        }

        children() {
            if (this._isDone) return;
            this._commands.push(["children", arguments]);
            return this;
        }

        select() {
            if (this._isDone) return;
            this._commands.push(["select", arguments]);
            return this;
        }

        previousContext() {
            if (this._isDone) return;
            this._commands.push(["previousContext", arguments]);
            return this;
        }

        remove() {
            if (this._isDone) return;
            this._commands.push(["remove"]);
            return this;
        }

        commit() {
            if (this._isDone) return;
            this._isDone = true;

            let current = new DOMWorker();

            for (const [command, args] of this._commands) {
                current = current[command](...args);
            }
        }
    }

    return new Planner();
}
