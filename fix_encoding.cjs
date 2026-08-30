const fs = require('fs');
let content = fs.readFileSync('src/data/initialPeriods.ts', 'utf8');
content = content.replace('return --;', 'return ${year}--;');
content = content.replace('dateRange:  - ,', "dateRange: 'Esta Semana',");
content = content.replace('periodLabel:   (Semana Actual),', "periodLabel: 'Semana Actual',");
fs.writeFileSync('src/data/initialPeriods.ts', content, 'utf8');
