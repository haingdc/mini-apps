"use strict";

self.onmessage = onMessage;

function fib(n) {
	if (n < 2) {
		return n // or 1
	} else {
		return fib(n - 1) + fib(n - 2)
	}
}

function onMessage(e) {
	var { num } = e.data
	var startTime = performance.now();
	var fibNum = fib(num);
	self.postMessage({ fibNum, time: performance.now() - startTime })
}