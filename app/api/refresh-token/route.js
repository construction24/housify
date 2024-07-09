// import * as jwt from "jsonwebtoken";

// export async function POST(req) {
//   try {
//     const refreshToken = jwt.sign(user, process.env.JWT_KEY, {
//       expiresIn: "1h",
//     });
//     const { token } = req.body;

//     if (!token) return res.sendStatus(401);
//     if (!refreshTokens.includes(token)) return res.sendStatus(403);

//     jwt.verify(token, REFRESH_SECRET_KEY, (err, user) => {
//       if (err) return res.sendStatus(403);

//       const refreshToken = generateAccessToken({ username: user.username });
//       res.json({ token: refreshToken });
//     });
//   } catch (error) {
//     console.error("Error sending OTP:", error.message);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
