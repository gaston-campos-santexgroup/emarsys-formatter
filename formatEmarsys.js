const fs = require('fs');
const prettier = require('prettier');

// Helper function to tokenize the content
function tokenizeContent(content) {
  const tokens = [];
  const regex = /({%.*?%})|(<.*?>)|([^<>{}%]+)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    tokens.push(match[0]);
  }
  return tokens;
}

// Helper function to add indentation and remove unnecessary new lines
function addIndentation(tokens) {
  let indentLevel = 0;
  return tokens
    .map(token => {
      const trimmedToken = token.trim();
      if (trimmedToken.startsWith('{% endif') || trimmedToken.startsWith('{% else') || trimmedToken.startsWith('{% elseif')) {
        indentLevel -= 1;
      }
      const indentedToken = '  '.repeat(indentLevel) + trimmedToken;
      if (trimmedToken.startsWith('{% if') || trimmedToken.startsWith('{% elseif') || trimmedToken.startsWith('{% else')) {
        indentLevel += 1;
      }
      return indentedToken;
    })
    .join('\n');
}

// Custom formatting function for Emarsys Scripting Language
function formatEmarsys(content) {
  let formatted;
  try {
    // Prettier format with HTML parser
    formatted = prettier.format(content, {
      parser: 'html',
      tabWidth: 2,
      useTabs: false,
      htmlWhitespaceSensitivity: 'ignore',
      printWidth: 80,
      singleQuote: true,
      trailingComma: 'none'
    });
  } catch (e) {
    console.error('Prettier formatting error:', e);
    process.exit(1);
  }

  // Check if formatted content is a string
  if (typeof formatted !== 'string') {
    console.error('Formatted content is not a string:', formatted);
    process.exit(1);
  }

  // Tokenize and add indentation
  const tokens = tokenizeContent(formatted);
  return addIndentation(tokens)
    .replace(/\n\s*\n/g, '\n');  // Remove extra new lines with only spaces
}

// Read, format, and write back the content of the .inc file
function formatFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const formattedContent = formatEmarsys(content);
  fs.writeFileSync(filePath, formattedContent);
  console.log(`File ${filePath} formatted successfully!`);
}

// Get file path from command line arguments
const filePath = process.argv[2];
if (!filePath) {
  console.error('Please provide a file path as an argument');
  process.exit(1);
}

formatFile(filePath);
