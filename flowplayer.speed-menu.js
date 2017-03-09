/*!

   Speed menu plugin for Flowplayer HTML5

   Copyright (c) 2017, Flowplayer Drive Oy

   Released under the MIT License:
   http://www.opensource.org/licenses/mit-license.php

   Requires Flowplayer HTML5 version 7.x or greater
   $GIT_DESC$

*/
(function() {
  var extension = function(flowplayer) {
    flowplayer(function(api, root) {
      var support = flowplayer.support;
      if (!support.video || !support.inlineVideo) return;
      var common = flowplayer.common
        , bean = flowplayer.bean
        , ui = common.find('.fp-ui', root)[0]
        , controlbar = common.find('.fp-controls', ui)[0];

      bean.on(root, 'click', '.fp-speed', function() {
        var menu = common.find('.fp-speed-menu', root)[0];
        if (common.hasClass(menu, 'fp-active')) api.hideMenu();
        else api.showMenu(menu);
      });

      bean.on(root, 'click', '.fp-speed-menu a', function(ev) {
        var s = ev.target.getAttribute('data-speed');
        api.speed(s);
      });

      api.on('speed', function(ev, _a, rate) {
        selectSpeed(rate);
      });

      api.on('ready', function() {
        removeMenu();
        createMenu(api.speeds || api.conf.speeds, 1);
        selectSpeed(1);
      });

      function removeMenu() {
        common.find('.fp-speed-menu', root).forEach(common.removeNode);
        common.find('.fp-speed', root).forEach(common.removeNode);
      }

      function round(val) {
        return Math.round(val * 100) / 100;
      }

      function createMenu(speeds, currentSpeed) {
        controlbar.appendChild(common.createElement('strong', { className: 'fp-speed' }, currentSpeed + 'x'));
        var menu = common.createElement('div', { className: 'fp-menu fp-speed-menu', css: { width: '6em' } }, '<strong>Speed</strong>');
        speeds.forEach(function(s) {
          var a = common.createElement('a', { 'data-speed': round(s) }, round(s) + 'x');
          menu.appendChild(a);
        });
        ui.appendChild(menu);
      }

      function selectSpeed(rate) {
        common.find('.fp-speed', root)[0].innerHTML = rate + 'x';
        common.find('.fp-speed-menu a', root).forEach(function(el) {
          common.toggleClass(el, 'fp-selected', el.getAttribute('data-speed') == rate);
          common.toggleClass(el, 'fp-color', el.getAttribute('data-speed') == rate);
        });
      }
    });
  };

  if (typeof module === 'object' && module.exports) module.exports = extension;
  else if (typeof window.flowplayer === 'function') extension(window.flowplayer);
})();
