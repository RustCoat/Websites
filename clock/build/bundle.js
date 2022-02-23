
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function to_number(value) {
        return value === '' ? null : +value;
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.44.2' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    function is_date(obj) {
        return Object.prototype.toString.call(obj) === '[object Date]';
    }

    function tick_spring(ctx, last_value, current_value, target_value) {
        if (typeof current_value === 'number' || is_date(current_value)) {
            // @ts-ignore
            const delta = target_value - current_value;
            // @ts-ignore
            const velocity = (current_value - last_value) / (ctx.dt || 1 / 60); // guard div by 0
            const spring = ctx.opts.stiffness * delta;
            const damper = ctx.opts.damping * velocity;
            const acceleration = (spring - damper) * ctx.inv_mass;
            const d = (velocity + acceleration) * ctx.dt;
            if (Math.abs(d) < ctx.opts.precision && Math.abs(delta) < ctx.opts.precision) {
                return target_value; // settled
            }
            else {
                ctx.settled = false; // signal loop to keep ticking
                // @ts-ignore
                return is_date(current_value) ?
                    new Date(current_value.getTime() + d) : current_value + d;
            }
        }
        else if (Array.isArray(current_value)) {
            // @ts-ignore
            return current_value.map((_, i) => tick_spring(ctx, last_value[i], current_value[i], target_value[i]));
        }
        else if (typeof current_value === 'object') {
            const next_value = {};
            for (const k in current_value) {
                // @ts-ignore
                next_value[k] = tick_spring(ctx, last_value[k], current_value[k], target_value[k]);
            }
            // @ts-ignore
            return next_value;
        }
        else {
            throw new Error(`Cannot spring ${typeof current_value} values`);
        }
    }
    function spring(value, opts = {}) {
        const store = writable(value);
        const { stiffness = 0.15, damping = 0.8, precision = 0.01 } = opts;
        let last_time;
        let task;
        let current_token;
        let last_value = value;
        let target_value = value;
        let inv_mass = 1;
        let inv_mass_recovery_rate = 0;
        let cancel_task = false;
        function set(new_value, opts = {}) {
            target_value = new_value;
            const token = current_token = {};
            if (value == null || opts.hard || (spring.stiffness >= 1 && spring.damping >= 1)) {
                cancel_task = true; // cancel any running animation
                last_time = now();
                last_value = new_value;
                store.set(value = target_value);
                return Promise.resolve();
            }
            else if (opts.soft) {
                const rate = opts.soft === true ? .5 : +opts.soft;
                inv_mass_recovery_rate = 1 / (rate * 60);
                inv_mass = 0; // infinite mass, unaffected by spring forces
            }
            if (!task) {
                last_time = now();
                cancel_task = false;
                task = loop(now => {
                    if (cancel_task) {
                        cancel_task = false;
                        task = null;
                        return false;
                    }
                    inv_mass = Math.min(inv_mass + inv_mass_recovery_rate, 1);
                    const ctx = {
                        inv_mass,
                        opts: spring,
                        settled: true,
                        dt: (now - last_time) * 60 / 1000
                    };
                    const next_value = tick_spring(ctx, last_value, value, target_value);
                    last_time = now;
                    last_value = value;
                    store.set(value = next_value);
                    if (ctx.settled) {
                        task = null;
                    }
                    return !ctx.settled;
                });
            }
            return new Promise(fulfil => {
                task.promise.then(() => {
                    if (token === current_token)
                        fulfil();
                });
            });
        }
        const spring = {
            set,
            update: (fn, opts) => set(fn(target_value, value), opts),
            subscribe: store.subscribe,
            stiffness,
            damping,
            precision
        };
        return spring;
    }

    // PAGMAN TRUE OVERLORD DEMON EXECUTIONER CLOCK
    class Clock {
        constructor(setHour, setMinute) {
            if (this.validateTime(setHour, setMinute)) {
                this.hour = setHour;
                this.minute = setMinute;
                this.minuteRevolution = 0;
                this.hourRevolition = 0;
            }
        }

        setAlarm(setHour, setMinute) {
            if (this.validateTime(setHour, setMinute)) {
                this.alarmHour = setHour;
                this.alarmMinute = setMinute;
                this.alarmIsActive = true;
                this.alarmTriggered = false;
            }
        }

        validateTime(hour, minute) {
            if (hour >= 24 || hour < 0) {
                throw RangeError("hour value must be >= 0 and < 24")
            } else if (minute >= 60 || minute < 0) {
                throw new RangeError("minute value must be >= 0 and < 60")
            } else {
                return true
            }
        }

        tick() {
            if (this.minute < 59) {
                this.minute++;
            } else {
                this.minute = 0;
                this.minuteRevolution++;
                if (this.hour < 23) {
                    this.hour++;
                } else {
                    this.hour = 0;
                    this.hourRevolition++;
                }
            }
            /*((this.hour.toString().length == 1 ? "0" + this.hour.toString() : this.hour) + ":"
            + (this.minute.toString().length == 1 ? "0" + this.minute.toString() : this.minute))
            */
            if (this.alarmIsActive && this.hour == this.alarmHour && this.minute == this.alarmMinute) {
                this.alarmTriggered = true;
            }
        }

        get time() {
            return ((this.hour.toString().length == 1 ? "0" + this.hour.toString() : this.hour) + ":"
            + (this.minute.toString().length == 1 ? "0" + this.minute.toString() : this.minute))
        }
    }

    /* src\App.svelte generated by Svelte v3.44.2 */
    const file = "src\\App.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[20] = list[i];
    	return child_ctx;
    }

    // (38:3) {#each [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as hourRotation}
    function create_each_block(ctx) {
    	let line;

    	const block = {
    		c: function create() {
    			line = svg_element("line");
    			attr_dev(line, "y1", "-36");
    			attr_dev(line, "y2", "-40");
    			set_style(line, "stroke", "white");
    			attr_dev(line, "transform", "rotate(" + /*hourRotation*/ ctx[20] * 30 + ")");
    			add_location(line, file, 38, 4, 1201);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, line, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(line);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(38:3) {#each [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as hourRotation}",
    		ctx
    	});

    	return block;
    }

    // (57:2) {#if clock.alarmTriggered}
    function create_if_block(ctx) {
    	let h1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Wake Up!";
    			add_location(h1, file, 57, 3, 2015);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);

    			if (!mounted) {
    				dispose = listen_dev(h1, "click", /*click_handler*/ ctx[13], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(57:2) {#if clock.alarmTriggered}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let main;
    	let div0;
    	let h1;
    	let t1;
    	let h2;
    	let t2_value = /*clock*/ ctx[0].time + "";
    	let t2;
    	let t3;
    	let div1;
    	let svg0;
    	let rect0;
    	let rect0_height_value;
    	let rect1;
    	let rect1_height_value;
    	let t4;
    	let svg1;
    	let circle0;
    	let line0;
    	let line0_transform_value;
    	let line1;
    	let line1_transform_value;
    	let t5;
    	let svg2;
    	let circle1;
    	let g0;
    	let line2;
    	let text0;
    	let t6_value = /*clock*/ ctx[0].minute + "";
    	let t6;
    	let g0_transform_value;
    	let g1;
    	let line3;
    	let text1;
    	let t7_value = /*clock*/ ctx[0].hour + "";
    	let t7;
    	let g1_transform_value;
    	let t8;
    	let div2;
    	let t9;
    	let div4;
    	let div3;
    	let p0;
    	let t11;
    	let input0;
    	let p1;
    	let t12;
    	let br0;
    	let t13;
    	let p2;
    	let t15;
    	let input1;
    	let p3;
    	let t16;
    	let br1;
    	let t17;
    	let button0;
    	let br2;
    	let t19;
    	let button1;
    	let t20;
    	let button1_class_value;
    	let br3;
    	let t21;
    	let button2;
    	let div3_style_value;
    	let t23;
    	let button3;
    	let div4_class_value;
    	let mounted;
    	let dispose;
    	let each_value = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < 12; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	let if_block = /*clock*/ ctx[0].alarmTriggered && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			main = element("main");
    			div0 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Miskolczi";
    			t1 = space();
    			h2 = element("h2");
    			t2 = text(t2_value);
    			t3 = space();
    			div1 = element("div");
    			svg0 = svg_element("svg");
    			rect0 = svg_element("rect");
    			rect1 = svg_element("rect");
    			t4 = space();
    			svg1 = svg_element("svg");
    			circle0 = svg_element("circle");

    			for (let i = 0; i < 12; i += 1) {
    				each_blocks[i].c();
    			}

    			line0 = svg_element("line");
    			line1 = svg_element("line");
    			t5 = space();
    			svg2 = svg_element("svg");
    			circle1 = svg_element("circle");
    			g0 = svg_element("g");
    			line2 = svg_element("line");
    			text0 = svg_element("text");
    			t6 = text(t6_value);
    			g1 = svg_element("g");
    			line3 = svg_element("line");
    			text1 = svg_element("text");
    			t7 = text(t7_value);
    			t8 = space();
    			div2 = element("div");
    			if (if_block) if_block.c();
    			t9 = space();
    			div4 = element("div");
    			div3 = element("div");
    			p0 = element("p");
    			p0.textContent = "Hour";
    			t11 = space();
    			input0 = element("input");
    			p1 = element("p");
    			t12 = text(/*alarmHour*/ ctx[2]);
    			br0 = element("br");
    			t13 = space();
    			p2 = element("p");
    			p2.textContent = "Minute";
    			t15 = space();
    			input1 = element("input");
    			p3 = element("p");
    			t16 = text(/*alarmMinute*/ ctx[1]);
    			br1 = element("br");
    			t17 = space();
    			button0 = element("button");
    			button0.textContent = "Set";
    			br2 = element("br");
    			t19 = space();
    			button1 = element("button");
    			t20 = text("Toggle Alarm ");
    			br3 = element("br");
    			t21 = space();
    			button2 = element("button");
    			button2.textContent = "Tick";
    			t23 = space();
    			button3 = element("button");
    			button3.textContent = "...";
    			add_location(h1, file, 27, 2, 634);
    			add_location(h2, file, 28, 2, 655);
    			add_location(div0, file, 26, 1, 626);
    			attr_dev(rect0, "x", "52");
    			attr_dev(rect0, "y", "2");
    			attr_dev(rect0, "rx", "2px");
    			attr_dev(rect0, "ry", "2px");
    			attr_dev(rect0, "height", rect0_height_value = /*$hourSpring2*/ ctx[4] * 4 + 3);
    			attr_dev(rect0, "width", "47");
    			set_style(rect0, "stroke", "white");
    			set_style(rect0, "fill", "none");
    			add_location(rect0, file, 32, 3, 767);
    			attr_dev(rect1, "x", "1");
    			attr_dev(rect1, "y", "2");
    			attr_dev(rect1, "rx", "2px");
    			attr_dev(rect1, "ry", "2px");
    			attr_dev(rect1, "height", rect1_height_value = /*$minuteSpring2*/ ctx[5] * 1.6 + 3);
    			attr_dev(rect1, "width", "48");
    			set_style(rect1, "stroke", "white");
    			set_style(rect1, "fill", "none");
    			add_location(rect1, file, 33, 3, 885);
    			attr_dev(svg0, "viewBox", "0 0 100 100");
    			attr_dev(svg0, "style", "width:80%; height=80%");
    			add_location(svg0, file, 31, 2, 706);
    			set_style(circle0, "stroke", "white");
    			set_style(circle0, "fill", "none");
    			attr_dev(circle0, "r", "48");
    			add_location(circle0, file, 36, 3, 1080);
    			attr_dev(line0, "y1", "-45");
    			attr_dev(line0, "y2", "-48");
    			set_style(line0, "stroke", "white");
    			attr_dev(line0, "transform", line0_transform_value = "rotate(" + /*$minuteSpring*/ ctx[6] * 6 + ")");
    			add_location(line0, file, 40, 3, 1302);
    			attr_dev(line1, "y1", "-42");
    			attr_dev(line1, "y2", "-48");
    			set_style(line1, "stroke", "white");
    			attr_dev(line1, "transform", line1_transform_value = "rotate(" + /*$hourSpring*/ ctx[7] * 30 + ")");
    			add_location(line1, file, 41, 3, 1392);
    			attr_dev(svg1, "viewBox", "-50 -50 100 100");
    			attr_dev(svg1, "style", "width:80%; height=80%");
    			add_location(svg1, file, 35, 2, 1015);
    			set_style(circle1, "stroke", "white");
    			set_style(circle1, "fill", "none");
    			attr_dev(circle1, "r", "48");
    			add_location(circle1, file, 44, 3, 1554);
    			attr_dev(line2, "y1", "-45");
    			attr_dev(line2, "y2", "-48");
    			set_style(line2, "stroke", "white");
    			add_location(line2, file, 46, 4, 1656);
    			attr_dev(text0, "y", "-30");
    			attr_dev(text0, "x", "-4.5");
    			set_style(text0, "fill", "white");
    			add_location(text0, file, 47, 4, 1707);
    			attr_dev(g0, "transform", g0_transform_value = "rotate(" + /*$minuteSpring*/ ctx[6] * 6 + ")");
    			add_location(g0, file, 45, 3, 1608);
    			attr_dev(line3, "y1", "-42");
    			attr_dev(line3, "y2", "-48");
    			set_style(line3, "stroke", "white");
    			add_location(line3, file, 50, 4, 1833);
    			attr_dev(text1, "y", "-30");
    			attr_dev(text1, "x", "-4.5");
    			set_style(text1, "fill", "white");
    			add_location(text1, file, 51, 4, 1884);
    			attr_dev(g1, "transform", g1_transform_value = "rotate(" + /*$hourSpring*/ ctx[7] * 30 + ")");
    			add_location(g1, file, 49, 3, 1786);
    			attr_dev(svg2, "viewBox", "-50 -50 100 100");
    			attr_dev(svg2, "style", "width:80%; height=80%");
    			add_location(svg2, file, 43, 2, 1489);
    			attr_dev(div1, "id", "adjust");
    			attr_dev(div1, "class", "svelte-121qze8");
    			add_location(div1, file, 30, 1, 686);
    			add_location(div2, file, 55, 1, 1976);
    			set_style(p0, "margin", "0");
    			add_location(p0, file, 62, 3, 2337);
    			attr_dev(input0, "type", "range");
    			attr_dev(input0, "max", "23");
    			add_location(input0, file, 63, 3, 2369);
    			set_style(p1, "margin", "0");
    			add_location(p1, file, 63, 53, 2419);
    			add_location(br0, file, 63, 88, 2454);
    			set_style(p2, "margin", "0");
    			add_location(p2, file, 64, 3, 2462);
    			attr_dev(input1, "type", "range");
    			attr_dev(input1, "max", "59");
    			add_location(input1, file, 65, 3, 2496);
    			set_style(p3, "margin", "0");
    			add_location(p3, file, 65, 56, 2549);
    			add_location(br1, file, 65, 93, 2586);
    			add_location(button0, file, 66, 3, 2594);
    			add_location(br2, file, 66, 112, 2703);
    			attr_dev(button1, "class", button1_class_value = "" + (null_to_empty(/*clock*/ ctx[0].alarmIsActive ? 'checked' : '') + " svelte-121qze8"));
    			add_location(button1, file, 67, 3, 2711);
    			add_location(br3, file, 67, 145, 2853);
    			add_location(button2, file, 68, 3, 2861);
    			attr_dev(div3, "style", div3_style_value = /*isHidden*/ ctx[3] ? 'visibility: hidden' : '');
    			add_location(div3, file, 61, 2, 2281);
    			set_style(button3, "position", "absolute");
    			set_style(button3, "top", "50%");
    			set_style(button3, "right", "1%");
    			add_location(button3, file, 70, 2, 2924);
    			attr_dev(div4, "class", div4_class_value = "" + (null_to_empty(/*isHidden*/ ctx[3] ? 'hidden' : 'shown') + " svelte-121qze8"));
    			set_style(div4, "position", "fixed");
    			set_style(div4, "top", "0%");
    			set_style(div4, "height", "100%");
    			set_style(div4, "width", "25%");
    			set_style(div4, "background", "linear-gradient(-140deg, gray, black)");
    			set_style(div4, "border-radius", "5px");
    			add_location(div4, file, 60, 1, 2102);
    			attr_dev(main, "class", "svelte-121qze8");
    			add_location(main, file, 25, 0, 618);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div0);
    			append_dev(div0, h1);
    			append_dev(div0, t1);
    			append_dev(div0, h2);
    			append_dev(h2, t2);
    			append_dev(main, t3);
    			append_dev(main, div1);
    			append_dev(div1, svg0);
    			append_dev(svg0, rect0);
    			append_dev(svg0, rect1);
    			append_dev(div1, t4);
    			append_dev(div1, svg1);
    			append_dev(svg1, circle0);

    			for (let i = 0; i < 12; i += 1) {
    				each_blocks[i].m(svg1, null);
    			}

    			append_dev(svg1, line0);
    			append_dev(svg1, line1);
    			append_dev(div1, t5);
    			append_dev(div1, svg2);
    			append_dev(svg2, circle1);
    			append_dev(svg2, g0);
    			append_dev(g0, line2);
    			append_dev(g0, text0);
    			append_dev(text0, t6);
    			append_dev(svg2, g1);
    			append_dev(g1, line3);
    			append_dev(g1, text1);
    			append_dev(text1, t7);
    			append_dev(main, t8);
    			append_dev(main, div2);
    			if (if_block) if_block.m(div2, null);
    			append_dev(main, t9);
    			append_dev(main, div4);
    			append_dev(div4, div3);
    			append_dev(div3, p0);
    			append_dev(div3, t11);
    			append_dev(div3, input0);
    			set_input_value(input0, /*alarmHour*/ ctx[2]);
    			append_dev(div3, p1);
    			append_dev(p1, t12);
    			append_dev(div3, br0);
    			append_dev(div3, t13);
    			append_dev(div3, p2);
    			append_dev(div3, t15);
    			append_dev(div3, input1);
    			set_input_value(input1, /*alarmMinute*/ ctx[1]);
    			append_dev(div3, p3);
    			append_dev(p3, t16);
    			append_dev(div3, br1);
    			append_dev(div3, t17);
    			append_dev(div3, button0);
    			append_dev(div3, br2);
    			append_dev(div3, t19);
    			append_dev(div3, button1);
    			append_dev(button1, t20);
    			append_dev(div3, br3);
    			append_dev(div3, t21);
    			append_dev(div3, button2);
    			append_dev(div4, t23);
    			append_dev(div4, button3);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "change", /*input0_change_input_handler*/ ctx[14]),
    					listen_dev(input0, "input", /*input0_change_input_handler*/ ctx[14]),
    					listen_dev(input1, "change", /*input1_change_input_handler*/ ctx[15]),
    					listen_dev(input1, "input", /*input1_change_input_handler*/ ctx[15]),
    					listen_dev(button0, "click", /*click_handler_1*/ ctx[16], false, false, false),
    					listen_dev(button1, "click", /*click_handler_2*/ ctx[17], false, false, false),
    					listen_dev(button2, "click", /*click_handler_3*/ ctx[18], false, false, false),
    					listen_dev(button3, "click", /*click_handler_4*/ ctx[19], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*clock*/ 1 && t2_value !== (t2_value = /*clock*/ ctx[0].time + "")) set_data_dev(t2, t2_value);

    			if (dirty & /*$hourSpring2*/ 16 && rect0_height_value !== (rect0_height_value = /*$hourSpring2*/ ctx[4] * 4 + 3)) {
    				attr_dev(rect0, "height", rect0_height_value);
    			}

    			if (dirty & /*$minuteSpring2*/ 32 && rect1_height_value !== (rect1_height_value = /*$minuteSpring2*/ ctx[5] * 1.6 + 3)) {
    				attr_dev(rect1, "height", rect1_height_value);
    			}

    			if (dirty & /*$minuteSpring*/ 64 && line0_transform_value !== (line0_transform_value = "rotate(" + /*$minuteSpring*/ ctx[6] * 6 + ")")) {
    				attr_dev(line0, "transform", line0_transform_value);
    			}

    			if (dirty & /*$hourSpring*/ 128 && line1_transform_value !== (line1_transform_value = "rotate(" + /*$hourSpring*/ ctx[7] * 30 + ")")) {
    				attr_dev(line1, "transform", line1_transform_value);
    			}

    			if (dirty & /*clock*/ 1 && t6_value !== (t6_value = /*clock*/ ctx[0].minute + "")) set_data_dev(t6, t6_value);

    			if (dirty & /*$minuteSpring*/ 64 && g0_transform_value !== (g0_transform_value = "rotate(" + /*$minuteSpring*/ ctx[6] * 6 + ")")) {
    				attr_dev(g0, "transform", g0_transform_value);
    			}

    			if (dirty & /*clock*/ 1 && t7_value !== (t7_value = /*clock*/ ctx[0].hour + "")) set_data_dev(t7, t7_value);

    			if (dirty & /*$hourSpring*/ 128 && g1_transform_value !== (g1_transform_value = "rotate(" + /*$hourSpring*/ ctx[7] * 30 + ")")) {
    				attr_dev(g1, "transform", g1_transform_value);
    			}

    			if (/*clock*/ ctx[0].alarmTriggered) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(div2, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*alarmHour*/ 4) {
    				set_input_value(input0, /*alarmHour*/ ctx[2]);
    			}

    			if (dirty & /*alarmHour*/ 4) set_data_dev(t12, /*alarmHour*/ ctx[2]);

    			if (dirty & /*alarmMinute*/ 2) {
    				set_input_value(input1, /*alarmMinute*/ ctx[1]);
    			}

    			if (dirty & /*alarmMinute*/ 2) set_data_dev(t16, /*alarmMinute*/ ctx[1]);

    			if (dirty & /*clock*/ 1 && button1_class_value !== (button1_class_value = "" + (null_to_empty(/*clock*/ ctx[0].alarmIsActive ? 'checked' : '') + " svelte-121qze8"))) {
    				attr_dev(button1, "class", button1_class_value);
    			}

    			if (dirty & /*isHidden*/ 8 && div3_style_value !== (div3_style_value = /*isHidden*/ ctx[3] ? 'visibility: hidden' : '')) {
    				attr_dev(div3, "style", div3_style_value);
    			}

    			if (dirty & /*isHidden*/ 8 && div4_class_value !== (div4_class_value = "" + (null_to_empty(/*isHidden*/ ctx[3] ? 'hidden' : 'shown') + " svelte-121qze8"))) {
    				attr_dev(div4, "class", div4_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_each(each_blocks, detaching);
    			if (if_block) if_block.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let $hourSpring2;
    	let $minuteSpring2;
    	let $minuteSpring;
    	let $hourSpring;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let clock = new Clock(0, 0);
    	let minuteSpring = spring(clock.minute);
    	validate_store(minuteSpring, 'minuteSpring');
    	component_subscribe($$self, minuteSpring, value => $$invalidate(6, $minuteSpring = value));
    	let hourSpring = spring(clock.hour);
    	validate_store(hourSpring, 'hourSpring');
    	component_subscribe($$self, hourSpring, value => $$invalidate(7, $hourSpring = value));
    	let minuteSpring2 = spring(clock.minute);
    	validate_store(minuteSpring2, 'minuteSpring2');
    	component_subscribe($$self, minuteSpring2, value => $$invalidate(5, $minuteSpring2 = value));
    	let hourSpring2 = spring(clock.hour);
    	validate_store(hourSpring2, 'hourSpring2');
    	component_subscribe($$self, hourSpring2, value => $$invalidate(4, $hourSpring2 = value));

    	function tick() {
    		clock.tick();
    		$$invalidate(0, clock);
    		minuteSpring.set(clock.minute + 60 * clock.minuteRevolution);
    		hourSpring.set(clock.hour + 24 * clock.hourRevolition);
    		minuteSpring2.set(clock.minute);
    		hourSpring2.set(clock.hour);
    	}

    	setInterval(tick, 1000);
    	let alarmMinute = 0;
    	let alarmHour = 0;
    	let isHidden = true;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => {
    		$$invalidate(0, clock.alarmTriggered = false, clock);
    	};

    	function input0_change_input_handler() {
    		alarmHour = to_number(this.value);
    		$$invalidate(2, alarmHour);
    	}

    	function input1_change_input_handler() {
    		alarmMinute = to_number(this.value);
    		$$invalidate(1, alarmMinute);
    	}

    	const click_handler_1 = () => {
    		$$invalidate(0, clock.alarmIsActive = false, clock);
    		clock.setAlarm(alarmHour, alarmMinute);
    	};

    	const click_handler_2 = () => {
    		$$invalidate(0, clock.alarmIsActive = !clock.alarmIsActive, clock);
    	};

    	const click_handler_3 = () => {
    		tick();
    	};

    	const click_handler_4 = () => {
    		$$invalidate(3, isHidden = !isHidden);
    	};

    	$$self.$capture_state = () => ({
    		spring,
    		Clock,
    		clock,
    		minuteSpring,
    		hourSpring,
    		minuteSpring2,
    		hourSpring2,
    		tick,
    		alarmMinute,
    		alarmHour,
    		isHidden,
    		$hourSpring2,
    		$minuteSpring2,
    		$minuteSpring,
    		$hourSpring
    	});

    	$$self.$inject_state = $$props => {
    		if ('clock' in $$props) $$invalidate(0, clock = $$props.clock);
    		if ('minuteSpring' in $$props) $$invalidate(8, minuteSpring = $$props.minuteSpring);
    		if ('hourSpring' in $$props) $$invalidate(9, hourSpring = $$props.hourSpring);
    		if ('minuteSpring2' in $$props) $$invalidate(10, minuteSpring2 = $$props.minuteSpring2);
    		if ('hourSpring2' in $$props) $$invalidate(11, hourSpring2 = $$props.hourSpring2);
    		if ('alarmMinute' in $$props) $$invalidate(1, alarmMinute = $$props.alarmMinute);
    		if ('alarmHour' in $$props) $$invalidate(2, alarmHour = $$props.alarmHour);
    		if ('isHidden' in $$props) $$invalidate(3, isHidden = $$props.isHidden);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		clock,
    		alarmMinute,
    		alarmHour,
    		isHidden,
    		$hourSpring2,
    		$minuteSpring2,
    		$minuteSpring,
    		$hourSpring,
    		minuteSpring,
    		hourSpring,
    		minuteSpring2,
    		hourSpring2,
    		tick,
    		click_handler,
    		input0_change_input_handler,
    		input1_change_input_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3,
    		click_handler_4
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
