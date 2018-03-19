# git初心者への道 Level 2

初登場するコマンド: help, clean

## 1. コマンドを調べる

```
$ git help
$ git help -a
$ git help <command>
```

何だっけ？と思ったら調べましょう。

```
$ git help help
```

## 2. configの種類

```git config```には下記の3種類の設定があります。

|範囲|オプション|ファイル|
|:--|:--|:--|
|システム共通|--system|/usr/local/etc/gitconfig|
|ユーザー毎|--global|~/.gitconfig|
|リポジトリ固有|--local (デフォルト)|.git/config|

設定はシステム->ユーザー->リポジトリの順で読み込まれ、同じ項目は後で読み込まれた設定が優先されます。

共通で使いたい設定は、```git config --global user.name watashi```とし、
リポジトリ個別で設定したいものは```git config user.name curry```とオプション無しで指定すると良いでしょう。

ファイルを直接編集することでも設定を変更できます。

## 3. gitで管理しないファイルを指定する

gitで管理しない(コミット対象にしない)ファイルを指定するには、```.gitignore```というファイルを作成します。
たとえば、Macが作成する.DS_Storeなどを除外するには、.gitconfigファイルを作成して、```.DS_Store```と記述します。

代表的な言語、開発環境向けの.gitignoreのサンプルテンプレートがgithubから公開されています。MITライセンスです。

> github/gitignore
> https://github.com/github/gitignore

また、gitは空のディレクトリを管理対象にしません。
空のディレクトリをコミットしておきたい場合は、```.gitkeep```という名前の空ファイルを作成しておく事が一般的です。

## 4. git管理外のファイルをクリアする

ビルドによる生成ファイルや、IDEの設定ファイルなどのゴミをクリアする場合は、```git clean```を使用します。

```
$ git clean -fdx
```

## 5. addを省略してコミット

```
$ git commit -a
```

ワーキングツリーの修正をaddしてコミットしてくれます。
ただし、新規追加ファイルは個別にaddしてやる必要があります。


## 6. いろいろな差分の見方

```
$ git diff
```
ワーキングツリー と リポジトリの差分を表示します。

```
$ git diff --cached
```
インデックス と リポジトリの差分を表示します。

```
$ git diff HEAD
```
ワーキングツリー＆インデックス と リポジトリの差分を表示します。

```
$ git diff -w
```
行単位ではなく、単語単位で差分表示します。

```
$ git diff <branchname>
```
特定のブランチとの差分を表示します。


## 7. 履歴をちょっとすっきり見る

```
$ git log --oneline --decorate
```
logが一行ですっきり表示されます。

```git log```にはいろいろと出力フォーマットを変更するオプションがあります。試してみましょう。

### 8. リビジョンを移動する

```
$ git log
```

ひとつ前のリビジョンの状態に戻りたいとします。

```
$ git checkout HEAD^
```

ファイルの状態が一つ前のコミットの状態に変わり、
```git log```や```git status```の出力が変わったことが確認できると思います。

```HEAD``` というのは、現在の作業ブランチの履歴の先頭を表す言葉です。    
```HEAD^``` というのは、HEADからひとつ前のリビジョンを表します。   
2つ前なら```HEAD^^``` もしくは```HEAD~2``` とします。

さらに、リビジョン番号を指定して移動することもできます。

```
$ git checkout b785bc2
```

```git checkout```は、指定するリビジョンにワーキングツリーの状態を移動し、そこに```HEAD```の印をつけます。HEADやmasterなどのブランチ名は、リビジョンにつけられた別名とも言えます。

基本的に、ワーキングリーにコミット前の修正が残っている場合、履歴を移動するcheckoutはできません。


<br>
[INDEX](https://gist.github.com/yatemmma/6486028#file-git-lesson-md) | [TOP](https://gist.github.com/yatemmma/6486028#file-git-lesson2-md)