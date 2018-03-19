# git初心者への道 Level 4

初登場するコマンド: branch, tag, merge, cherry-pick, rebase

## 1. ブランチを作る

ブランチを作ってみましょう。

```
$ git branch lesson master
```

作成したブランチに移動しましょう。

```
$ git checkout lesson
```

ブランチの一覧を確認しましょう。

```
$ git branch
* lesson
  master
```

何かコミットしてみましょう。

```
$ git commit -m "lessonブランチでコミット"
```

履歴を確認しましょう。

```
$ git log
```

元いたブランチ(master)に戻ってみましょう。

```
$ git checkout master
```

履歴を確認しましょう。

```
$ git log
```

masterブランチの履歴には、lessonブランチでコミットした履歴がありません。   
このように、履歴の枝分かれさせて管理する事ができます。

```
A---B---C---D   master
             \
              E lesson
```

この時点では、masterブランチから派生したlessonブランチは、    
masterブランチのコミットをすべて持っていることになります。
このような状態をfast-fowardといいます。

ここでmasterブランチに新しい修正(F)をコミットすると、   
masterブランチには、lessonブランチが知らないコミットが履歴として追加されることになります。   
このような状態をnon-fast-fowardといいます。

```
A---B---C---D---F   master
             \
              E     lesson
```

## 2. ブランチとは

ブランチとは、上記のように、履歴を分岐させて管理させる機能です。

開発を行う上で、ソースコードには様々な修正が加えられます。    
機能追加、バグフィックス、検証用、ミス(!)などなど。

これらを一つの履歴で管理することを想像してください。無理ゲーですよね。    
リリース版のソースコードに検証用のコードが入り、    
Aの機能追加中にBの機能追加のコードが入り、    
挙げ句の果てにはミスのあるコードが入り…

このような複雑な管理を安全に行うために、履歴を枝分かれさせ、ブランチとして個別の履歴を作ります。

```
A---B---C        リリースブランチ
     \
      D---E      開発ブランチ
     \
      F---G---H  機能追加ブランチ
           \
            I    機能追加ブランチからの派生ブランチ(検証用)

```

gitでのブランチの運用方法はいろいろ議論のあるところですが、    
一般的な開発においては、Vincent Driessenさんの提唱する「A successful Git branching model」というブランチモデルが評判のようです。

> A successful Git branching model >> nvie.com
> http://nvie.com/posts/a-successful-git-branching-model/

このモデルを導入する、git-flowというgitのプラグインも存在します。

> git-flow cheatsheet
> http://danielkummer.github.io/git-flow-cheatsheet/index.ja_JP.html

## 3. ブランチを削除する

ブランチの削除を行います。

```
$ git branch -d <branchname>
```

## 4. ブランチ名を変更する

```
$ git branch -m <branchname> <newname>
```

## 5. ブランチのログや差分を見る

特定のブランチのログを確認します。

```
$ git log <branchname>
```

ブランチ間の差分を確認します。

```
$ git diff <branchA> <branchB>
```

## 6. tagをつける

ブランチ名というのは、履歴の枝につけられた名前です。    
ブランチを移動するのは、単純にその履歴の先頭に移動するということ。

同様に、特定のリビジョンに名前を付ける事ができます。```git tag``` コマンドを使います。

```
$ git tag <tagname> <revision>
```

たとえば、リリースリビジョンにバージョン名をつけて管理したりします。

```
$ git tag v1.1.0 460ac4
```

### 7. ブランチをマージする

マージという言葉は様々な用途で使われますが、    
ブランチに別のブランチの変更を取り込む事をブランチのマージと言います。

```
A---B---C---D           master
             \
              E---F     lesson
```

masterブランチにlessonブランチの変更をマージする場合は、次のようにします。

```
$ git checkout master
$ git merge lesson
```

これで、lessonブランチの変更(E,F)が、masterの履歴に取り込まれ、masterブランチとlessonブランチは同じ履歴を持つ事になります。

```
A---B---C---D---E---F   master, lesson
```


### 8. 異なる履歴を持つブランチをマージする

異なる履歴を持つブランチ同士のマージを考えましょう。

```
A---B---C---D---G       master
             \
              E---F     lesson
```

前回のマージでは、lessonブランチの履歴に追加された修正を、masterブランチの先頭に追加するだけですみました。
では、masterブランチにも独自の修正(G)が追加されている場合はどうなるでしょう。

```
$ git checkout master
$ git merge lesson
```

マージの方法は同じです。

```
A---B---C---D---G---H   master
             \     /
              E---F     lesson
```

この場合、lessonブランチの修正(E, F)を、masterブランチにマージした(H)というコミットが追加されます。

masterブランチのログには、lessonブランチの修正(E,F)も含まれます。

```
$ git log --oneline
8a9bca6 H
dffdcb5 F
24ec04a G
128601a E
4b55f65 D
f1fda71 C
cab6f6b B
bc73968 A
```

ここで、次の操作を試してみましょう。

```
$ git checkout HEAD^
$ git checkout HEAD^^
$ git checkout <Fのリビジョン>
```

履歴の枝分かれがそのまま保持されている事が分かると思います。    
```git log``` で枝分かれの情報を確認するには、```--graph ``` オプションを使います。

```
$ git log --oneline --graph 
* 8a9bca6 H
|\
| * dffdcb5 F
* | 24ec04a G
| * 128601a E
|/
* 4b55f65 D
* f1fda71 C
* cab6f6b B
* bc73968 A
```

ブランチ名も表示したい場合は、```--decorate```オプションを追加しましょう。


### 9. コンフリクトを解決する

異なる履歴をマージする際、それぞれのブランチで同じ部分に修正があるとどうなるでしょう？

例えば次のようなテキストファイルに、ブランチA、ブランチBで修正を入れたとします。

テキストファイル.txt
```
hoge1
hoge2
```

ブランチAでの修正
```
hoge1
piyo
hoge2
```

ブランチBでの修正
```
hoge1
fuga
hoge2
```

このように、同じ部分に修正を入れた場合など、修正をどう反映すればよいかgitが判断できない場合を、    
コンフリクト(競合)が発生するといい、gitはコンフリクトの解決をユーザにゆだねます。

```
$ git merge ブランチB
Auto-merging テキストファイル.txt
CONFLICT (content): Merge conflict in テキストファイル.txt
Automatic merge failed; fix conflicts and then commit the result.
```

statusを確認すると次のようになっています。

```
$ git status
# On branch ブランチA
# Unmerged paths:
#   (use "git add/rm <file>..." as appropriate to mark resolution)
#
#         both modified:      テキストファイル.txt
#
no changes added to commit (use "git add" and/or "git commit -a")
```

テキストファイル.txtを開いてみましょう。

```
hoge1
<<<<<<< HEAD
piyo
=======
fuga
>>>>>>> ブランチB
hoge2
```

これは、```<<<<<<< HEAD``` から```=======``` までの間が、自分自身(ブランチA)の変更、    
```=======``` から、```>>>>>>> ブランチB``` までの間が、ブランチBの変更であるという状態を表しています。

piyoが正しいのか、fugaが正しいのか、それとも両方必要なのか、順番はどちらが上なのか、などの情報は、コードを書いている本人にしか分かりませんよね。

このような場合、ユーザが```<<<<<<< HEAD``` などの記号を消し、正しい状態にしてコミットしてやる必要があります。

エディタで次のように修正し、コミットしましょう。

```
hoge1
piyo
fuga
hoge2
```

```
$ git commit -a
```

自動的に、マージしましたという旨のコミットメッセージが挿入されます。

ブランチ運用に、コンフリクトはつきものです。しかしながら、マージの際にあまりにたくさんのコンフリクトが発生すると、正確なマージが難しくなってきます。ブランチの粒度を小さくするなど、運用には工夫が必要です。

### 10. 特定のコミットだけをマージする

ブランチ同士のマージではなく、とある別のブランチの、特定のコミットだけを取り込みたいなーなんてこともあります。
その場合は、```git cherry-pick``` を使います。つまみ食いですね。

```
$ git cherry-pick <revision>
```

マージの操作はブランチのマージと同様です。

### 11. 派生元のブランチの修正を取り込む

masterブランチから派生したlessonブランチで作業中、masterブランチに新しい修正(G)がコミットされました。

```
A---B---C---D---G       master
             \
              E---F     lesson
```

このとき、lessonブランチにも修正(G)を取り込みたいと思います。   

```git merge``` を使うと、次のように取り込む事ができます。

```
$ git checkout lesson
$ git merge master
```

このように、lessonブランチに、masterブランチをマージしたというコミットが追加されます。

```
A---B---C---D------G     master
             \      \
              E---F--H   lesson
```

さらに、ここからそれぞれのブランチに修正が入り、それを、今度はmasterブランチにマージすることを考えましょう。

```
A---B---C---D------G---J---K  master
             \      \     /
              E---F--H---I    lesson
```

非常に複雑になりますね。

gitには```git rebase``` というコマンドがあります。   


```
$ git checkout lesson
$ git rebase master
```

マージは、lessonブランチにmasterブランチの修正を追加する。というイメージでしたが、   
rebaseは、masterブランチの先頭に、lessonの修正を追加し直す。というイメージです。

```
A---B---C---D---G       master
             \
              E---F     lesson
```

```
A---B---C---D---G           master
                 \
                  E'---F'   lesson
```

こうすることで、lessonブランチは最新の状態のmasterブランチから派生したことになり、履歴がスッキリしますね。

注目すべきは、rebase後のlessonブランチの履歴が、E'、F'となっていることです。   
実際に異なるリビジョン番号が付与されていると思います。つまり、修正の内容は同じですが、異なるコミットとして反映されているという事です。

> 履歴を書き換えるということが何を意味するのか、しっかり理解した上で作業してください。

↑これですね。

rebaseでは何が行われているのかというと、    
まず、Eの差分、Fの差分をpatchにします。    
そして、masterの最新の履歴に、Eのpatch、Fのpatchの順にpatchを当てて行く作業を行います。   
patchを当てるたびに、コンフリクトが発生する場合は解決の必要があります。

```
$ git rebase master
Eのpatch反映 -> コンフリクト発生 -> エディタで修正
$ git add .
$ git rebase --continue
Fのpathc反映 -> コンフリクト発生 -> エディタで修正
$ git add .
$ git rebase --continue
```

途中でわけがわからなくなって最初からやり直したい場合は、```--abort``` オプションを指定します。

```
$ git rebase --abort
```

<br>
[INDEX](https://gist.github.com/yatemmma/6486028#file-git-lesson-md) | [TOP](https://gist.github.com/yatemmma/6486028#file-git-lesson4-md)