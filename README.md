## アプリケーション概要

* [Wikipedia の「国際電話番号の一覧」ページ](http://ja.wikipedia.org/wiki/%E5%9B%BD%E9%9A%9B%E9%9B%BB%E8%A9%B1%E7%95%AA%E5%8F%B7%E3%81%AE%E4%B8%80%E8%A6%A7) をスクレイピングして JSON ファイルを作成します
* コードを入力すると、マッチする国を表示します

## はじめかた

必要なパッケージをインストールします

```
$ npm install
```


## 国際電話番号データ(JSON) の作成

### スクレイピング

```
$ npm run update-list
```


## 開発

サーバを起動、ファイルを watch します (Google Chrome で開く)

```
$ npm run watch
$ npm run server
```

## デプロイ

Netlify でホスティングしてます
