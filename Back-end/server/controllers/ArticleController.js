import Article from "../models/ArticleModel.js";

export const createArticle = async (req, res) => {
  const { title, category, body, author } = req.body;
  const image = req.file.filename;
  try {
    const newArticle = await Article.create({
      title,
      category,
      body,
      author,
      image: image,
    });
    return res
      .status(200)
      .json({ message: "article created successfully", article: newArticle });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "article could not be created" });
  }
};

export const getArticles = async (req, res) => {
  try {
    const allArticles = await Article.findAll();
    return res.status(200).json(allArticles);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "cannot fetch articles" });
  }
};

export const getArticle = async (req, res) => {
  const id = req.params.id;
  try {
    const article = await Article.findOne({ where: { id } });
    res.status(200).json(article);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Couldn't find article" });
  }
};

export const updateArticle = async (req, res) => {
  const id = req.params.id;
  const image = req.file.filename;
  const { title, category, body, author } = req.body;
  try {
    await Article.update(
      { title, category, body, author, image },
      {
        where: { id },
      }
    );
    return res.status(200).json({ message: "article updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Trouble updating article info" });
  }
};

export const deleteArticle = async (req, res) => {
  const id = req.params.id;
  try {
    await Article.destroy({ where: { id } });
    res.status(200).json({ message: "article deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: " could not delete article" });
  }
};
