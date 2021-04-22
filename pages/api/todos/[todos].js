export default function handler(req, res) {
	const { todos } = req.query;
	res.end(`Post: ${todos}`);
}

//chci tu celej objekt.. jak mam exportnout data ze statu?
