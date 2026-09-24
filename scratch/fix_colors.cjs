const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('src/components', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // text-[#1E1E1E] -> text-[#1E1E1E] dark:text-white
    // But only if not followed by dark:text-white
    content = content.replace(/text-\[\#1E1E1E\](?!\s+dark:text-white|\/)/g, 'text-[#1E1E1E] dark:text-white');
    
    // text-[#1E1E1E]/XX -> text-[#1E1E1E]/XX dark:text-white/XX
    content = content.replace(/text-\[\#1E1E1E\]\/(\d+)(?!\s+dark:text-white)/g, 'text-[#1E1E1E]/$1 dark:text-white/$1');
    
    // text-black -> text-black dark:text-white
    content = content.replace(/text-black(?!\s+dark:text-white|\/)/g, 'text-black dark:text-white');
    
    // bg-white -> bg-white dark:bg-[#1E1E1E] (except if followed by dark:)
    content = content.replace(/bg-white(?!\s+dark:bg|\/)/g, 'bg-white dark:bg-[#1C1C1C]');

    // bg-white/XX -> bg-white/XX dark:bg-white/XX ? usually bg-white/10 is for dark mode actually. Let's ignore bg-white/XX for now.

    // border-[#1E1E1E]/XX -> border-[#1E1E1E]/XX dark:border-white/XX
    content = content.replace(/border-\[\#1E1E1E\]\/(\d+)(?!\s+dark:border-white)/g, 'border-[#1E1E1E]/$1 dark:border-white/$1');

    if (content !== original) {
      console.log('Modified:', filePath);
      fs.writeFileSync(filePath, content, 'utf8');
    }
  }
});
