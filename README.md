## アプリケーション概要

* [Wikipedia の「国際電話番号の一覧」ページ](http://ja.wikipedia.org/wiki/%E5%9B%BD%E9%9A%9B%E9%9B%BB%E8%A9%B1%E7%95%AA%E5%8F%B7%E3%81%AE%E4%B8%80%E8%A6%A7) をスクレイピングして JSON ファイルを作成します
* コードを入力すると、マッチする国を表示します

## 国際電話番号データ(JSON) の作成

### セットアップ

```
$ cd scraper && npm install
```

### スクレイピング

```
$ node scraper/index.js > public/static/data/countries.json
```

## はじめかた

必要なパッケージをインストールします

```
$ npm install
$ bower install
```

サーバを起動、ファイルを watch します (Google Chrome Canary で開く)

```
$ gulp
```

## デプロイ

S3 でホスティングしてます
サンプルファイルをコピーして、 `key` , `secret` を設定します

```
$ cp aws.json.sample aws.json
```

```
{
    "key": "AKI*****************",
    "secret": "y2M*************************************",
    "bucket": "international-telephone-number.kyokutyo.com",
    "region": "ap-northeast-1"
}
```

以下のコマンドで指定の bucket にファイルが配置されます

```
$ gulp deploy
```
