const bcrypt = require('bcrypt');

(async () => {
  const hashed = await bcrypt.hash('P@ssw0rd!2025#', 10);
  console.log(hashed);
})();
