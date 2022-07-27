# simple-git

Batch delete git branches: visualization, fuzzy matching, manual multiple selection, precise selection

Easy to clean up useless branches 

## Install

```shell
npm install -g simple-git
```

## Usage

```shell
# normal delete method
git branch -d xxx
git push origin -d xxx
# normal Batch delete method
git branch | grep  'xxx' | xargs git branch -d
git branch -r | grep  'xxx' | sed 's/origin\///g' | xargs -I {} git push origin :{}

```

***

```
# the new way
sgit branch -h

Usage: branch [options]

simple-git Batch delete git branches: visualization, fuzzy matching, manual multiple selection, precise selection

Options:
  -d, --delete [delete]       delete branch (Default)
  -D, --delete [deleteForce]  force delete branch

  -a, --all [all]             all branches
  -l, --local [local]         local branch only(Default)
  -r, --remote [remote]       remote branch only
  -f, --fuzzy [fuzzy]         fuzzy matching

  -m, --multiple [multiple]   Is it multiple choice(Default multi-select)
  -s, --selected [selected]   Is it selected(Default not selected)

  -c, --cwd [cwd]             project path(Default current directory)
  -y, --yes [yes]             Need a second confirmation?(Default need)
  
  -h, --help                  output usage information

```
> example:
> 
> ![img-spd](https://raw.githubusercontent.com/6132wzg/simple-git-tools/master/simple-git-tools.png)




## License

MIT