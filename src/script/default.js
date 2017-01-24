
var Items = []

//キーワードを含む商品を検索
function searchItem(keyword,page) {
  if (!keyword) {
    return false;
  }
  $.ajax({
    type: 'GET',
    url: 'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20130424',
    data: {
      applicationId: '1031022262194317111',
      affiliateId: '146d79aa.7a7900a1.146d79ab.cab55273',
      keyword: keyword,
      page: page
    }
  }).done(function (data) {
      createItems(data);
      Items.push(data);
      hideLoader();
  });
}

//テンプレート作成
function createItems(data) {
  $('#js−search-result').empty();

  var pageCount = data.pageCount;
  var current = data.page;
  var dataStat = data.count;
  if (dataStat > 0) {
    $.each(data.Items, function (i, items) {
      var item = items.Item;
      var affiliateUrl = item.affiliateUrl;
      var imageUrl = item.mediumImageUrls[0].imageUrl;
      var itemName = item.itemName;
      if (itemName.length > 50) {
        itemName = itemName.substring(0, 50) + '...';
  　}
      var itemPrice = item.itemPrice;
      var itemReviewAverage = item.reviewAverage;
      var itemShopName = item.shopName;
      var htmlTemplate = $('<div class="card">' +
          '<div class="card-inner">' +
          '<div class="card-thumbnail-wrapper l-card-bottom-small">' +
          '<a href="' + affiliateUrl + '">' +
          '<img class="card-thumbnail" src="' + imageUrl + '" alt="' + item.itemName + '" width="150" ' +
          'height="150"/>' +
          '</a></div>' +
          '<h2 class="card-title l-card-bottom-small"><a href="' + affiliateUrl + '">' + itemName + '</a></h2>' +
          '<div class="card-shop">' + itemShopName + '</div>' +
          '<div class="card-price">' + itemPrice + '円</div>' +
          '<div class="card-review"><p>評価：' + itemReviewAverage + '点</p></div>' +
          '</div>' +
          '</div>');

      //テンプレートを追加
      $('#js−search-result').append(htmlTemplate);
    });
  }
}

$('.js-sort-review-score-high').on('click', function(){
  //ここでItemsにいれたデータを並び替えて再度　createItems(data)を実行したいです。
});

// Loadingイメージの表示
function showLoader(){
  $('#js-loader').fadeIn('nomal');
}

// Loadingイメージの非表示
function hideLoader(){
  $('#js-loader').fadeOut('nomal');
}

$(function (e) {

  $('#js-submit-button-top').on('click', function(e){
    var keyword = $('#js-search-window-top').val();
    if (!keyword) {
      return false;
    }
    searchItem(keyword);
    showLoader();
    e.preventDefault();
  });

  $('#js-submit-button-scroll').on('click', function(e){
    var keyword = $('#js-search-window-scroll').val();
    if (!keyword) {
      return false;
    }
    searchItem(keyword);
    showLoader();
    e.preventDefault();
  });

  //スティッキーヘッダー
  var $window = $(window);
  var $scrollHeader = $('#js-scroll-header');

  $window.on("scroll", function () {
    if ($window.scrollTop() > 160) {
      $scrollHeader.slideDown('fast');
      toggleFooter();
    } else {
      $scrollHeader.slideUp('fast');
      toggleFooter();
    }
  });

  $window.trigger('scroll');

});
