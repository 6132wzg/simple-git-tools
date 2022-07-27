const inquirer = require("inquirer");
const { execSync } = require('child_process');

const operateCheck = (options) => {
    if (options.delete || options.deleteForce) {
        return 'delete'
    }
}

// git branch
async function branch(options) {
    let promps = [];
    // 判断目标目录是否存在git
    if (!checkGit(options)) return
    options.operateName = operateCheck(options);
    let branchList = getBranchs(options);
    promps.push({
        type: options.multiple ? 'checkbox' : 'list',
        message: `[${branchList.length}] select branch to ${options.operateName}`,
        name: 'branchs',
        pageSize: 30,
        choices: branchList,
        validate: function (answer) {
            if (options.multiple && answer.length < 1) {
                return 'You must choose at least one branch.';
            }
            return true;
        },
    });
    if (!options.yes) {
        promps.push({
            type: 'confirm',
            message: 'continue to ' + options.operateName,
            name: 'yes'
        });
    }

    inquirer.prompt(promps).then(function (answers) {
        const { yes } = answers;
        if (!yes) return;
        switch (options.operateName) {
            case 'delete':
                // 删除分之操作
                branchBatchDelete(answers, options)
                break;
            default:
                break;
        }
    });
}

function checkGit(options) {
    const projectPath = options.cwd || process.cwd();
    let commanderStr = 'git branch';
    if (options.all || options.remote) {
        commanderStr = 'git fetch -p';
    }
    try {
        execSync(commanderStr, { cwd: projectPath });
    } catch (error) {
        console.log(projectPath + '不是git项目');
        return false
    }
    return true
}

function getBranchs(options) {
    const projectPath = options.cwd || process.cwd();
    let branchList = [];
    let commanderStr = 'git branch';
    if (options.all) {
        commanderStr += ' -a';
    } else if (options.remote) {
        commanderStr += ' -r';
    }
    if (options.fuzzy && typeof options.fuzzy === 'string') {
        commanderStr += ` | grep '${options.fuzzy}'`
    }
    const branchStr = execSync(commanderStr, { cwd: projectPath }).toString();
    if (branchStr) {
        branchStr.split('\n').map(branch => {
            let disabled = options.operateName === 'delete' && (/^\*/.test(branch) || branch.includes('release') || branch.includes('master'));
            branch && branchList.push({
                name: branch,
                checked: !disabled && options.selected,
                // 删除操作时：release、master以及当前分之 不可选
                disabled,
            })
        })
    }
    return branchList;
}

// 批量删除分之
function branchBatchDelete(answers, options) {
    const { branchs } = answers;
    if (typeof branchs === 'string') {
        branchs = [branchs];
    }
    branchs.map(branch => {
        branchDelete(branch.trim(), options);
    })
}
// 删除分之
function branchDelete(branch, options) {
    const projectPath = options.cwd || process.cwd()
    let commanderStr = ''
    let commanderOptStr = '-d'
    if (options.deleteForce) {
        commanderOptStr = '-D'
    }
    if (/^remotes\/.*/.test(branch) || options.remote) {
        branch = branch.replace(/^remotes\//, '').replace(/^origin\//, '');
        commanderStr = `git push origin ${commanderOptStr} ${branch}`;
    } else {
        commanderStr = `git branch ${commanderOptStr} ${branch}`;
    }
    try {
        execSync(commanderStr, { cwd: projectPath });
    } catch (error) {
        console.log('delete branch fail: ' + branch + options.deleteForce);
    }
}

module.exports = branch;