const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const {getAsync,setAsync} = require('../redis/index')

const redis_addedtodos = async (req,res,next) => {
  const added_todos = await getAsync("added_todos")
  console.log(added_todos)
  let newAdded = Number(added_todos) +1
  await setAsync("added_todos",newAdded)
  next()
}
router.get('/statistics', async (req,res,next) => {
  const added_todos = await getAsync("added_todos")
  console.log(added_todos)
  res.send({"added_todos":Number(added_todos)})
})

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/',redis_addedtodos, async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)
  next()
}


/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  console.log(req.body)
  const result = await Todo.findByIdAndUpdate(req.todo.id,req.body,{
    new: true
  })
  res.send(result); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
