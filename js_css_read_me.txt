css jsの構成のルール

stylusとpugを使用。

—css—
□概要
・探しやすい、再利用しやすい。
・デフォルトCSS以外の共通ファイルは作らない。(各ファイルに専用のCSSが1つある。)
・デフォルトCSSの.mT10等は一つのクラスに収まるなら使用しない。(極力複数クラスにしないようにする。)
例）class="header__title mT10"　header__titleにmargin-top:10pxが入れられるならmT10は使わない。
・基本的に間の間隔は縦はmargin-topで指定
・border: 0;margin: 0;のように0にはpx等の値はつけない。
・Idにstyleを付与しない。
・プロパティー値区切りコロン（:)の後のスペース:。

□class
・BEMを使用。
・BEM参考URL： https://github.com/manabuyasuda/styleguide/blob/master/how-to-bem.md
・ルールからかなりそれた場合はコメントアウト。
例）searchPanel__titleName—red
・インデントにはタブ、スペースを混在させない。
・js含むクラス名。
例）
クラス名：hoge　cssのみ
クラス名：js-hoge　スタイル付与禁止(jsでのみ)
クラス名：is-hoge　クラスをJsで付与したい時

□css置き場
各画面css置き場
/dp/jr/u/test0011(各画面により変化)/css/

デフォルトCSS置き場
/dp/jr/u/css/


—js—
□概要
・先頭にコメントアウトで書くもの(jQueryの〜ヴァージョンから動く等)
・複数行のコメントアウトには
/**
コメントアウト
コメントアウト
(複数行の場合のコメントアウトは/**　で囲む)
*/
　コメントアウトが一行の場合//で補足したいものの上に配置。
・最後にセミコロン;を入れる。省略も可能ですが、入れる
・イベントはonを使う。
例）.on(‘click’, function(){});
・無名関数で記載。
例）var aaaAAA = function(){}
・プロトタイプで制作。

□js命名規則
・関数の命名規則は動詞または動詞＋名詞となるように命名する。
・また関数の命名規則lowerCamelCaseを使う。
例）var clickContents = function(){}
・http://analogic.jp/naming-convention/
・変数はlowerCamelCaseを使う。
・定数は大文字
例）AAA_BBB_CCC = 0;
・「～であるか」、「～を有するか」、「～が可能か」といった場合、isを付ける
例）$isLogin
・ループカウンターはiから始まる
例）$i, $j, $k
・http://oxynotes.com/?p=8679

□js置き場
各画面js置き場
/dp/jr/u/test0011(各画面により変化)/js/


—jquery—
□概要
・var $sidebar = $('.sidebar’);の様に変数の先頭に$をつける。
・基本的にネイティブは使用せずjQueryで記述。


—読み込むライブラリ—
・jquery-1.12.4.min.js
ー推奨ライブラリー
・Moment.js
・その他画面ごとで必要なライブラリ。

□ライブラリ置き場
/dp/jr/u/js/


ーロールー
(

・ヘッダー・フッターの共通部分を操作する方：FEリーダー、または権利譲受された方
・master等のブランチ管理：FEリーダー、または権利譲受された方
・新gulpプラグイン等の追加：チームで相談し、認可されたもの。
・作業分担：個人、リーダー。
・制作：資料参照のもと画面作成。
・確認：個人確認後、デザイナーさん、マネージャー（ディレクター）さんに確認だし。
・プルリク出す方：画面製作者。
・プルリク見る方：FEリーダー、または権利譲受された方
・納品：確認だし後納品。

);


ーprettierー

・gulpで使用可能。
https://www.npmjs.com/package/gulp-prettier-plugin
・gulp-prettier-pluginはprettierをインスト-ルする必要あり。


ーGit Commitー

・コミットメッセージは規則なし。
例）fix: .header__titleのmargin-topの値を5pxから10pxに修正。
・コミットはこまめに取る。
