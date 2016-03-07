---
layout: post
author: Anthony Koch
title: Remember directories in Con Emu
use_excerpt_as_description: true
tags: ['con emu', 'command line']
post_id: 5
---

After an hour of research, trial, and error, I finally figured out how to get Con Emu to remember directories for tabs using Git Bash. When I first started using Con Emu, I swear it used to do this by default, but I guess updates in Con Emu or the Git Bash shell broke this feature. Either way, I've found a solution that worked for me to get this feature back.

<!-- endexcerpt -->

According to the [documentation](http://conemu.github.io/en/ShellWorkDir.html#shell-working-directory), Con Emu is not able to monitor the changes in directory in the shell. As a result, we have to tell Git Bash to store the working directory, as it states [here in the docs](http://conemu.github.io/en/ShellWorkDir.html#bash_and_other_cygwin_shells). 

Open your text editor, or the terminal, and create a file in `~/` called `.bash_profile` and enter the contents which the Con Emu documentation states, which is shown below. After creating this file and entering the contents below, it should start remembering the directories. 

```
PROMPT_COMMAND='ConEmuC -StoreCWD'
```

The file is `.bash_profile`, and not `.bashrc` because apparently when Git Bash is run with the `--login` flag, it reads the settings from `.bash_profile` and not `.bashrc`. The place I found this was a reply to a [Stackoverflow question](http://superuser.com/questions/602872/how-do-i-modify-my-git-bash-profile-in-windows).

> __Note:__ `~/` is an alias for the home directory of your user, e.g. `C:\Users\{yourusername}`, so the file's location would be `C:\Users\{yourusername}\.bash_profile` . 



### Further Resources 

[bashrc or equivalent config for Windows](http://stackoverflow.com/questions/6883760/git-for-windows-bashrc-or-equivalent-config-files-for-git-bash-shell)
