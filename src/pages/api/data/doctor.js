export default function handler(req, res) {
    const { username } = req.query
    const data = {
      doc_id: 2,
    }
    res.status(200).json(data);
  }