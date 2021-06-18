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
    const points = (req.query.point as string).split(',');

    if (points.length !== 2) {
      res.status(400).end("Invalid parameters");
    }

    const result = await axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${points[0]},${points[1]}&key=${process.env.GOOGLE_MAPS_API_KEY}`,
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
