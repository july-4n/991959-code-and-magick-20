'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP_SHADOW = 10;
var GAP = 20;
var GAP_X = 50;
var BAR_WIDTH = 40;
var BAR_HEIGHT_MAX = 150;
var VICTORY_TEXT = {
  VICTORY: 'Ура вы победили',
  RESULTS: 'Список результатов:'
};
// окно
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};
// текст
var renderText = function (ctx, text, x, y) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText(text, x, y);
};
// максимальное время
var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};
// отрисовка колонки
var renderColumn = function (ctx, player, time, maxTime, i) {
  var x = CLOUD_X + GAP * 2 + (GAP_X + BAR_WIDTH) * i;
  var height = BAR_HEIGHT_MAX * time / maxTime;
  var y = CLOUD_HEIGHT - GAP * 2 - height;
  ctx.fillStyle = player === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(230, ' + Math.random() * 100 + '%, 50%)';
  ctx.fillRect(x, y, BAR_WIDTH, height);
  renderText(ctx, player, x, CLOUD_HEIGHT - GAP);
  renderText(ctx, time, x, CLOUD_HEIGHT - 3 * GAP - height);
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP_SHADOW, CLOUD_Y + GAP_SHADOW, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  renderText(ctx, VICTORY_TEXT.VICTORY, CLOUD_X + GAP_X, CLOUD_Y + 0.5 * GAP);
  renderText(ctx, VICTORY_TEXT.RESULTS, CLOUD_X + GAP_X, CLOUD_Y + 1.5 * GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    renderColumn(ctx, players[i], Math.floor(times[i]), Math.floor(maxTime), i);
  }
};
