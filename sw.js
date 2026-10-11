// 考场时钟 Service Worker：离线缓存 + 更新策略
// 更新版本时把 v2 改成 v3（强制所有已安装用户拿到新文件）
var CACHE_NAME = 'exam-clock-v2';
var ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(ASSETS);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE_NAME; })
          .map(function (k) { return caches.delete(k); })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (e) {
  // 页面导航：网络优先（以后更新代码无需改版本号，重开应用即生效），断网时回退缓存
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE_NAME).then(function (c) { c.put(e.request, copy); });
        return res;
      }).catch(function () {
        return caches.match(e.request, { ignoreSearch: true });
      })
    );
    return;
  }
  // 其余资源（图标、清单等）：缓存优先，未命中则回源并缓存
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(function (cached) {
      return cached || fetch(e.request).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE_NAME).then(function (c) { c.put(e.request, copy); });
        return res;
      });
    })
  );
});
