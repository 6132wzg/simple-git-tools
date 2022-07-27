# simple-git

Batch delete git branches: visualization, fuzzy matching, manual multiple selection, precise selection

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

# the new way
![img-spd](https://github.com/tuobaye0711/img-spd/raw/master/img-spd.png)
```

```shell
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
  -s, --selected [selected]   Is it selected(Default selected)

  -c, --cwd [cwd]             project path(Default current directory)
  -h, --help                  output usage information
```

## License

MIT