import { connectToDatabase } from "../../../util/mongodb";
import { ObjectId } from "mongodb";

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
		console.log(req.method);
		console.log(req.body);
	}
	if (req.method === "DELETE") {
		const { _id, ...rest } = req.body;
		const todos = await db
			.collection("Todos")
			.findOneAndDelete({ _id: ObjectId(_id), ...rest });
		res.json(todos);
		console.log(req.method);
	}
	if (req.method === "PUT") {
		const { _id, completed } = req.body;
		const todos = await db
			.collection("Todos")
			.updateOne({ _id: ObjectId(_id) }, { $set: { completed } });
		res.json(todos);
		console.log(req.method);
	}
};
