const express = require("express");
const environment = process.env.NODE_ENV || "development";
const configuration = require("./knexfile")[environment];
const database = require("knex")(configuration);
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`app is running on port: ${PORT}`);
});

app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

app.get("/api/v1/projects", (req, res) => {
  database("projects")
    .select()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => res.status(500).json({ error }));
});

app.get("/api/v1/palettes", (req, res) => {
  database("palettes")
    .select()
    .then(palettes => {
      res.status(200).json(palettes);
    })
    .catch(error => res.status(500).json({ error }));
});

app.get("/api/v1/projects/:id", (req, res) => {
  database("projects")
    .where("id", req.params.id)
    .select()
    .then(project => {
      if (project.length) {
        res.status(200).json(project);
      } else {
        res.statusCode(404).json({
          error: `cound not find project with id: ${req.params.id}`
        });
      }
    })
    .catch(error => res.status(500).json({ error }));
});

app.get("/api/v1/palettes/:id", (req, res) => {
  database("palettes")
    .where("id", req.params.id)
    .select()
    .then(palette => {
      if (palette.length) {
        res.status(200).json(palette);
      } else {
        res.statusCode(404).json({
          error: `cound not find palette with id: ${req.params.id}`
        });
      }
    })
    .catch(error => res.status(500).json({ error }));
});

app.post("/api/v1/projects", (req, res) => {
  const { name } = req.body;
  const project = req.body;

  if (!name) {
    return res.status(422).json(`please enter a name for your project`);
  } else {
    database("projects")
      .insert(project, "id")
      .then(project => {
        res.status(201).json({ id: project[0] });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
});

app.post("/api/v1/palettes", (req, res) => {
  const {
    name,
    color_1,
    color_2,
    color_3,
    color_4,
    color_5,
    project_id
  } = req.body;
  const palette = req.body;

  if ((!name, !color_1, !color_2, !color_3, !color_4, !color_5, !project_id)) {
    return res.status(422).json();
  } else {
    database("palettes")
      .insert(palette, "id")
      .then(palette => {
        res.status(201).json({ id: palette[0] });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
});

app.delete("/api/v1/projects/:id", (req, res) => {
  const { id } = req.params;

  database("projects")
    .where("id", id)
    .del()
    .then(result => {
      if (!result) {
        res
          .status(404)
          .json(
            `I'm sorry that id doesn't exist in projects table, maybe this is good news seeing you were trying to delete it anyway.`
          );
      } else {
        res.status(200).json(`id: ${id} deleted`);
      }
    });
});

app.delete("/api/v1/palettes/:id", (req, res) => {
  const { id } = req.params;

  database("palettes")
    .where("id", id)
    .del()
    .then(result => {
      if (!result) {
        res
          .status(404)
          .json(
            `I'm sorry that id doesn't exist in palettes table, maybe this is good news seeing you were trying to delete it anyway.`
          );
      } else {
        res.status(200).json(`id: ${id} deleted`);
      }
    });
});
