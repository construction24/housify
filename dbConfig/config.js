  
const MONGODB_BASE_URI = process.env.MONGODB_URI;
const DATABASE_NAME = 'housify24'; // Replace with your actual database name

const MONGODB_URI = `${MONGODB_BASE_URI}/${DATABASE_NAME}`;

module.exports = {
  MONGODB_URI,
};
