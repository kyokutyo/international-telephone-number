(function() {
    'use strict';

    var client = require('cheerio-httpcli');
    var url    = 'http://ja.wikipedia.org/wiki/%E5%9B%BD%E9%9A%9B%E9%9B%BB%E8%A9%B1%E7%95%AA%E5%8F%B7%E3%81%AE%E4%B8%80%E8%A6%A7';
    var str    = [];

    client.fetch(url, function (err, $, res) {
        $('table th code').each(function () {
            var $code   = $(this);
            var $parent = $code.parent();
            var tmp_str = '';

            tmp_str += '{"code":"' + $code.text() + '",';
            $parent.siblings('td').each(function(index) {
                var $td  = $(this);
                var text = $td.text()
                  .replace(/\s+\[\d+\]/g, '')
                  .replace(/\"/g, '\\"')
                  .replace(/[\r\n]/g, '');

                if(index === 0) {
                    tmp_str += '"name":"' + text;
                } else if(text !== '') {
                    tmp_str += '(' + text + ')';
                }
            });
            tmp_str += '"}';
            str.push(tmp_str);
        });
        console.log('[' + str.join(',') + ']');
    });
}());
