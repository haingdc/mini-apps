async function abortable(signal, promise) {
  if (signal.aborted) throw new DOMException('AbortError', 'AbortError');
  const lotsOfMemory = new Uint8Array(1000 * 1000 * 100);
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      signal.addEventListener('abort', () => {
        console.log('async task aborted', lotsOfMemory[0]);
        reject(new DOMException('AbortError', 'AbortError'));
      });
    }),
  ]);
}

const tasks = [];

async function asyncTask() {
  const controller = new AbortController();

  await abortable(
    controller.signal,
    new Promise((resolve) => {
      tasks.push({
        resolve,
        abort: () => controller.abort(),
      });
    })
  );

  console.log('async task complete');
}

const actions = {
  'Create 10 high-memory async tasks'() {
    for (let i = 0; i < 10; i++) asyncTask();
  },
  'Finish the tasks'() {
    while (tasks[0]) tasks.shift().resolve();
  },
  'Abort the tasks'() {
    while (tasks[0]) tasks.shift().abort();
  }
};

for (const [text, func] of Object.entries(actions)) {
  const btn = document.createElement('button');
  btn.textContent = text;
  btn.addEventListener('click', func);
  document.body.append(btn, ' ');
}