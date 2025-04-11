export default async function handler(
  req ,
  res,
) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
  const userAgent = req.headers['user-agent'];
  const uniqueIdentifier = `${ip}-${userAgent}`;
  
  res.status(200).json({ ip, uniqueIdentifier });
}
