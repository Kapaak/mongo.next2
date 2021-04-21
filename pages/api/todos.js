import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
	const { db } = await connectToDatabase();

	if (req.method === "GET") {
		const todos = await db.collection("Todos").find({}).toArray();
		// .sort({ metacritic: -1 })
		// .limit(20)
		// .toArray();

		res.json(todos);
		console.log(req.method);
	}

	if (req.method === "POST") {
		const todos = await db.collection("Todos").insertOne(req.body);
		res.json(todos);
	}
};
