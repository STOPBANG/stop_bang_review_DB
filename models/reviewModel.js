const { tags } = require('../public/assets/tag');

const Review = require('../database/models/tables/review');

module.exports = {
  create: async (req, res) => {
    const body = req.body;

    await Review.create({
      resident_r_id: body.r_id,
      agentList_ra_regno: body.ra_regno,
      rating: body.rate,
      content: body.description,
      tags: Array.isArray(body.tag) ? body.tag.join("") : body.tag
    });

    return res.json({});
  },

  update: async (req,res) => {
    const body = req.body;
    let desc = body.originDesc;

    if(body.description !== "")
			desc = body.originDesc + "\n" + body.updatedTime + "\n" + body.description;
		
		let tags = body.checkedTags;
		if(body.tag !== undefined) {
			tags += Array.isArray(body.tag)
				? body.tag.join("")
				: body.tag;
		}

    Review.update({
      rating: body.rate,
      content: desc,
      tags: tags
    },
  {where: {id: body.rv_id} });

  return res.redirect('/');
  },

  findAllByReviewId: async (req, res) => {
    const reviews = await Review.findAll({where: {id: req.params.rv_id} });
    
    return res.json(reviews);
  },

  findAllByUserId: async (req, res) => {
    const reviews = await Review.findAll({ where: {resident_r_id: req.params.user_id} });

    return res.json(reviews);
  },
  findAllByRegno: async (req, res) => {
    const reviews = await Review.findAll({ where: {agentList_ra_regno: req.params.ra_regno} });

    return res.json(reviews);
  }
}