# git初心者への道 Level 1

初登場するコマンド: init, add, commit, log, config, status, diff

## 0. インストールしよう

### Mac

```
$ brew install git
```

### Windows

* http://msysgit.github.io/ からmsysgitの最新をインストール
* もしくは、cygwinでgitを追加

## 1. やってみよう

```
$ mkdir git-lesson
$ cd git-lesson
```
ディレクトリを作成します。

```
$ git init
```
gitを使う準備はこれだけ。

```
$ echo "hello git" > hello.txt
$ git add hello.txt
$ git commit -m "やってみた"
$ git log
```
ファイルの追加を記録できました。簡単ですね。

```git init``` で、ファイルの変更や履歴の情報をつかさどる「リポジトリ」が作成されます。
リポジトリは、.gitというディレクトリで管理されます。つまり.gitを削除するとリポジトリの情報は消えるということ。

## 2. ファイルを修正する

hello.txtを開いて修正してみましょう。
修正を記録するには下記のコマンドを実行します。

```
$ git add hello.txt
$ git commit -m "修正してみた"
```
ファイルの修正を記録できました。簡単ですね。

修正を記録し、履歴として参照できる状態にすることを、コミットすると言います。
commitの直前に行っているaddは、修正をコミットの対象に追加する、というニュアンスです。
addしていない修正は、commitを実行してもコミットされません。

## 3. ファイルを追加する

新しいファイルを作成しましょう。

```
$ echo "I am curry." > curry.txt
```

curry.txtをコミットします。
```
$ git add curry.txt
$ git commit -m "追加してみた"
```

新しいファイルをコミットできました。簡単ですね。


## 4. ファイルを削除をする

ファイルの削除をしましょう。

```
$ rm -i curry.txt
```

ファイルの削除をコミットします。
```
$ git rm curry.txt
$ git commit -m "削除してみた"
```

ファイルの削除がコミットできました。簡単ですね。

## 5. 修正履歴を確認する

```
$ git log
```
修正の履歴を確認する事ができます。

履歴が１ページにおさまらないときは、スペースで改ページ、```q```で終了します。
(git logやgit diffのpagerにはデフォルトでlessが設定されています。)

### ログの見方

```
commit 29ef86453d24354e67b5f913999ad86adce9f092 ・・・①
Author: yatemmma <yatemmma@gmail.com> ・・・②
Date:   Mon Sep 9 00:10:19 2013 +0900 ・・・③

    やってみた ・・・④
```

* ① Revision: いわゆるコミット番号です。修正の履歴を一意に特定するハッシュ値が割り振られます。
* ② Author: 修正者の情報です。後述のconfigで設定できます。
* ③ Date: コミットした時刻です。
* ④ Message: コミットメッセージです。修正内容の概要を入力します。


## 6. 設定を変更する

コミット時のAuthorを変更してみましょう。

```
$ git config --global user.name yatemmma
$ git config --global user.email yatemmma@gmail.com
```

出力を色付けしてくれる設定もしておきましょう。

```
$ git config --global ui.color auto
```

あとは安全対策

```
$ git config --global push.default current
```

Windowsクライアントで改行のワーニングが出る場合は、

```
git config --global core.autocrlf false
```

設定を確認するには、```-l```オプションを使います。

```
$ git config -l --global
```

## 7. ステータスを確認する

```
$ git status
```

```git status```で、現在の作業状況が確認できます。
ファイルの追加や削除、修正、addなどを行って、statusの出力がどう変わるかを確認しましょう。

### statusの見方

```
# On branch master         ・・・①
# Changes to be committed: ・・・②
#   (use "git reset HEAD <file>..." to unstage)
#
#    modified:   hello.txt
#
# Changes not staged for commit: ・・・③
#   (use "git add/rm <file>..." to update what will be committed)
#   (use "git checkout -- <file>..." to discard changes in working directory)
#
#	deleted:    c.txt
#	modified:   hello.txt
#
# Untracked files: ・・・④
#   (use "git add <file>..." to include in what will be committed)
#
#	a.txt
```

* ① 作業ブランチです。ブランチについては後述します。
* ② Changes to be committed: コミットする準備ができた修正です。addしたものですね。ステージングされてインデックス(後述)に登録された修正がリストアップされます(緑)。
* ③ Changes not staged for commit: ステージングされていない、インデックス未登録のワーキングツリー(後述)の修正がリストアップされます(赤)。addする前の修正です。
* ④ Untracked files: まだgitで管理する対象になっていない、新しいファイルがリストアップされます(赤)。

### 状態の遷移

```git status```では修正がどのように扱われている状態なのかを確認する事ができます。

ファイルに修正が行われコミットされるまでの間に、gitでは３つの状態をいったりきたりします。
commitの前にaddが必要なのはこのためです。イメージできるようにしましょう。

* ワーキングツリー
    * 現在作業している実ファイルです。
* インデックス
    * コミットするための情報を登録する場所を指します。インデックスに登録されたものだけがコミットされます。
* ローカルリポジトリ
    * コミットの情報が記録される場所です。

## 7. 差分を確認する

ファイルを修正した状態で、コミットする前に差分を確認しましょう。

```
$ git diff
```

```git diff```で、ワーキングツリーとリポジトリとのファイルの差分、つまり修正の内容を確認する事ができます。
コミット前に、修正内容が間違っていないかどうか、差分をチェックする癖を付けましょう。

## 参考サイト

> Git初心者に捧ぐ！Gitの「これなんで？」を解説します。 | KRAY Inc    
> http://kray.jp/blog/git-why-explanation/

> [Mac] Mountain Lionへパッケージ管理「Homebrew」をインストールする手順のメモ | Tools 4 Hack    
> http://tools4hack.santalab.me/howto-mountainlion-install-homebrew.html


<br>
[INDEX](https://gist.github.com/yatemmma/6486028#file-git-lesson-md) | [TOP](https://gist.github.com/yatemmma/6486028#file-git-lesson1-md)