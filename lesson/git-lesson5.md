# git初心者への道 Level 5

初登場するコマンド: clone, push, pull, fetch

## 1. リモートリポジトリの情報をとってくる

リモートリポジトリ？

これまで行ってきた操作は、自分のマシン内でローカルリポジトリに対して行ってきたものでした。    
複数人でソース管理を行う場合、リポジトリの情報を共有する必要があります。そのときに使われるのがリモートリポジトリです。

リモートリポジトリは、複数の環境から参照できるサーバに置かれます。    
社内サーバだったり、外部サーバだったり、GitHubやBitbucketなど、gitのリポジトリを提供するwebサービスも便利です。

そのリモートリポジトリの情報を、ローカルマシンに複製する場合は、```git clone``` を使います。

```
$ git clone <repository>
```

たとえば、このテキストのリポジトリをcloneする場合は次のようにします。

```
$ git clone https://gist.github.com/6486028.git
```

6486028というフォルダに、gitのリポジトリが複製されたと思います。
フォルダ名を指定したい場合は、引数を追加しましょう。

```
$ git clone https://gist.github.com/6486028.git git_shoshinsha
```

ローカル環境で```git init``` とした時と同様に、gitのリポジトリが作られています。


## 2. ローカルリポジトリの情報をリモートリポジトリへ反映させる

では、手元で修正した内容を、リモートリポジトリへ反映し、メンバーと共有したいとします。    
その場合は```git push``` コマンドを利用します。

```
$ git push origin lesson
```

lessonブランチの修正が、リモートリポジトリへ反映されました。

```git push``` コマンドは、ローカルリポジトリの情報をリモートリポジトリへ反映させます。    
引数無しで実行した場合、ローカルにあるブランチの修正すべてがリモートへ反映されることになります。    

必ず引数にブランチを指定し、ブランチ単位でのpushを心がけましょう。


## 3. リモートリポジトリの情報をローカルリポジトリへもってくる

リモートリポジトリの更新をローカルリポジトリへ落とすには、```git pull``` を使います。

```
$ git pull origin lesson
```

## 4. originって何？

さきほどからたびたび現れる```origin``` という単語は、何を意味しているのでしょうか。

```
$ git push origin lesson
```

じつはこれは、下記を省略した書き方なのです。

```
$ git push git@github.com:hogehoge/hoge.git lesson:lesson
```

```git@github.com:hogehoge/hoge.git``` というリモートリポジトリに対して、
ローカルのlessonブランチをリモートのlessonブランチにpushする。という意味です。

毎回長ったらしいURLを指定するのは大変なので、originという名前を付けてあげよう。という感じです。    
デフォルトでoriginという名前が使われます。他の名前にすることも可能です。

## 5. リモートリポジトリのブランチを削除する

リモートリポジトリのブランチを削除するにはこのように指定します。

```
$ git push origin :lesson
```

リモートのlessonブランチに対して、pushするブランチを未指定にしてやるというイメージです。   
ちょっと変わった指定の仕方ですね。


## 6. リモートリポジトリの情報をローカルリポジトリへ反映させる その2

先ほどは、リモートの情報をとってくるのに、```git pull``` コマンドを利用しました。

取得したリモートリポジトリの情報は、トラッキングブランチと呼ばれる場所に格納されます。   
リモートリポジトリとの同期用データの置き場所の用なものです。

トラッキングブランチを参照するには```origin/master```のように指定します。

```
$ git log origin/lesson
```

ブランチの一覧を確認するには、```-a``` オプションを使います。

```
$ git branch -a
```

リモートリポジトリの情報をローカルリポジトリのトラッキングブランチに反映させるには、```git fetch``` コマンドを使います。

```
$ git fetch
```

```git pull``` では、作業ブランチの状態もリモートの状態で更新されましたが、```git fetch``` では、
トラッキングブランチが更新されるだけなので、作業ブランチの状態はそのままです。

作業ブランチの状態をトラッキングブランチと同期させるためには、```git reset``` コマンドを使います。

```
$ git reset --hard origin/lesson
```


## 7. pushできない時の対処法

```git push``` コマンドは、ローカルリポジトリの情報をリモートリポジトリへ反映させます。

pushするまでの間に、リモートリポジトリに別のメンバーの修正が反映されてしまうと、履歴のコンフリクトが発生します。    
履歴のコンフリクトが発生するような状況では、pushはできません。

一度最新のリモートリポジトリの情報を取ってきて、そこにローカルの修正を加え直してからpushする必要があります。

ただし、rebaseなど履歴を書き換える操作を行った場合、履歴のコンフリクトは避けられません。
このような場合は、強制的にローカルの履歴をpushする必要があります。```--force(-f)``` オプションを使います。

```
$ git push --force origin lesson
```

```--force``` オプションは、その名の通りリモートリポジトリを強制的に書き換えます。非常に強力な操作です。    

誤ったコミット履歴を消し去ることもできれば、メンバーが一生懸命作ってきたソースコードを全消しすることもできます。    
使用は十分に注意し、なるべく```--force``` オプションを使わなくてもよい運用を心がけるべきでしょう。


## 8. git status のメッセージを読み解く

同期が撮れている場合。

```
$ git status
# On branch master
nothing to commit (working directory clean)
```

ローカルの履歴が進んでいる場合。    
リモートの情報(トラッキングブランチ origin/master)に対して、ローカルが1コミット分進んでいるというメッセージです。    
ローカルのコミットをpushして反映します。

```
$ git status
# On branch master
# Your branch is ahead of 'origin/master' by 1 commit.
#
nothing to commit (working directory clean)
```

リモートの履歴が進んでいる場合。    
リモートの情報(トラッキングブランチ origin/master)に対して、ローカルが1コミット分遅れているというメッセージです。    
fast-forwardで追いつく事が可能です。pullすると追いつきます。

```
$ git status
# On branch master
# Your branch is behind 'origin/master' by 1 commit, and can be fast-forwarded.
#
nothing to commit (working directory clean)
```

それぞれに異なるコミットがある場合。
リモートとローカルが分岐している(non-fast-foward)であるというメッセージです。
この場合、履歴のコンフリクトを解決してやる必要があります。

```
$ git status
# On branch master
# Your branch and 'origin/master' have diverged,
# and have 1 and 1 different commit each, respectively.
#
nothing to commit (working directory clean)
```

<br>
[INDEX](https://gist.github.com/yatemmma/6486028#file-git-lesson-md) | [TOP](https://gist.github.com/yatemmma/6486028#file-git-lesson5-md)