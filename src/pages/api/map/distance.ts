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
    const origins = (req.query.origins as string).split(',');
    const destinations = (req.query.destinations as string).split(',');

    if (origins.length !== 2 || destinations.length !== 2) {
      res.status(400).end("Invalid parameters");
    }

    const result = await axios
    .get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origins[0]},${origins[1]}&destinations=${destinations[0]},${destinations[1]}&key=${process.env.GOOGLE_MAPS_API_KEY}`,
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
