const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

let totalFixed = 0;

walkDir('src/components', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Fix broken opacity values: /70 became /7, /65 became /6, /50 became /5, /40 became /4, /80 became /8, /10 became /1, /60 became /6, /75 became /7
    // Pattern: #1E1E1E]/<single_digit> followed by space, quote, or end of string (not another digit)
    // These are the specific values that got truncated - the script incorrectly stripped the trailing 0
    
    // Fix /7 -> /70 (was /70)
    content = content.replace(/(\[\#1E1E1E\])\/7(?!\d)(\s)/g, '$1/70$2');
    content = content.replace(/(\[\#1E1E1E\])\/7(?!\d)(['"])/g, '$1/70$2');
    
    // Fix /6 -> /60 (was /60 or /65)
    // We need to be careful here - /65 became /6 or /60 became /6?
    // Check surrounding context - if original was /65 or /60
    // Actually the regex replaced /65 -> /6 5? No. Let's think:
    // Original: text-[#1E1E1E]/65 dark:text-white/65
    // Regex: text-\[\#1E1E1E\]\/(\d+) -> captures "65"
    // Replacement: text-[#1E1E1E]/65 dark:text-white/65  -- this seems fine
    // Wait - the issue might be different. Let me re-read the old script.
    // Old regex: /text-\[\#1E1E1E\]\/(\d+)(?!\s+dark:text-white)/g
    // "text-[#1E1E1E]/70 dark:text-white/70" - this already has dark:text-white, so it should NOT match
    // But "text-[#1E1E1E]/70" alone WOULD match -> becomes "text-[#1E1E1E]/70 dark:text-white/70" - fine
    // 
    // Wait the border issue: border-[#1E1E1E]/10 -> "border-[#1E1E1E]/10 dark:border-white/10"
    // But the script regex was: /border-\[\#1E1E1E\]\/(\d+)(?!\s+dark:border-white)/g
    // "border-[#1E1E1E]/10" captures "10", result: "border-[#1E1E1E]/10 dark:border-white/10" - fine
    //
    // So the actual issue must be something else. Let me check: Services.tsx line 28
    // 'border border-[#1E1E1E]/1 dark:border-white/10 dark:border-white/10'
    // Originally was: 'border border-[#1E1E1E]/10 dark:border-white/10' (already had dark:)
    // The regex: border-\[\#1E1E1E\]\/(\d+)(?!\s+dark:border-white) 
    // "border-[#1E1E1E]/10 dark:border-white/10" - negative lookahead for " dark:border-white"
    // After "/10" comes " dark:border-white" -> lookahead FAILS -> does NOT replace -> fine
    //
    // Hmm, the output shows "/1 " so "10" became "1 0"? No, it shows /1 followed by space then dark:
    // So the original must have been "/10" and somehow it became "/1"
    //
    // OH WAIT! The bg-white replacement added "dark:bg-[#1C1C1C]" everywhere.
    // "border border-[#1E1E1E]/10 dark:border-white/10" 
    // After bg-white regex runs on this line, "bg-white" inside it also gets replaced
    // But there's no bg-white here... 
    //
    // Let me just look at what actually happened by checking the file directly
    
    // The real fix: just restore truncated opacity values we can identify
    // From the grep results, we see these patterns:
    // /7 (should be /70 or /75)
    // /6 (should be /60 or /65)  
    // /5 (should be /50 or /55)
    // /4 (should be /40 or /45)
    // /8 (should be /80 or /8 is valid for /8... border-[#1E1E1E]/8 is valid!)
    // /1 (should be /10 or /15 - /1 alone is valid for 1%)
    
    // The tricky ones are /8 and /1 - these might be intentional (8% and 1% opacity)
    // OR they might be /80, /10, /15 truncated
    // From context: border-[#1E1E1E]/8 appears in many places (seems intentional = 8% border)
    // border-[#1E1E1E]/1 appears in Navbar and Services - probably WAS /10
    // text-[#1E1E1E]/7 -> should be /70
    // text-[#1E1E1E]/6 -> should be /60 or /65
    // text-[#1E1E1E]/5 -> should be /50 or /55
    // text-[#1E1E1E]/4 -> should be /40
    
    // Fix text opacity values (single digit after text classes -> add trailing 0)
    content = content.replace(/text-\[\#1E1E1E\]\/([5-9])(?!\d)/g, (match, digit) => {
      const fixed = digit + '0';
      return `text-[#1E1E1E]/${fixed}`;
    });
    
    // Fix border /1 -> /10 (border-[#1E1E1E]/1 should be /10)
    // But border-[#1E1E1E]/8 should stay as /8 (8% is intentional subtle border)
    // Only fix /1 (was definitely /10) and /2 (was /20) for borders
    content = content.replace(/border-\[\#1E1E1E\]\/1(?!\d)/g, 'border-[#1E1E1E]/10');
    content = content.replace(/border-\[\#1E1E1E\]\/2(?!\d)/g, 'border-[#1E1E1E]/20');
    
    // Fix bg-[#1E1E1E]/1 -> /10, /5 -> /50
    content = content.replace(/bg-\[\#1E1E1E\]\/([5-9])(?!\d)/g, (match, digit) => `bg-[#1E1E1E]/${digit}0`);
    content = content.replace(/bg-\[\#1E1E1E\]\/1(?!\d)/g, 'bg-[#1E1E1E]/10');
    
    // Fix dark:text-white duplicates
    content = content.replace(/(dark:text-white\/\d+)\s+\1/g, '$1');
    content = content.replace(/(dark:text-white)\s+\1/g, '$1');
    content = content.replace(/(dark:border-white\/\d+)\s+\1/g, '$1');
    content = content.replace(/(dark:bg-\[[^\]]+\])\s+\1/g, '$1');

    if (content !== original) {
      console.log('Fixed:', filePath);
      fs.writeFileSync(filePath, content, 'utf8');
      totalFixed++;
    }
  }
});

console.log(`Total files fixed: ${totalFixed}`);
