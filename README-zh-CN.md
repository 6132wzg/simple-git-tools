# simple-git

批量删除git分支：可视化、模糊匹配、手动多选、精准选择

方便清理无用分支

## Install

```shell
npm install -g simple-git
```

## Usage

```shell
# 普通的删除方式
git branch -d xxx
git push origin -d xxx
# 普通的批量删除
git branch | grep  'xxx' | xargs git branch -d
git branch -r | grep  'xxx' | sed 's/origin\///g' | xargs -I {} git push origin :{}

```

***

```shell
sgit branch -h

Usage: branch [options]

simple-git 批量删除 git 分支：可视化、模糊匹配、手动多选、精准选择

Options:
  -d, --delete [delete]       删除分支操作(默认)
  -D, --delete [deleteForce]  强制删除分支操作

  -a, --all [all]             所有分支
  -l, --local [local]         仅本地分支(默认)
  -r, --remote [remote]       仅远程分支
  -f, --fuzzy [fuzzy]         模糊匹配

  -m, --multiple [multiple]   是否为多选(默认多选)
  -s, --selected [selected]   是否选中(默认不选中)

  -c, --cwd [cwd]             项目地址(默认为当前目录)
  -h, --help                  展示使用说明

```
> 示例：
> 
> ![img-spd](https://raw.githubusercontent.com/6132wzg/simple-git-tools/master/simple-git-tools.png)

## License

MIT