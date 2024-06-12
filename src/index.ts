import app from "./drivers/framework";
import logger from './drivers/logger/logger';

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    logger.get().info(`Server is running on http://localhost:${PORT}`);
});
