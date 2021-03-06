import { getSession } from 'next-auth/client';
import axios from "axios";
import { NextApiResponse, NextApiRequest } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({
    req
  });

  if (!session?.user) {
    res.status(401).end("Unauthorized");
  }
  else if (req.method === "GET") {
    // pass origins=40.6655101,-73.89188969999998&destinations=40.6905615,-73.9976592 as parameter
    const origin = (req.query.origin as string);
    const destination = (req.query.destination as string);

    if (origin.length === 0 || destination.length === 0) {
      res.status(400).end("Invalid parameters");
    }

    const result = await axios
    .get(
      `https://maps.googleapis.com/maps/api/directions/json?units=metric&origin=place_id:${origin}&destination=place_id:${destination}&key=${process.env.GOOGLE_MAPS_API_KEY}`,
    );

    if (!result) {
      return res.status(404).end("Not found");
    }

    return res.status(200).json(result.data);
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method not allowed");
  }
};
