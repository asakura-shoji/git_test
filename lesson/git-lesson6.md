# git中級者への道

初登場するコマンド: stash, reflog, blame

## 1. gitコマンドのショートカットを設定する

```git config``` でaliasを設定すると、gitコマンドのショートカットを設定する事ができます。

```
$ git config --global alias.co "checkout"
$ git config --global alias.ci "commit -a"
```

入力を短縮し、ガンガン生産性をアップしましょう。

エイリアスの短縮コマンドは自由につけてかまいませんが、    
subversionのコマンドに合わせてつけるのが一般的のようです。    
```.gitconfig alias``` でweb検索するといろいろな参考情報が出てきます。

オススメをいくつか上げておきます。

```
st = status -sb
l = log --color --pretty=\"format:%Cgreen%ai%Creset %h %Cred(%an):%Creset%C(yellow)%d%Creset %s\" -40
```

### 参考サイト

> dotfiles/.gitconfig at master · yatemmma/dotfiles
> https://github.com/yatemmma/dotfiles/blob/master/.gitconfig

> 天下一gitconfig大会    
> https://gist.github.com/teppeis/4117588


## 2. gitコマンド、ブランチ名の補完を有効にする

git-compilation というgit公式の拡張機能があります。

> https://github.com/git/git/tree/master/contrib/completion

これをシェルに読み込ませると、gitコマンドやブランチ名がtabキーで補完されるようになります。
また、プロンプトに現在のブランチ名を表示することも可能になります。超benryです。

以下はMac(Homebrewインストール)の.bashrcサンプルです。

```
# prompt
. /usr/local/etc/bash_completion.d/git-prompt.sh
. /usr/local/etc/bash_completion.d/git-completion.bash
GIT_PS1_SHOWDIRTYSTATE=true
export PS1='\[\e[1;33m\]\W\[\033[0;31m\]$(__git_ps1)\[\033[00m\]\$ '
```

こんな感じ。

```
git_shoshinsha (master *)$ 
```

## 3. git browse-remote

> Git リポジトリの Web サイト (GitHub とか) を簡単に開けるコマンドを作った - NaN days - subtech
> http://subtech.g.hatena.ne.jp/motemen/20120917/1347889804

ターミナルから現在のリポジトリのGitHubページをブラウザで開ける神ツール。

## 4. 作業ブランチ以外のブランチをpushしないようにする対策

```
$ git config --global push.default current
```

これをやっておけば、```git push``` しても作業ブランチしかpushされません。    
でも安全のため、```git push origin <branchname>``` とする習慣をつけましょう。

### 参考サイト

> 引数なしのgit pushは危険なので気をつけましょう - DQNEO起業日記
> http://dqn.sakusakutto.jp/2012/10/git_push.html

## 5. 修正をいったん退避する

あるブランチで作業中に、他のブランチに切り替えて動作検証しなくちゃいけなくなったりと、    
作業中のコミット前の修正を退避しておきたいことがよくあります。そんなときは```git stash``` が便利。

```
$ git stash save "メッセージ"
```

取り出して適用する。退避時と違うブランチでもOK。
```
$ git stash pop
```

退避一覧。
```
$ git stash list
```

### 参考サイト

> transitive.info - git stash 使い方    
> http://transitive.info/article/git/command/stash/


## 6. resetやらamendをやっぱりやめる

gitの便利代表格でもあるresetコマンド、amendコマンドですが、やっぱりやめれば良かった！と思う事もなきにしもあらずです。    
特に```--hard``` オプションをつけたときのやってしまった感は非常につらいものがあります。

push前なら、```git reset``` コマンドでトラッキングブランチにresetしてやればOKです。

```
$ git reset --hard origin/<branchname>
```

しかしpushしてしまった後では、トラッキングブランチにも反映済み。resetはできません。

そんなときは、```git reflog``` を実行してみましょう。

```
$ git reflog
```

HEADがどのように移り変わってきたのかの記録が参照できます。    
これで、履歴から外れてしまったコミットも見つけ出す事ができ、reset前に戻る事も可能です。


なお、次のコマンドでさらに詳細な情報が得られます。

```
$ git log -g
```

### 参考サイト

> gitでアレを元に戻す108の方法 - TIM Labs    
> http://labs.timedia.co.jp/2011/08/git-undo-999.html


## 7. 直前の作業ブランチに戻る

```
$ git checkout -
```

## 8. pullでrebaseする

```git pull``` した際にリモートの履歴が進んでいると、自動的にマージされます。
```--rebase``` オプションをつけておくと、マージではなくrebaseしてくれます。

```
$ git pull --rebase
```

## 9. コミットをまとめる

無駄なコミットログは残すべきではありません。push前にコミットログの精査をすると、    
いくつかのコミットをまとめたいことがよくあります。

私はまとめてresetしてからcommitし直すのが好きですが、rebaseを使う方法もあります。

```
$ git rebase -i HEAD~3
```

HEADから3つ分のコミットを編集します。

```
pick 42462d4 コミットB
pick 58706a3 コミットC
pick c6a77c4 コミットD
```

```pick``` の部分を```squach``` に変更すると、そのコミットは一つ前(上)のコミットに統合されます。

順番を入れ替えたりすることも可能です。

### 参考サイト

> gitのコミットの歴史を改変する(git rebase) 1 / 2 - けんごのお屋敷
> http://tkengo.github.io/blog/2013/05/16/git-rebase-reference/
> http://tkengo.github.io/blog/2013/06/08/git-rebase-reference2/


## 10. マージをやっぱりやめる

マージして動作確認したら動かなかった。そんなときでも大丈夫。そうgitならね。

```
$ git reset --hard ORIG_HEAD
```

ORIG_HEAD にはマージ前のリビジョンが保持されています。ORIG_HEADにresetすることで元にもどすことが可能です。

このような変数は他にも、FETCH_HEAD, MERGE_HEAD, CHERRY_PICK_HEAD などがあります。


## 11. 犯人探しする

hoge.m になんだか良く分からないメソッド```eatCurry```が追加されていたとします。    
コードを読んでも意図が分からず・・・ そんなときはコミットログから修正時の情報を読み取ります。

```
$ git blame hoge.m
```

```git blame``` コマンドを使うとファイルの各行に対する最新のコミットを参照する事ができます。

しかしそのコミットがフォーマットの修正などによるもので、
```eatCurry``` コマンドが追加されたときのコミットでは無かった場合、もっと過去の履歴を探す必要があります。

```git log``` の ```-S``` オプションを使うと、その文字列が最初に追加されたコミットを参照できます。

```
$ git log -S --patch "eatCurry" hoge.m
```

じっちゃんはいつも一つ！

## 参考サイト

> 見えないチカラ: 【翻訳】あなたの知らないGit Tips    
> http://keijinsonyaban.blogspot.jp/2010/11/git-tips.html

> あまり知られていないGitのTips - アジャイルSEを目指すブログ
> http://d.hatena.ne.jp/sinsoku/20111206/1323104408

> 図で分かるgit-mergeの--ff, --no-ff, --squashの違い - アジャイルSEを目指すブログ    
> http://d.hatena.ne.jp/sinsoku/20111025/1319497900

> チーム開発に必要なgit コマンドを神速で習得しよう！ - 酒と泪とRubyとRailsと
> http://morizyun.github.io/blog/how-to-git-review-book/

<br>
[INDEX](https://gist.github.com/yatemmma/6486028#file-git-lesson-md) | [TOP](https://gist.github.com/yatemmma/6486028#file-git-lesson6-md)
