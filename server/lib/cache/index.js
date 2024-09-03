// import * as redis from "redis";

// const client = redis.createClient({
//   url: process.env.REDIS_URL,
// });
// client.on("error", (err) => console.log("Redis Client Error", err));

// client.connect();

// export async function invalidateCache(key) {
//   try {
//     await client.del(key);
//     console.log(`Cache invalidated for key: ${key}`);
//   } catch (err) {
//     console.log("Failed to invalidate cache:", err);
//   }
// }

// export { client };

const client = {
  del: async (key) => {
    console.log(`Mock delete for key: ${key}`);
    return true;
  },
  connect: () => {
    console.log("Mock Redis client connected");
  },
  on: (event, handler) => {
    console.log(`Mock Redis client setup event for: ${event}`);
  },
};

// Mimic the connect function call for the mock
client.connect();

export async function invalidateCache(key) {
  try {
    await client.del(key);
    console.log(`Cache invalidated for key: ${key}`);
  } catch (err) {
    console.log("Failed to invalidate cache:", err);
  }
}

export { client };
