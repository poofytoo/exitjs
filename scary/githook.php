<?php
echo "go";
echo shell_exec("git stash");
echo shell_exec("git pull");
echo "done";
?>
