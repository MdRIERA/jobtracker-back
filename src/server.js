const app = require('./app');
const connectDB = require('./config/db');
const cors = require('cors')
app.use(cors())
const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});