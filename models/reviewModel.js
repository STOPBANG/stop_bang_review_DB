const Review = require('../database/models/tables/review');

module.exports = {
  create: async (req, res) => {
    const body = req.body;

    await Review.create({
      resident_r_id: body.r_id,
      agent_list_ra_regno: body.ra_regno,
      rating: body.rate,
      content: body.description,
      tags: Array.isArray(body.tag) ? body.tag.join("") : body.tag
    });

    return res.json({});
  },
  findAllByUserId: async (req, res) => {
    const reviews = await Review.findAll({ where: {resident_r_id: req.params.user_id} });

    return res.json(reviews);
  }
}