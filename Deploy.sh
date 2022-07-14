#!/usr/bin/env sh
cd /Users/kanha/Repo/memory_game
set -e
npm run build
echo '----------------------'
git add build -f  
git commit -m 'deploy'
echo '----------------------'
git subtree push --prefix build origin gh-pages
echo '----------------------'
echo '✨ DONEEE!'