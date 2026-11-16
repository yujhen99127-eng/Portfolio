/* 全站共用的導覽列與頁尾。
   修改選單項目只要改這個檔案，五個頁面會一起更新。 */
(function () {
  var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (page === '') page = 'index.html';
  var isHome = page === 'index.html';

  // 選單內容：要增減作品或頁面，改這兩個陣列
  var WORKS = [
    { href: 'itraq.html', label: 'iTRAQ 車隊管理系統' },
    { href: 'carwash.html', label: 'OpenHub 洗車中台' }
  ];
  var LINKS = [
    { href: 'about.html', label: '關於我' },
    { href: 'process.html', label: '設計流程' }
  ];

  function current(href) { return href === page ? ' is-current" aria-current="page' : ''; }

  function headerHTML() {
    var icon = document.body.getAttribute('data-brand-icon');
    var mark = icon
      ? '<img src="' + icon + '" alt="" class="brand-icon">'
      : '<span aria-hidden="true" class="brand-dot"></span>';
    var contact = document.getElementById('contact') ? '#contact' : 'index.html#contact';
    return '' +
      '<nav aria-label="主要導覽" class="site-nav">' +
        '<a href="' + (isHome ? '#top' : 'index.html') + '" class="brand" data-h="link">' + mark + 'Yu Jhen Chen</a>' +
        '<div class="nav-links">' +
          '<div data-dd class="dropdown">' +
            '<button type="button" aria-haspopup="true" data-h="link" class="nav-trigger">我的作品' +
              '<svg data-dd-chev aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"></path></svg>' +
            '</button>' +
            '<div data-dd-menu class="dropdown-menu">' +
              WORKS.map(function (w) { return '<a href="' + w.href + '" data-h="item" class="menu-item' + current(w.href) + '">' + w.label + '</a>'; }).join('') +
            '</div>' +
          '</div>' +
          LINKS.map(function (l) { return '<a href="' + l.href + '" data-h="link" class="nav-link' + current(l.href) + '">' + l.label + '</a>'; }).join('') +
          '<a href="' + contact + '" data-h="pill" class="btn-contact">聯絡我</a>' +
        '</div>' +
      '</nav>';
  }

  function footerHTML() {
    return '' +
      '<div class="footer-inner">' +
        '<span>© ' + new Date().getFullYear() + ' Yu Jhen Chen. All rights reserved.</span>' +
        '<a href="#top" class="footer-link" data-h="link">回到頂部 ↑</a>' +
      '</div>';
  }

  function mount() {
    var h = document.getElementById('site-header');
    var f = document.getElementById('site-footer');
    if (h) h.innerHTML = headerHTML();
    if (f) f.innerHTML = footerHTML();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
