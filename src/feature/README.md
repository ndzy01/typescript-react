# 创建功能分支

```
# 从 develop 分支创建功能分支
git checkout -b feature01 dev

# 功能分支完成任务后 合并
git checkout dev
git pull
git merge --no-ff feature01
git push
```

# 最终删除功能分支

git branch -d feature01
